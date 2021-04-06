const express = require("express");
const http = require("../lib/serverHttp");
const validate = require("../models/User");

module.exports = function (app) {
  const router = express.Router();

  router.post("/LoginRequest", async (req, res) => {
    http.post("/LoginRequest").then(({ data }) => {
      res.send({ token: data.response });
    });
  });

  router.post("/login", async (req, res) => {
    let { error } = validate(req.body);
    if (error) {
      return app.render(req, res, "/login", { error, body: req.body });
    }
    http
      .post("/Login", req.body, {
        headers: {
          dexefForgeryKey: req.cookies.dexefForgeryKey,
        },
      })
      .then(({ data }) => {
        res.cookie("token", data.response.token);
        res.redirect("/");
      });
  });
  return router;
};
