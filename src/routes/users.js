const { query } = require("../config");
const usersContoller = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.post("/auth", async function (req, res) {
  if (!req.session.user) {
    const { login, password } = req.body;
    const result = await usersContoller.auth(login, password);
    req.session.user = result;
    res.send(result);
  }
});
router.post("/", async function (req, res) {
  const { login, password } = req.body;
  const result = await usersContoller.addUser(login, password);
  res.send(result);
});
module.exports = router;
