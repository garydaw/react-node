const express = require("express");
var databaseRouter = require("../api/routes/database");
var swgohRouter = require("../api/routes/swgoh");
var playerRouter = require("../api/routes/player");

module.exports = function(app) {
  app.use(express.json());

  app.use("/database", databaseRouter);
  app.use("/swgoh", swgohRouter);
  app.use("/player", playerRouter);
};