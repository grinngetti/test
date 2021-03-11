const { query } = require("../config");

async function getCategoriesList() {
  try {
    const { rows } = await query(
      "SELECT categories.id, categories.name, count (products.id) as products_quantity " +
        "FROM categories LEFT JOIN products ON products.category_id = categories.id " +
        "GROUP BY  categories.id ORDER BY categories.id ASC"
    );
    return rows;
  } catch (err) {
    console.log("Database error " + err);
  }
}
module.exports = {
  getCategoriesList,
};
