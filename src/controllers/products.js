const { query } = require("../config");
let result;
async function getProducts(category_id) {
  try {
    if (!category_id) {
      result = await query("SELECT * FROM products");
    } else {
      result = await query("SELECT * FROM products WHERE category_id = $1 ", [
        category_id,
      ]);
    }
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return {
        message: "No products for this category!",
      };
    }
  } catch (err) {
    console.log(err);
  }
}
async function addProduct(name, category_id) {
  try {
    result = await query(
      "INSERT INTO products (name, category_id) VALUES($1,$2) RETURNING id",
      [name, category_id]
    );
    if (result.rowCount > 0) {
      return {
        message: "New product succesfully added!",
        id: result.rows[0].id,
      };
    }
  } catch (err) {
    console.log(err);
  }
}
async function deleteProduct(id) {
  try {
    await query("DELETE FROM products WHERE id = $1", [id]);
    return { message: "Product succesfully deleted!" };
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
};
