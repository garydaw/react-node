const express = require('express');
const cors = require('cors');
const app = express();
const players = [{ally_code:"1",name:"Bobba"},{ally_code:"2",name:"Yoda"},{ally_code:"3",name:"Ben"},{ally_code:"4",name:"Luke"}]
app.use(cors());

app.get('/api/players/:ally_code', (req, res) => {
    const ally_code = req.params.ally_code;
    
    const result = players.filter(player => player.ally_code === ally_code);

    res.status(201).json(result);
  });

/*
app.get('/api/players', (req, res) => {

  res.status(201).json(players);
});*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
