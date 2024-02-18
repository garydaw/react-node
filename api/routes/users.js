//player api
const express = require('express');
const router = express.Router();
const axios = require('axios');
const users = require("../model/users");
const bcrypt = require('bcrypt');

const siteRoot = 'https://swgoh.gg/';

//blank at the moment might need later
const headers = {};

//get player details
router.get('/', async (req, res) => {
    
    const allUsers = await users.get();
    res.json(allUsers);
  
});

router.post('/:ally_code', async (req, res) => {
  
  const ally_code = req.params.ally_code;
  await users.update(ally_code, req.body);

  const allUsers = await users.get();
  res.json(allUsers);

});

router.put('/', async (req, res) => {
  
  const ally_code = req.body.ally_code;

  const check = await users.find(ally_code);
  if(check.length === 1){
    return res.status(401).json({ message: 'User already exists'});
  }

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

  const password = await bcrypt.hash(ally_code, 10);
  await users.add(ally_code, password, response.data.data.name);

  const allUsers = await users.get();
  res.json(allUsers);

});

router.delete('/:ally_code', async (req, res) => {
  
  const ally_code = req.params.ally_code;
  await users.delete(ally_code);

  const allUsers = await users.get();
  res.json(allUsers);

});

module.exports = router;