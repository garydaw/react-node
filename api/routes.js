const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const databaseRouter = require("../api/routes/database");
const swgohRouter = require("../api/routes/swgoh");
const playerRouter = require("../api/routes/player");
const modRouter = require("../api/routes/mod");
const jgRouter = require("../api/routes/journeyGuide");
const teamRouter = require("../api/routes/team");
const usersRouter = require("../api/routes/users");
const roteRouter = require("../api/routes/rote");
const testRouter = require("../api/routes/test");

const myMiddleware = (req, res, next) => {
  
    // Check if the current route should be excluded
    if (
          req.path === '/player/login'
          || req.path.slice(0, 18) === '/database/migrate/' 
          || req.path === '/test'
          || req.path.slice(0, 13) === '/swgoh/guild/' 
        ) {
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
      //must have access
      if (
          req.path === '/swgoh/units' 
          || req.path === '/swgoh/bestmods'
          || (req.method === "DELETE" && req.path.slice(0, 6) === '/team/')
          || (req.method === "POST" && req.path.slice(0, 6) === '/team/')
          || req.path.slice(0, 7) === '/users/' 
          || req.path.slice(0, 25) === '/rote/operation/allocate/' 
          || req.path.slice(0, 20) === '/rote/operation/swap'
          || (req.method === "POST" && req.path.slice(0, 6) === '/journeyGuide/')
          
        ) {
        if (decoded.access === 0) {
          return res.status(401).json({ message: 'Insuffient access' });
        }
      }

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
apiRouter.use("/users", usersRouter);
apiRouter.use("/rote", roteRouter);
apiRouter.use("/test", testRouter);

module.exports = apiRouter;