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
    const token = jwt.sign({ username: this_user[0].ally_code, access: this_user[0].access}, 'wehave0bananasToday!', { expiresIn: '168h' });
  
    res.json({ token, user:{ally_code: this_user[0].ally_code, access: this_user[0].access}});
  });

  router.post('/password', async (req, res) => {
    const { username, current_password, password1, password2 } = req.body;
  
    if(password1 === ""){
      return res.status(401).json({ message: 'Passwords cannot be blank'});
    }
    if(password1 !== password2){
      return res.status(401).json({ message: 'New Passwords do not match!'});
    }

    const this_user = await player.login(username);

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(current_password, this_user[0].password);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect current' });
    }
    
    
    const hash = await bcrypt.hash(password1, 10);
    await player.setPassword(username, hash)
  
    res.json("Password updated");
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