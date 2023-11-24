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

router.get('/:ally_code/unit/:base_id', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const base_id = req.params.base_id;
    const unit = await player.getUnit(ally_code, base_id);
    res.status(200).json(unit);
  
});

module.exports = router;