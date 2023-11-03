const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const app = express();
app.use(cors());

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1pig2cowes3sheep',
  database: 'swgoh'
});

const players = [{ally_code:"1",name:"Bobba"},{ally_code:"2",name:"Yoda"},{ally_code:"3",name:"Ben"},{ally_code:"4",name:"Luke"}]

app.get('/api/players/:ally_code', async (req, res) => {

  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM player");
  conn.release();
  res.status(200).json(rows);

  /*
  const ally_code = req.params.ally_code;
    
    const result = players.filter(player => player.ally_code === ally_code);

    res.status(201).json(result);
  */
  });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
