//db api
const express = require('express');
const router = express.Router();
const migration = require('../model/migrations');

//db structure set up
router.get('/migrate/:version', async (req, res) => {

    //call migration
    const version = req.params.version;
    await migration.run(version);
    res.status(200).json("finished");
  
  });

  module.exports = router;