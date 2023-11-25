//maria db
const mariadb = require('mariadb');

//vars to be swapped with env variables
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MY_DB
});

//connect to db, run query and return results
var connectAndRun = async function sqlConnection(sql, values) {
    console.log(sql);
    console.log(values);
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, values);
    conn.release();

    return rows;
};

module.exports = connectAndRun;