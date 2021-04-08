const express = require("express");

const validate = require("../models/User");

const check = require("../lib/check");
const http = require("../lib/serverHttp");
const checkValidaty = require("../lib/checkValidaty");

module.exports = function (next) {
  const router = express.Router();

  // handling fisrt login rendering and add dexefkey to cookies
  router.post("/LoginRequest", async (req, res) => {
    try {
      const { data } = await http.post("/LoginRequest");
      res.send({ token: data.response });
    } catch (error) {
      res.send({});
    }
  });

  // handling login form submittion
  router.post("/login", async (req, res) => {
    await check(validate, "/login", req, res, next);
    // calling api
    try {
      const { data } = await http.post("/Login", req.body, {
        headers: { dexefForgeryKey: req.cookies.dexefForgeryKey },
      });
      await checkValidaty(data, "/login", req, res, next);
      if (req.body.stayloggedin) {
        res.cookie("token", data.response, { maxAge: 60 * 60 * 24 * 30 });
      } else {
        res.cookie("token", data.response);
      }
      res.clearCookie("validatePhoneToken");
      res.clearCookie("countDown");
      res.clearCookie("phoneValidationToken");
      res.clearCookie("preRegisterData");
      res.redirect("/");
    } catch (err) {
      return next.render(req, res, "/login", { serverError: (err.response && err.response.data) || err.message });
    }
  });

  return router;
};
