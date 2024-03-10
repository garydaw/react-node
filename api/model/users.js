const runSQL = require('./database');

let users = {};

users.get = async () => {

    const rows = await runSQL("SELECT * FROM player ORDER BY ally_code");

    return rows;

}

users.find = async (ally_code) => {

    const rows = await runSQL("SELECT * FROM player WHERE ally_code = ?", [ally_code]);

    return rows;

}

users.update = async (ally_code, data) => {
    
    let sql = "UPDATE player SET access = ? WHERE ally_code = ?";

    await runSQL(sql, [data.access, ally_code]);
}

users.add = async (ally_code, password, name) => {
    
    let sql = "INSERT INTO player (ally_code, ally_name, password, access) VALUES (?, ?, ?, 0)";

    await runSQL(sql, [ally_code, name, password]);
}

users.delete = async (ally_code) => {
    
    let sql = "DELETE FROM player_mod WHERE ally_code = ?";

    await runSQL(sql, [ally_code]);
    
    sql = "DELETE FROM player_unit WHERE ally_code = ?";

    await runSQL(sql, [ally_code]);
    
    sql = "DELETE FROM player WHERE ally_code = ?";

    await runSQL(sql, [ally_code]);
}

users.getNotIn = async (guild_id, ally_codes) => {

    const rows = await runSQL("SELECT * FROM player WHERE guild_id = ? AND ally_code NOT IN (?)", [guild_id, ally_codes]);

    return rows;

}

module.exports = users;