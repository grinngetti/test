const { query } = require("../config");

async function auth(login, password) {
  try {
    const result = await query(
      "SELECT * FROM users WHERE login = $1 AND  password = crypt($2, password)",
      [login, password]
    );
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return { message: "Password or login is invalid!" };
    }
  } catch (err) {
    console.log(err);
  }
}
async function addUser(login, password) {
  try {
    const result = await query(
      "INSERT INTO users (login, password) SELECT  $1, crypt( $2, gen_salt('bf', 8))" +
        " WHERE $3 NOT IN (SELECT  login FROM users)  RETURNING id",
      [login, password, login]
    );
    if (result.rowCount > 0) {
      return { message: "User succesfully added!", id: result.rows[0].id };
    } else {
      return { message: "Login  already exist!" };
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  auth,
  addUser,
};
