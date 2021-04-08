const cookieParser = require("cookie-parser");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const auth = require("./routes/auth");
const signup = require("./routes/signup");

app
  .prepare()
  .then(() => {
    const server = express();
    // middlewares
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    // static files
    server.get(/\.(png|svg)$/, express.static("./public/img"));
    // auth routes
    server.use("/", auth(app));
    server.use("/", signup(app));
    // next pages
    server.get("*", (req, res) => {
      return handle(req, res);
    });
    // server listening
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
