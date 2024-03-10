//api to connect onto the swgoh api
const express = require('express');
const router = express.Router();
const axios = require('axios');
const swgoh = require('../model/swgoh');
const player = require('../model/player');
const users = require('../model/users');
const bcrypt = require('bcrypt');

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

//refresh all guild members
router.get('/guild/:guild_id', async (req, res) => {

  //refresh units incase there is something new
  const unit_response = await axios.get(
		siteRoot + 'api/units', { headers }
	);

  await swgoh.setUnits(unit_response.data.data);

  const guild_id = req.params.guild_id;
  
  //get guild page
  const response = await axios.get(
    siteRoot + 'g/'+guild_id, { headers }
  );
  
  //find guild members
  let text_start = 0;
  const text = '<a href="/p/';
  text_start = response.data.indexOf(text, text_start) + text.length;
  let ally_code = '';
  let guild_ally_codes = [];

  while(text_start !== text.length-1){
    guild_ally_codes.push(response.data.substr(text_start, 9))
    text_start = response.data.indexOf(text, text_start) + text.length;
  }

  //find users that are no longer in the guild
  const delete_users = await users.getNotIn(guild_id, guild_ally_codes);

  //delete these users
  for(var i = 0; i < delete_users.length; i++){
    await users.delete(delete_users[i].ally_code);
  }
  
  let password = "";
  let user_response = "";
  //loop through guild members
  for(var i = 0; i < guild_ally_codes.length; i++){

    user_response = await axios.get(
      siteRoot + 'api/player/'+guild_ally_codes[i], { headers }
    );

    //add user if needed
    const check = await users.find(guild_ally_codes[i]);
    if(check.length === 0){
      password = await bcrypt.hash(guild_ally_codes[i], 10);
      await users.add(guild_ally_codes[i], password, user_response.data.data.name);
    }
    
    //refresh user
    await swgoh.setPlayer(user_response.data);

  }
  res.status(200).json("finished");
});


//get refresh player units and mods
router.get('/player/:ally_code', async (req, res) => {
  
  if(req.query.refresh === "true"){
    const response = await axios.get(
      siteRoot + 'api/units', { headers }
    );
  
    const units = await swgoh.setUnits(response.data.data);
  }

  //get parameters
  const ally_code = req.params.ally_code;
  let response;
  
  try {
    response = await axios.get(
      siteRoot + 'api/player/'+ally_code, { headers }
    );
  } catch(error){
    let returnObj = {};
    returnObj.error_message = "Ally code " + ally_code + " not found, please check and try again.";
    res.status(200).json(returnObj);
    return;
  }
  
  await swgoh.setPlayer(response.data);

  const this_player = await player.get(ally_code);
    
  res.status(200).json(this_player);
});

router.get('/bestmods', async (req, res) => {

  const units = await swgoh.getUnits();

  await swgoh.deleteBestMods();

  for(var u = 0; units.length > u; u++){
    if(units[u].combat_type === 1){
      
      const response = await axios.get(
        'https:' + units[u].url + 'best-mods/', { headers }
      );
      
      await swgoh.setMods(units[u].base_id, units[u].character_name, response.data);
      
    }
  }
  
  res.status(200).json("Updated " + units[0].num_of_units + " units.");
});


module.exports = router;