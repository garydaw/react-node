//player api
const express = require('express');
const router = express.Router();
const axios = require('axios');


//get player details
router.get('/', async (req, res) => {
    
    const result = "ping"
    res.json(result);
  
});


module.exports = router;