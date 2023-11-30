//gacTeam api
const express = require('express');
const router = express.Router();
const gacTeam = require("../model/gacTeam");

router.get('/units', async (req, res) => {
    
    const units = await gacTeam.getUnits();
    
    res.status(200).json(units);
  
});

router.post('', async (req, res) => {
    
    await gacTeam.addTeam(req.body);
    
    res.status(200).json([]);
  
});

router.get('/:team_size/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const team_size = req.params.team_size;
    const team = await gacTeam.getGACTeam(ally_code, team_size);
    
    res.status(200).json(team);
  
});

module.exports = router;