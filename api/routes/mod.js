//mod api
const express = require('express');
const router = express.Router();
const mod = require("../model/mod");

//check mod primaries
router.get('/checkprimary/:ally_code/:date', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const date = req.params.date;
    const incorrect_primaries = await mod.checkPrimary(ally_code, date);
    
    res.status(200).json(incorrect_primaries);
  
});

//check mod set
router.get('/checkset/:ally_code/:date', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const date = req.params.date;
    const incorrect_sets = await mod.checkSet(ally_code, date);
    
    res.status(200).json(incorrect_sets);
  
});

//check mod set
router.get('/checkspeed/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const speed_mods = await mod.checkSpeed(ally_code);
    
    res.status(200).json(speed_mods);
  
});

//search for best unassigned option
router.get('/searchUnassigned/:ally_code/:date', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const date = req.params.date;
    const search = req.query;
    
    const unassigned = await mod.searchUnassigned(ally_code, date, search);
    
    res.status(200).json(unassigned);
  
});

router.get('/dates/', async (req, res) => {
    
    const dates = await mod.getDates();
    
    res.status(200).json(dates);
  
});

router.get('/slots/', async (req, res) => {
    
    const slots = await mod.getSlots();
    
    res.status(200).json(slots);
  
});

router.get('/group_sets/', async (req, res) => {
    
    const group_sets = await mod.getGroupSets();
    
    res.status(200).json(group_sets);
  
});

router.get('/primaries/', async (req, res) => {
    
    const primaries = await mod.getPrimaries();
    
    res.status(200).json(primaries);
  
});

module.exports = router;