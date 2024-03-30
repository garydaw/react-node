//rote api
const express = require('express');
const router = express.Router();
const rote = require("../model/rote");

router.get('/units', async (req, res) => {
    
    const units = await rote.getUnits();
    
    res.status(200).json(units);
  
});

router.get('/units/:base_id', async (req, res) => {

    const base_id = req.params.base_id;
    const units = await rote.getGuildUnit(base_id);
    
    res.status(200).json(units);
  
});

router.post('/operation', async (req, res) => {

    const result = await rote.addOperation(req.body);
    
    res.status(200).json([result]);
  
});

router.get('/operation/:path/:phase', async (req, res) => {

    const path = req.params.path;
    const phase = req.params.phase;
    const result = await rote.getOperations(path, phase);
    
    res.status(200).json(result);
  
});

router.get('/operation/allocate/:path/:phase', async (req, res) => {

    const path = req.params.path;
    const phase = req.params.phase;
    await rote.allocateOperations(path, phase);
    
    const result = await rote.getOperations(path, phase);
    
    res.status(200).json(result);
  
});

router.put('/operation/swap/', async (req, res) => {
    
    const path = req.body.path;
    const phase = req.body.phase;
    const operation = req.body.operation;
    const team_index = req.body.team_index;
    const ally_code = req.body.ally_code;

    await rote.swapOperations(path, phase, operation, team_index, ally_code);
    
    const result = await rote.getOperations(path, phase);
    
    res.status(200).json(result);
  
});

module.exports = router;