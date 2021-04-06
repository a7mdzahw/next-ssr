const express = require("express");

const http = require("../lib/serverHttp");
const { isValidPhoneNumber } = require("libphonenumber-js");
const validateStep1 = require("../models/SignUpStep1");
const validateStep2 = require("../models/signUpStep2");
const validateStep3 = require("../models/SignUpStep3");

module.exports = function signup(next) {
  const router = express.Router();

  router.post("/signup3", (req, res) => {
    const { error } = validateStep3(req.body);
    if (error) {
      return next.render(req, res, "/signup", { error, body: req.body });
    }
    http
      .post("/SignUp", {
        ...req.body,
        phoneValidationToken: req.cookies.phoneValidationToken,
        ...req.session.preInfo,
      })
      .then(async ({ data }) => {
        const errors = await checkValidaty(req, res, data);
        if (errors) return res.redirect("/signup");
        res.redirect("/login");
      })
      .catch((err) => console.log(err.response.data));
  });

  router.post("/signup2", (req, res) => {
    console.log(req.body);
    const { error } = validateStep2(req.body);
    if (error) {
      req.session.errors = { details: error.details, body: req.body };
      return res.redirect("/signup");
    }
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
    req.session.signupStep = 3;
    res.redirect("/signup");
  });

  router.post("/signup1", (req, res) => {
    console.log(req.body);
    const { error } = validateStep1(req.body);
    const isValid = isValidPhoneNumber(req.body.phone);

    if (!isValid || error) {
      if (error) {
        return next.render(req, res, "/signup", { error, body: req.body });
        if (!isValid) {
          req.session.errors = { details: error.details, body: req.body, phoneError: true };
        }
        return res.redirect("/signup");
      }
      if (!isValid) {
        return next.render(req, res, "/signup", { error, body: req.body, phoneError: true });
        return res.redirect("/signup");
      }
    }

    http.post("/PreRegisteration", req.body).then(async ({ data }) => {
      // // const errors = await checkValidaty(req, res, data);
      // if (errors) return res.redirect("/signup");
      res.cookie("validatePhoneToken", data.response);
      res.redirect("/signup");
    });
  });

  router.post("/signup", async (req, res) => {
    res.send({ step: 1 });
  });

  return router;
};
