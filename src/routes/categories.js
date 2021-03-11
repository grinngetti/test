const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", async function (req, res) {
  const result = await categoriesController.getCategoriesList();
  res.send(result);
});

module.exports = router;
