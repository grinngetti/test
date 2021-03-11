const { query } = require("../config");
let result;
async function addToFavorites(product_id, user_id) {
  try {
    result = await query(
      "INSERT INTO favorites (product_id, user_id) VALUES($1,$2) RETURNING id",
      [product_id, user_id]
    );
    if (result.rowCount > 0) {
      return {
        message: "Product was added to Favorites!",
        id: result.rows[0].id,
      };
    }
  } catch (err) {
    console.log(err);
  }
}
async function getFavorites(user_id) {
  try {
    result = await query("SELECT * FROM favorites WHERE user_id = $1 ", [
      user_id,
    ]);
    if (result.rowCount > 0) {
      return result.rows;
    } else {
      return { message: "Favorites for current user not found" };
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addToFavorites,
  getFavorites,
};
