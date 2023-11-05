const express = require('express');
const router = express.Router();
const runSQL = require('../database');



router.get('/:ally_code', async (req, res) => {
    console.log(runSQL);
    const ally_code = req.params.ally_code;
    const rows = await runSQL("SELECT * FROM player WHERE ally_code = ?", ally_code);

    res.status(200).json(rows);
  
});

module.exports = router;