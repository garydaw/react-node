const runSQL = require('./database');

let player = {};

player.get = async (ally_code) => {

    let player_details = {};
    player_details.ally_code = ally_code;

    const rows = await runSQL("SELECT * FROM player WHERE ally_code = ?", ally_code);

    if(rows.length === 0)
        return player_details;

    player_details = rows[0];
    let sql2 = "";
    let sql = "";
    sql += "SELECT u.base_id, u.combat_type, u.character_name, ";
	sql += "	pu.gear_level, pu.level, pu.power, pu.rarity ";
    sql += "FROM player_unit pu ";
    sql += "INNER JOIN unit u ";
    sql += "    ON pu.base_id = u.base_id ";
    sql += "WHERE pu.ally_code = ? ";
    sql2 += "AND     u.combat_type = 1 ";
    sql2 += "ORDER BY u.character_name ";

    player_details.units = await runSQL(sql + sql2, ally_code);

    sql2 = "AND     u.combat_type = 2 ";
    sql2 += "ORDER BY u.character_name ";
    player_details.ships = await runSQL(sql + sql2, ally_code);

    
    return player_details;

} 

module.exports = player;