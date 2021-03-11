const express = require("express");
const router = express.Router();
const productsContoller = require("../controllers/products");
let result;
router.get("/", async function (req, res) {
  const result = await productsContoller.getProducts();
  res.send(result);
});

router.get("/:category_id", async function (req, res) {
  const category_id = req.params.category_id;
  result = await productsContoller.getProducts(category_id);
  res.send(result);
});

router.post("/", async function (req, res) {
  const { name, category_id } = req.body;
  result = await productsContoller.addProduct(name, category_id);
  res.send(result);
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  result = await productsContoller.deleteProduct(id);
  res.send(res);
});

module.exports = router;
