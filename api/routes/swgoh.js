const express = require('express');
const router = express.Router();
const axios = require('axios');
const runSQL = require('../database');

router.get('/player/:ally_code', async (req, res) => {

    const ally_code = req.params.ally_code;
    console.log("code "+ally_code);
    // Define the API endpoint you want to call
    const apiUrl = 'https://swgoh.gg/api/player/'+ally_code;
  
    // Define any request parameters (headers, query parameters, etc.) if needed
    const headers = {
     // 'Authorization': 'Bearer YourAccessToken',
    };
  
    // Make the API call
    axios.get(apiUrl, { headers })
      .then(response => {
        // Handle the response data
        //console.log('API response data:', response.data);
        populatePlayer(response.data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('API call failed:', error);
      });
  });

populatePlayer = async (data) => {

    const rows = await runSQL("SELECT ally_code FROM player WHERE ally_code = ?", data.data.ally_code);
    if(rows.length === 0){
      await runSQL("INSERT INTO player (ally_code, `name`) VALUES (?,?)", [data.data.ally_code,data.data.name]);
    }
  };

  module.exports = router;