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
    console.log(req.body);
    const { error } = validateStep1(req.body);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
      }
      return next.render(req, res, "/signup", { error, body: req.body });
    }
    try {
      const { data } = await http.post("/PreRegisteration", req.body);
      // await checkValidaty(data, "/signup", req, res, next).then(() => {
      //   res.cookie("validatePhoneToken", data.response);
      //   res.cookie("preRegisterData", JSON.stringify(req.body));
      //   res.redirect("/signup/verify_code");
      // });
      res.cookie("validatePhoneToken", data.response);
      res.cookie("preRegisterData", JSON.stringify(req.body));
      res.redirect("/signup/verify_code");
    } catch (err) {
      console.log(err);
    }
  });

  // handling step 2 of signup process
  router.post("/signup2", async (req, res) => {
    await check(validateStep2, "/signup/verify_code", req, res, next);
    // http
    //   .post("/VerifyPhoneCode", {
    //     ...req.body,
    //     validatePhoneToken: req.cookies.validatePhoneToken,
    //   })
    //   .then(async ({ data }) => {
    //     const errors = await checkValidaty(req, res, data);
    //     if (errors) return res.redirect("/signup");
    //     res.cookie("phoneValidationToken", data.response);
    //     req.session.signupStep = 3;
    //     res.redirect("/signup");
    //   });
    res.cookie("phoneValidationToken", "12524554");
    res.redirect("/signup/finish");
  });

  // handling step 3 of signup process
  router.post("/signup3", async (req, res) => {
    await check(validateStep3, "/signup/finish", req, res, next);
    const preRegisterData = JSON.parse(req.cookies.preRegisterData);
    http
      .post("/SignUp", {
        companySize: 1,
        workField: 2,
        ...req.body,
        phoneValidationToken: req.cookies.phoneValidationToken,
        ...preRegisterData,
      })
      .then(async ({ data }) => {
        await checkValidaty(data, "/signup/finish", req, res, next);
        res.redirect("/login");
      })
      .catch((err) =>
        next.render(req, res, "/signup/finish", { serverError: (err.response && err.response.data) || err.message })
      );
  });

  return router;
};
