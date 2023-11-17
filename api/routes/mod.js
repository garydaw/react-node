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

//search for best unassigned option
router.get('/searchUnassigned/:ally_code/:date', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const date = req.params.date;
    const search = req.query;
    console.log(search);
    //const incorrect_primaries = await mod.checkPrimary(ally_code, date);
    
    res.status(200).json([]);
  
});

router.get('/dates/', async (req, res) => {
    
    const dates = await mod.getDates();
    
    res.status(200).json(dates);
  
});

router.get('/slots/', async (req, res) => {
    
    const slots = await mod.getSlots();
    
    res.status(200).json(slots);
  
});

module.exports = router;