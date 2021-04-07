const express = require("express");

const http = require("../lib/serverHttp");
const { isValidPhoneNumber } = require("libphonenumber-js");
const validateStep1 = require("../models/SignUpStep1");
const validateStep2 = require("../models/signUpStep2");
const validateStep3 = require("../models/SignUpStep3");
const check = require("../lib/check");

module.exports = function signup(next) {
  const router = express.Router();

  router.get("/signup1", (req, res) => {
    res.redirect("/signup");
  });
  router.get("/signup2", (req, res) => {
    res.redirect("/signup/verify_code");
  });
  router.get("/signup3", (req, res) => {
    res.redirect("/signup/finish");
  });

  router.post("/signup3", (req, res) => {
    check(validateStep3, "/signup/finish", req, res, next);
    const preRegisterData = JSON.parse(req.cookies.preRegisterData);
    console.log(preRegisterData, req.body);
    http
      .post("/SignUp", {
        ...req.body,
        phoneValidationToken: req.cookies.phoneValidationToken,
        ...preRegisterData,
      })
      .then(async ({ data }) => {
        console.log("here");
        const errors = data.errors;
        if (errors.length > 0) return next.render(req, res, "/signup/finish", { apiErrors: errors });
        res.redirect("/login");
      })
      .catch((err) => next.render(req, res, "/signup/finish", { serverError: err.response.data || err.message }));
  });

  router.post("/signup2", async (req, res) => {
    console.log(req.body);
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

  router.post("/signup1", (req, res) => {
    console.log(req.body);
    const { error } = validateStep1(req.body);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (error) {
        return next.render(req, res, "/signup", { error, body: req.body });
      }
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
      }
    }

    http.post("/PreRegisteration", req.body).then(async ({ data }) => {
      // const errors = data.errors;
      // if (errors.length > 0) return next.render(req, res, "/signup", { apiErrors: errors });

      res.cookie("validatePhoneToken", data.response);
      res.cookie("preRegisterData", JSON.stringify(req.body));
      res.redirect("/signup/verify_code");
    });
  });

  router.post("/signup", async (req, res) => {
    res.send({ step: req.body.step || 1 });
  });

  return router;
};
