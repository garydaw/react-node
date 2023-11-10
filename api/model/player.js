const runSQL = require('./database');

let player = {};

player.get = async (ally_code) => {

    const rows = await runSQL("SELECT * FROM player WHERE ally_code = ?", ally_code);
    return rows;

} 

module.exports = player;