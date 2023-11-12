//api to connect onto the swgoh api
const express = require('express');
const router = express.Router();
const axios = require('axios');
const swgoh = require('../model/swgoh');
const player = require('../model/player');

const siteRoot = 'https://swgoh.gg/';

//blank at the moment might need later
const headers = {};

//get refresh player units and mods
router.get('/units', async (req, res) => {

  const response = await axios.get(
		siteRoot + 'api/units', { headers }
	);

  const units = await swgoh.setUnits(response.data.data);
  
  res.status(200).json("Updated " + units[0].num_of_units + " units.");
});


//get refresh player units and mods
router.get('/player/:ally_code', async (req, res) => {
  
  //get parameters
  const ally_code = req.params.ally_code;

  const response = await axios.get(
		siteRoot + 'api/player/'+ally_code, { headers }
	);

  await swgoh.setPlayer(response.data);

  const this_player = await player.get(ally_code);
    
  res.status(200).json(this_player);
});

router.get('/bestmods', async (req, res) => {

  const units = await swgoh.getUnits();

  await swgoh.deleteBestMods();

  for(var u = 0; units.length > u; u++){
    if(units[u].combat_type === 1){
 //if(units[u].base_id === "MOFFGIDEONS3"){
      const response = await axios.get(
        'https:' + units[u].url + 'best-mods/', { headers }
      );
      console.log(units[u].base_id);
      await swgoh.setMods(units[u].base_id, units[u].character_name, response.data);
//}
    }
  }
  
  res.status(200).json("Updated " + units[0].num_of_units + " units.");
});


module.exports = router;