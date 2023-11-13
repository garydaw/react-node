//mod api
const express = require('express');
const router = express.Router();
const mod = require("../model/mod");

//check mod primries
router.get('/checkprimary/:ally_code/:date', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const date = req.params.date;
    const incorrect_primaries = await mod.checkPrimary(ally_code, date);
    
    res.status(200).json(incorrect_primaries);
  
});

module.exports = router;