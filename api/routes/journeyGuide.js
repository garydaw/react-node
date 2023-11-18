//journeyGuide api
const express = require('express');
const router = express.Router();
const journeyGuide = require("../model/journeyGuide");

router.get('/', async (req, res) => {
    
    const guides = await journeyGuide.getJourneyGuide();
    
    res.status(200).json(guides);
  
});

module.exports = router;