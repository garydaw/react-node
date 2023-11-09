const express =require('express');
const apiRouter = express.Router();

const databaseRouter = require("../api/routes/database");
const swgohRouter = require("../api/routes/swgoh");
const playerRouter = require("../api/routes/player");


//split out api routes to separate files
apiRouter.use("/database", databaseRouter);
apiRouter.use("/swgoh", swgohRouter);
apiRouter.use("/player", playerRouter);

module.exports = apiRouter;