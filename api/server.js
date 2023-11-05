const express = require('express');
const cors = require('cors');
var databaseRouter = require("../api/routes/database");
var swgohRouter = require("../api/routes/swgoh");
var playerRouter = require("../api/routes/player");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/database", databaseRouter);
app.use("/api/swgoh", swgohRouter);
app.use("/api/player", playerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});