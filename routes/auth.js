const express = require("express");

const validate = require("../models/User");
const jwt = require("jsonwebtoken");

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
    if (await check(validate, "/login", req, res, next)) return;

    // calling api
    try {
      const { data } = await http.post("/Login", req.body, {
        headers: { dexefForgeryKey: req.cookies.dexefForgeryKey },
      });
      await checkValidaty(data, "/login", req, res, next);
      const user = jwt.decode(data.response.token);
      console.log(user);
      if (req.body.stayloggedin) {
        res.cookie("token", data.response.token, { maxAge: 60 * 60 * 24 * 30 });
      } else {
        res.cookie("token", data.response.token);
      }
      setUserCookie(res, user);
      if (!user.email_verified) {
        return res.redirect("/link-sent");
      } else {
        res.redirect("/");
      }
    } catch (err) {
      return next.render(req, res, "/login", { serverError: (err.response && err.response.data) || err.message });
    }
  });

  router.post("/ResendEmailVerification", async (req, res) => {
    let email = req.cookies.email;
    const token = req.cookies.token;
    console.log("email", email);
    console.log("token ", token);
    http
      .post("/ResendEmailVerification?Email=" + email, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log("Link sent ", data);
        res.redirect("/link-sent");
      });
  });

  router.post("/EmailVerificationCountDown", async (req, res) => {
    let id = req.cookies.id;
    http
      .get("/EmailVerificationCountDown?UserId=" + id)
      .then(({ data }) => {
        console.log("get time ", data);
        res.status(200).send({ time: data.response });
      })
      .catch((err) => res.send({}));
  });

  router.post("/VerifyUserEmail", (req, res) => {
    const EmailToken = req.body.EmailToken;
    http.post("/VerifyUserEmail?EmailToken=" + EmailToken).then(({ data }) => {
      console.log(data);
      res.send(data);
    });
  });

  return router;
};

const setUserCookie = (res, user) => {
  res.cookie("id", user.sub);
  res.cookie("email", user.email);
  res.clearCookie("validatePhoneToken");
  res.clearCookie("countDown");
  res.clearCookie("phoneValidationToken");
  res.clearCookie("preRegisterData");
};
