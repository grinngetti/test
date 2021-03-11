const express = require("express");
const router = express.Router();
const favoritesContoller = require("../controllers/favorites");
let result;
router.post("/", async function (req, res) {
  const { product_id } = req.body;
  const user_id = req.session.user.id;
  result = await favoritesContoller.addToFavorites(product_id, user_id);
  res.send(result);
});
router.get("/", async function (req, res) {
  const user_id = req.session.user.id;
  result = await favoritesContoller.getFavorites(user_id);
  res.send(result);
});
module.exports = router;
