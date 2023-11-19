//gacTeam api
const express = require('express');
const router = express.Router();
const gacTeam = require("../model/gacTeam");

router.get('/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const team = await gacTeam.getGACTeam(ally_code);
    
    res.status(200).json(team);
  
});

module.exports = router;