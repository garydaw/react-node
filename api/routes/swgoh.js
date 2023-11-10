//api to connect onto the swgoh api
const express = require('express');
const router = express.Router();
const axios = require('axios');
const swgoh = require('../model/swgoh');
const player = require('../model/player');

const apiRoot = 'https://swgoh.gg/api';
//blank at the moment might need later
const headers = {};

//get refresh player units and mods
router.get('/units', async (req, res) => {

  const response = await axios.get(
		apiRoot + '/units', { headers }
	);

  const units = await swgoh.setUnits(response.data.data);
  
  res.status(200).json("Updated " + units[0].num_of_units + " units.");
});


//get refresh player units and mods
router.get('/player/:ally_code', async (req, res) => {
  
  //get parameters
  const ally_code = req.params.ally_code;

  const response = await axios.get(
		apiRoot + '/player/'+ally_code, { headers }
	);

  await swgoh.setPlayer(response.data);

  const this_player = await player.get(ally_code);
    
  res.status(200).json(this_player);
});

module.exports = router;