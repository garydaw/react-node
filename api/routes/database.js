const express = require('express');
const router = express.Router();
const runSQL = require('../database');

router.get('/migrate', async (req, res) => {

    console.log("starting");
  
    console.log("creating player");
    await runSQL("CREATE TABLE IF NOT EXISTS player ("+
        "id int auto_increment, "+
        "ally_code VARCHAR(64) NOT NULL UNIQUE, "+
        "`name` VARCHAR(64), "+
        "primary key(id));");
  
    console.log("creating unit");
    await runSQL("CREATE TABLE IF NOT EXISTS unit ("+
        "id int AUTO_INCREMENT, "+
        "base_id VARCHAR(64) NOT NULL, "+
        "`name` VARCHAR(64), "+
        "primary key(id), UNIQUE(base_id));");
  
    console.log("creating unit_mods");
    await runSQL("CREATE TABLE IF NOT EXISTS unit_mods ("+
        "id int AUTO_INCREMENT, "+
        "date DATE NOT NULL DEFAULT CURDATE(), "+
        "unit_id int NOT NULL, "+
        "arrow VARCHAR(64), "+
        "triangle VARCHAR(64), "+
        "circle VARCHAR(64), "+
        "`cross` VARCHAR(64), "+
        "primary key(id), UNIQUE(DATE,unit_id));");
  
    console.log("creating player_unit");
    await runSQL("CREATE TABLE IF NOT EXISTS player_unit ("+
        "player_id int, "+
        "unit_id int NOT NULL, "+
        "level int NOT NULL, "+
        "gear_level int NOT NULL, "+
        "power int NOT NULL, "+
        "arrow VARCHAR(64), "+
        "triangle VARCHAR(64), "+
        "circle VARCHAR(64), "+
        "`cross` VARCHAR(64), "+
        "square_set int, "+
        "arrow_set int, "+
        "diamond_set int, "+
        "triangle_set int, "+
        "circle_set int, "+
        "cross_set int, "+
        "primary key(player_id, unit_id));");
  
    console.log("complete");
    res.status(200).json("finished");
  
  });

  module.exports = router;