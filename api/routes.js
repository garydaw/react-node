const express =require('express');
const apiRouter = express.Router();

const databaseRouter = require("../api/routes/database");
const swgohRouter = require("../api/routes/swgoh");
const playerRouter = require("../api/routes/player");
const modRouter = require("../api/routes/mod");
const jgRouter = require("../api/routes/journeyGuide");
const teamRouter = require("../api/routes/team");


//split out api routes to separate files
apiRouter.use("/database", databaseRouter);
apiRouter.use("/swgoh", swgohRouter);
apiRouter.use("/player", playerRouter);
apiRouter.use("/mod", modRouter);
apiRouter.use("/journeyGuide", jgRouter);
apiRouter.use("/team", teamRouter);

module.exports = apiRouter;