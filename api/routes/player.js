const express = require('express');
const router = express.Router();
const mariadb = require('mariadb');

//vars to be swapped with env variables
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1pig2cowes3sheep',
  database: 'swgoh'
});

router.get('/:ally_code', async (req, res) => {

    const ally_code = req.params.ally_code;
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM player WHERE ally_code = ?", ally_code);
    conn.release();

    res.status(200).json(rows);
  
});

module.exports = router;