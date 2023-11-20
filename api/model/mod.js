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

mod.searchUnassigned = async (ally_code, date, search) => {

    let params = [];
    params.push(date);
    params.push(ally_code);
    
    let sql = "SELECT	u.character_name, ";
    sql += "        s.slot_name, s.slot_long_name, gs.group_set_name, ud.primary_stat, ";
    sql += "        gs2.group_set_name AS u_group_set, pm.primary_stat AS u_primary_stat ";
    sql += "    FROM unit u ";
    sql += "    INNER JOIN unit_mod ud ";
    sql += "        ON	u.base_id = ud.base_id ";
    sql += "    INNER JOIN slot s ";
    sql += "        ON s.slot_id = ud.slot_id ";
    sql += "    INNER JOIN group_set gs ";
    sql += "        ON	gs.group_set_id = ud.group_set_id ";
    sql += "    INNER JOIN player_unit pu ";
    sql += "        ON	pu.base_id = ud.base_id ";
    sql += "    LEFT OUTER JOIN player_mod pm  ";
    sql += "        ON	pu.ally_code = pm.ally_code  ";
    sql += "        AND	ud.base_id = pm.base_id  ";
    sql += "        AND	ud.slot_id = pm.slot_id ";
    sql += "    LEFT OUTER JOIN group_set gs2 ";
    sql += "        ON	gs2.group_set_id = pm.group_set_id ";
    sql += "    WHERE ud.date = ? ";
    sql += "    AND	pu.ally_code = ? ";
    if(search.slot !== ""){
        sql += "AND	ud.slot_id = ? ";
        params.push(search.slot);
    }
    /*
    if(search.group_set !== ""){
        sql += "AND 	ud.group_set_id = ? ";
        params.push(search.group_set);
    }*/
    if(search.primary !== ""){
        sql += "AND	ud.primary_stat = ? ";
        params.push(search.primary);
    }
    if(search.assigned === "false"){
        sql += "AND	pm.base_id IS NULL ";
    }
    sql += "ORDER BY pu.power DESC ";

    const unassigned = await runSQL(sql, params);
    
    return unassigned;

} 

mod.getDates = async () => {

    const dates = await runSQL("SELECT DISTINCT date FROM unit_mod ORDER BY date DESC", []);
    
    return dates;
} 

mod.getSlots = async () => {

    const slots = await runSQL("SELECT slot_id, slot_name, slot_long_name FROM slot ORDER BY slot_name", []);
    
    return slots;
}

mod.getGroupSets = async () => {

    const group_sets = await runSQL("SELECT group_set_id, group_set_name FROM group_set ORDER BY group_set_name", []);
    
    return group_sets;
}

mod.getPrimaries = async () => {

    const primaries = await runSQL("SELECT DISTINCT primary_stat FROM unit_mod ORDER BY primary_stat", []);
    
    return primaries;
}

module.exports = mod;