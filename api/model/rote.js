const runSQL = require('./database');

let rote = {};

rote.getUnits = async () => {

    let sql = "SELECT base_id, character_name, unit_image ";
    sql += "FROM unit ";
    sql += "ORDER BY character_name";

    const units = await runSQL(sql, []);
    
    return units;

}

rote.getGuildUnit = async (base_id) => {
    
    let sql = "";
    sql += "SELECT u.base_id, u.character_name, u.alignment, u.unit_image, ";
	sql += "	pu.gear_level, pu.gear_level_plus, pu.gear_level_flags, pu.level, pu.power, pu.rarity, ";
	sql += "	pu.relic_tier, pu.has_ultimate, pu.is_galactic_legend, ";
    sql += "    p.ally_name "
    sql += "FROM player_unit pu ";
    sql += "INNER JOIN unit u ";
    sql += "    ON pu.base_id = u.base_id ";
    sql += "INNER JOIN player p ";
    sql += "    ON p.ally_code = pu.ally_code ";
    sql += "WHERE u.base_id = ? ";
    sql += "ORDER BY pu.relic_tier DESC, pu.gear_level DESC, pu.gear_level_plus DESC, pu.power DESC"

    const units = await runSQL(sql, [base_id]);
    
    return units;
}

rote.addOperation = async (data) => {

    const operation = await runSQL("SELECT * FROM rote_operation WHERE path = ? AND phase = ?", [data.path, data.phase]);
    if(operation.length === 1){
        return "Phase already added.";
    }

    let sql = "INSERT INTO rote_operation (path, phase, relic_level, ";
    sql += "base_id_1, base_id_2, base_id_3, base_id_4, base_id_5, ";
    sql += "base_id_6, base_id_7, base_id_8, base_id_9, base_id_10, ";
    sql += "base_id_11, base_id_12, base_id_13, base_id_14, base_id_15) ";
    sql += "VALUES (?, ?, ?, ";
    sql += "?, ?, ?, ?, ?, ";
    sql += "?, ?, ?, ?, ?, ";
    sql += "?, ?, ?, ?, ?)";
    
    await runSQL(sql, [data.path, data.phase, data.relic_level,
        data.team[0].base_id, data.team[1].base_id, data.team[2].base_id, data.team[3].base_id, data.team[4].base_id,
        data.team[5].base_id, data.team[6].base_id, data.team[7].base_id, data.team[8].base_id, data.team[9].base_id,
        data.team[10].base_id, data.team[11].base_id, data.team[12].base_id, data.team[13].base_id, data.team[14].base_id]);
    return "Operation added.";
}

module.exports = rote;