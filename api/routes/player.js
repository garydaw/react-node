//player api
const express = require('express');
const router = express.Router();
const player = require("../model/player");

//get player details
router.get('/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const this_player = await player.get(ally_code);
    
    res.status(200).json(this_player);
  
});

module.exports = router;