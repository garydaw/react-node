//journeyGuide api
const express = require('express');
const router = express.Router();
const journeyGuide = require("../model/journeyGuide");

router.get('/', async (req, res) => {
    
    const guides = await journeyGuide.getJourneyGuide();
    
    res.status(200).json(guides);
  
});

router.get('/nonGuideUnits/', async (req, res) => {
    
    const guides = await journeyGuide.getNonGuideUnits();
    
    res.status(200).json(guides);
  
});

router.post('/', async (req, res) => {
    
    console.log(req.body);
    await journeyGuide.setJourneyGuide(req.body);
    
    res.status(200).json([]);
  
});

module.exports = router;