//player api
const express = require('express');
const router = express.Router();
const player = require("../model/player");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Find the user in the database
    const this_user = await player.login(username);
    
    if (Object.keys(this_user).length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, this_user[0].password);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Create a JWT token for authentication
    const token = jwt.sign({ username: this_user[0].ally_code }, 'wehave0bananasToday!', { expiresIn: '1h' });
  
    res.json({ token });
  });

//get player details
router.get('/:ally_code', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const this_player = await player.get(ally_code);
    res.json(this_player);
  
});

router.get('/:ally_code/unit/:base_id', async (req, res) => {
    
    const ally_code = req.params.ally_code;
    const base_id = req.params.base_id;
    const unit = await player.getUnit(ally_code, base_id);
    res.status(200).json(unit);
  
});

router.get('/token/check', async (req, res) => {
    
  res.status(200).json("true");

});



module.exports = router;