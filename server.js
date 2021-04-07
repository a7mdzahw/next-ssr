const cookieParser = require("cookie-parser");
const express = require("express");
const next = require("next");
var session = require("express-session");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const auth = require("./routes/auth");
const signup = require("./routes/signup");

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(
      session({
        secret: "12345",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
    server.get(/\.(png|svg)$/, express.static("./public/img"));

    server.use("/", auth(app));
    server.use("/", signup(app));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
