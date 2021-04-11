const express = require("express");
// error validation fns
const validateStep1 = require("../models/SignUpStep1");
const validateStep2 = require("../models/signUpStep2");
const validateStep3 = require("../models/SignUpStep3");
const { isValidPhoneNumber } = require("libphonenumber-js");
// lib modules
const http = require("../lib/serverHttp");
const check = require("../lib/check");
const checkValidaty = require("../lib/checkValidaty");
const countries = require("../lib/country");

module.exports = function signup(next) {
  const router = express.Router();

  // get routes
  router.get("/signup1", (req, res) => {
    res.redirect("/signup");
  });
  router.get("/signup2", (req, res) => {
    res.redirect("/signup/verify_code");
  });
  router.get("/signup3", (req, res) => {
    res.redirect("/signup/finish");
  });

  // get Count Down for current User
  router.get("/PhoneVerificationCountDown", async (req, res) => {
    http
      .get("/PhoneVerificationCountDown", { params: { PhoneToken: req.cookies.validatePhoneToken } })
      .then(({ data }) => {
        res.send({ time: data.response });
      });
  });

  // post routes
  // first rendering of signup page
  router.post("/signup", async (req, res) => {
    res.send({ step: req.body.step || 1 });
  });

  // handling step 1 of signup process
  router.post("/signup1", async (req, res) => {
    const country = countries.find((c) => c.code === req.body.countryCode);
    const { error } = validateStep1(req.body);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
      }
      return next.render(req, res, "/signup", { error, body: req.body });
    }
    try {
      const { data } = await http.post("/PreRegisteration", { ...req.body, country: country.name });
      await checkValidaty(data, "/signup", req, res, next);
      res.cookie("validatePhoneToken", data.response.verifyPhoneToken);
      res.cookie("preRegisterData", JSON.stringify(req.body));
      res.redirect("/signup/verify_code");
    } catch (err) {
      next.render(req, res, "/signup", { serverError: "Server Error Please Try Later" });
    }
  });

  // handling step 2 of signup process
  router.post("/signup2", async (req, res) => {
    await check(validateStep2, "/signup/verify_code", req, res, next);
    const { data } = await http.post("/VerifyPhoneCode", {
      ...req.body,
      validatePhoneToken: req.cookies.validatePhoneToken,
    });
    await checkValidaty(data, "/signup/verify_code", req, res, next);
    res.cookie("phoneValidationToken", data.response);
    res.redirect("/signup/finish");
  });

  // handling step 3 of signup process
  router.post("/signup3", async (req, res) => {
    await check(validateStep3, "/signup/finish", req, res, next);
    const preRegisterData = JSON.parse(req.cookies.preRegisterData);
    http
      .post("/SignUp", {
        ...req.body,
        phoneValidationToken: req.cookies.phoneValidationToken || "notValidated",
        ...preRegisterData,
      })
      .then(async ({ data }) => {
        await checkValidaty(data, "/signup/finish", req, res, next);
        res.clearCookie("validatePhoneToken");
        res.clearCookie("countDown");
        res.clearCookie("phoneValidationToken");
        res.clearCookie("preRegisterData");
        res.redirect("/login");
      })
      .catch((err) =>
        next.render(req, res, "/signup/finish", { serverError: (err.response && err.response.data) || err.message })
      );
  });

  return router;
};
