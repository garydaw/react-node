const runSQL = require('./database');

let mod = {};

mod.checkPrimary = async (ally_code, date) => {


    let sql = "SELECT u.character_name, pm.primary_stat AS mod_primary, um.primary_stat AS best_primary ";
    sql += "FROM player_mod pm ";
    sql += "INNER JOIN unit u ";
	sql += "    ON pm.base_id = u.base_id ";
    sql += "LEFT OUTER JOIN unit_mod um ";
    sql += "    ON pm.base_id = um.base_id ";
    sql += "    AND pm.slot = um.slot ";
    sql += "WHERE pm.primary_stat <> um.primary_stat ";
    sql += "AND	 pm.ally_code =  ?";
    sql += "AND	 um.date = ? ";

    const mismatches = await runSQL(sql, [ally_code, date]);
    
    return mismatches;

} 

module.exports = mod;