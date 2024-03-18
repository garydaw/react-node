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

    const operation_sql = "SELECT * FROM rote_operation WHERE path = ? AND phase = ? AND operation = ? AND unit_index = ?";
    const sql = "INSERT INTO rote_operation (path, phase, operation, unit_index, relic_level, base_id) VALUES (?, ?, ?, ?, ?, ?)";
    for(let $i = 0; $i < 15; $i++){
        
        const operation = await runSQL(operation_sql, [data.path, data.phase, data.operation, $i]);
        if(operation.length === 1){
            return "Phase Operation already added.";
        }
        
        await runSQL(sql, [data.path, data.phase, data.operation, $i, data.relic_level, data.team[$i].base_id]);
    }

    return "Operation added.";
}

rote.getOperations = async (path, phase) => {

    let operations = [];
    for(let i = 1; i < 7; i++){
        let sql = "SELECT ro.path, ro.phase, ro.operation, "
        sql += "ro.unit_index, ro.base_id, u.character_name, "
        sql += "p.ally_code, p.ally_name "
        sql += "FROM rote_operation ro "
        sql += "INNER JOIN unit u "
        sql += "    ON u.base_id = ro.base_id "
        sql += "LEFT OUTER JOIN player p "
        sql += "    ON  ro.ally_code = p.ally_code "
        sql += "WHERE ro.path = ? ";
        sql += "AND ro.phase = ? ";
        sql += "AND ro.operation = ? ";
        sql += "ORDER BY ro.unit_index "

        const operation = await runSQL(sql, [path, phase, i]);
        operations.push(operation);
    }

    return operations;
}

module.exports = rote;