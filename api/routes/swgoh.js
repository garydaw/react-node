//api to connect onto the swgoh api
const express = require('express');
const router = express.Router();
const axios = require('axios');
const runSQL = require('../model/database');

const apiRoot = 'https://swgoh.gg/api';
//blank at the moment
const headers = {};

//get refresh player units and mods
router.get('/units', async (req, res) => {

  //get the player details
  axios.get(apiRoot + '/units', { headers })
    .then(response => {
      
      //populate player data
      populateUnits(response.data.data);
      res.status(200).json("Finished");

    })
    .catch(error => {
      console.error('API call failed:', error);
    });
});

//populate unit with returned data
populateUnits = async (data) => {
  
  //loop round units
  for(var u = 0; u < data.length; u++){

    //does unit already exist
    let rows = await runSQL("SELECT id FROM unit WHERE base_id = ?", data[u].base_id);

    //insert default record
    if(rows.length === 0){
      await runSQL("INSERT INTO unit (base_id) VALUES (?)", [data[u].base_id]);
      rows = await runSQL("SELECT id FROM unit WHERE base_id = ?", data[u].base_id);
    } 

    //update everything
    await runSQL("UPDATE unit "+
      "SET combat_type = ?, "+
      "`name` = ?, "+
      "url = ? "+
      "WHERE id = ?",
      [data[u].combat_type,
      data[u].name, 
      "https:" + data[u].url, 
      rows[0].id]);
  }
};


//get refresh player units and mods
router.get('/player/:ally_code', async (req, res) => {
  
  //get parameters
  const ally_code = req.params.ally_code;

  //get the player details
  axios.get(apiRoot + '/player/'+ally_code, { headers })
    .then(response => {
      
      //populate player data
      populatePlayer(response.data);
      res.status(200).json("Finished");

    })
    .catch(error => {
      console.error('API call failed:', error);
    });
});

//populate player with returned data
populatePlayer = async (data) => {
  
  //get player id
  let rows = await runSQL("SELECT id FROM player WHERE ally_code = ?", data.data.ally_code);

  //if no player then insert and then get player id
  if(rows.length === 0){
    await runSQL("INSERT INTO player (ally_code) VALUES (?)", [data.data.ally_code]);
    rows = await runSQL("SELECT id FROM player WHERE ally_code = ?", [data.data.ally_code]);
  }

  const player_id = rows[0].id;

  //update player name
  await runSQL("UPDATE player SET `name` = ? WHERE id = ?", [data.data.name, player_id]);

  let unit_id;
  
  //loop round units
  for(var u = 0; u < data.units.length; u++){

    rows = await runSQL("SELECT id FROM unit WHERE base_id = ?", data.units[u].data.base_id);
    unit_id = rows[0].id;

    //does unit already exist
    rows = await runSQL("SELECT player_id FROM player_unit WHERE player_id = ? AND unit_id = ?", [player_id, unit_id]);

    //insert default record
    if(rows.length === 0){
      await runSQL("INSERT INTO player_unit (player_id, unit_id) VALUES (?,?)", [player_id, unit_id]);
      rows = await runSQL("SELECT player_id FROM player_unit WHERE player_id = ? AND unit_id = ?", [player_id, unit_id]);
    } 

    //update everything
    await runSQL("UPDATE player_unit "+
      "SET level = ?, "+
      "gear_level = ?, "+
      "power = ? "+
      "WHERE player_id = ? "+
      "AND unit_id = ?",
      [data.units[u].data.level,
      data.units[u].data.gear_level,
      data.units[u].data.power,
      player_id, unit_id
    ]);
  }
};

module.exports = router;