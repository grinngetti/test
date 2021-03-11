require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const { json, urlencoded } = require("body-parser");
const { pool } = require("./config");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const favoritesRouter = require("./routes/favorites");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express()
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(morgan("combined", { stream: accessLogStream }))
  .use(
    session({
      store: new pgSession({
        pool: pool,
        tableName: "users_sessions",
      }),
      secret: process.env.FOO_COOKIE_SECRET || "oU80saf_Dwd48w9",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 10 * 60 * 1000 }, // 10 minutes
    })
  );

function authChecker(req, res, next) {
  if (req.session.user || req.path === "/users/auth") {
    next();
  } else {
    res.redirect("/users/auth");
  }
}
app
  .use(authChecker)
  .use("/users", usersRouter)
  .use("/products", productsRouter)
  .use("/categories", categoriesRouter)
  .use("/favorites", favoritesRouter);

const PORT = process.env.PORT;
app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server listening on port ${PORT}.`);
});
