//gacTeam api
const express = require('express');
const router = express.Router();
const team = require("../model/team");

router.get('/units', async (req, res) => {
    
    const units = await team.getUnits();
    
    res.status(200).json(units);
  
});

router.post('/:team_type', async (req, res) => {
    
    const team_type = req.params.team_type;
    await team.addTeam(req.body, team_type);
    
    res.status(200).json([]);
  
});

router.get('/:team_type/:team_size/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const team_size = req.params.team_size;
    const team_type = req.params.team_type;
    const teams = await team.getTeams(ally_code, team_size, team_type);
    
    res.status(200).json(teams);
  
});

router.delete('/:team_id/:offense', async (req, res) => {
    
    const team_id = req.params.team_id;
    const offense = req.params.offense;
    await team.deleteTeam(team_id, offense);
    
    res.status(200).json([]);
  
});

module.exports = router;