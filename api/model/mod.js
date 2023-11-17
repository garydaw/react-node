const runSQL = require('./database');

let mod = {};

mod.checkPrimary = async (ally_code, date) => {


    let sql = "SELECT u.character_name, pm.primary_stat AS mod_primary, um.primary_stat AS best_primary, ";
    sql += "s.slot_id, s.slot_long_name, s.slot_name, pu.power ";
    sql += "FROM player_mod pm ";
    sql += "INNER JOIN unit u ";
	sql += "    ON pm.base_id = u.base_id ";
    sql += "INNER JOIN player_unit pu ";
	sql += "    ON pu.base_id = u.base_id ";
    sql += "LEFT OUTER JOIN unit_mod um ";
    sql += "    ON pm.base_id = um.base_id ";
    sql += "    AND pm.slot_id = um.slot_id ";
    sql += "LEFT OUTER JOIN slot s ";
    sql += "    ON um.slot_id = s.slot_id ";
    sql += "WHERE pm.primary_stat <> um.primary_stat ";
    sql += "AND	 pm.ally_code =  ?";
    sql += "AND	 um.date = ? ";
    sql += "ORDER BY pu.power DESC, s.slot_id"

    const mismatches = await runSQL(sql, [ally_code, date]);
    
    return mismatches;

} 

mod.getDates = async () => {

    const dates = await runSQL("SELECT DISTINCT date FROM unit_mod ORDER BY date DESC", []);
    
    return dates;
} 

mod.getSlots = async () => {

    const slots = await runSQL("SELECT slot_id, slot_name, slot_long_name FROM slot ORDER BY slot_name", []);
    
    return slots;
}

module.exports = mod;