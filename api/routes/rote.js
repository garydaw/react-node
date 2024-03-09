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

module.exports = router;