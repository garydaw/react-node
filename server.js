const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const app = express();
const axios = require('axios');

app.use(cors());

//vars to be swapped with env variables
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1pig2cowes3sheep',
  database: 'swgoh'
});


app.get('/api/players/:ally_code', async (req, res) => {

  const ally_code = req.params.ally_code;
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM player WHERE ally_code = ?", ally_code);
  conn.release();
  res.status(200).json(rows);

  });

app.get('/api/refreshPlayer/:ally_code', async (req, res) => {

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
      console.log('API response data:', response.data);
      populatePlayer(response.data);
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error('API call failed:', error);
    });
});

populatePlayer = async (data) => {

  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT ally_code FROM player WHERE ally_code = ?", data.data.ally_code);
  if(rows.length === 0){
    await conn.query("INSERT INTO player (ally_code, `name`) VALUES (?,?)", [data.data.ally_code,data.data.name]);
  }
  conn.release();
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/api/databaseMigrate', async (req, res) => {

  console.log("starting");
  const conn = await pool.getConnection();

  console.log("creating player");
  await conn.query("CREATE TABLE IF NOT EXISTS player ("+
      "id int auto_increment, "+
      "ally_code VARCHAR(64) NOT NULL UNIQUE, "+
      "`name` VARCHAR(64), "+
      "primary key(id));");

  console.log("creating unit");
  await conn.query("CREATE TABLE IF NOT EXISTS unit ("+
      "id int AUTO_INCREMENT, "+
      "base_id VARCHAR(64) NOT NULL, "+
      "`name` VARCHAR(64), "+
      "primary key(id), UNIQUE(base_id));");

  console.log("creating unit_mods");
  await conn.query("CREATE TABLE IF NOT EXISTS unit_mods ("+
      "id int AUTO_INCREMENT, "+
      "date DATE NOT NULL DEFAULT CURDATE(), "+
      "unit_id int NOT NULL, "+
      "arrow VARCHAR(64), "+
      "triangle VARCHAR(64), "+
      "circle VARCHAR(64), "+
      "`cross` VARCHAR(64), "+
      "primary key(id), UNIQUE(DATE,unit_id));");

  console.log("creating player_unit");
  await conn.query("CREATE TABLE IF NOT EXISTS player_unit ("+
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

  conn.release();
  console.log("complete");
  res.status(200).json("finished");

});