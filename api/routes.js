const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const databaseRouter = require("../api/routes/database");
const swgohRouter = require("../api/routes/swgoh");
const playerRouter = require("../api/routes/player");
const modRouter = require("../api/routes/mod");
const jgRouter = require("../api/routes/journeyGuide");
const teamRouter = require("../api/routes/team");

const myMiddleware = (req, res, next) => {
    // Check if the current route should be excluded
    if (req.path === '/player/login' ) {
      return next(); // Skip middleware for excluded routes
    }
  
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token.replace('Bearer ', ''), 'wehave0bananasToday!', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: 'Session Expired' });
      }
      req.user = decoded.user;
      return next();
    });
  };

apiRouter.use(myMiddleware);

//split out api routes to separate files
apiRouter.use("/database", databaseRouter);
apiRouter.use("/swgoh", swgohRouter);
apiRouter.use("/player", playerRouter);
apiRouter.use("/mod", modRouter);
apiRouter.use("/journeyGuide", jgRouter);
apiRouter.use("/team", teamRouter);

module.exports = apiRouter;