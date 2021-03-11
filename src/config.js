require("dotenv").config();
// configure pg
const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
async function query(q, p) {
  const client = await pool.connect();
  let res;
  try {
    await client.query("BEGIN");
    try {
      if (p) {
        res = await client.query(q, p);
      } else {
        res = await client.query(q);
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
}
module.exports = { pool, query };
