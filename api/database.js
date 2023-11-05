//maria db
const mariadb = require('mariadb');

//vars to be swapped with env variables
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1pig2cowes3sheep',
  database: 'swgoh'
});

//connect to db, run query and return results
var connectAndRun = async function sqlConnection(sql, values) {

    const conn = await pool.getConnection();
    const rows = await conn.query(sql, values);
    conn.release();

    return rows;
};

module.exports = connectAndRun;