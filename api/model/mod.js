const runSQL = require('./database');

let mod = {};

mod.checkPrimary = async (ally_code, date) => {


    let sql = "SELECT u.character_name, pm.primary_stat AS mod_primary, um.primary_stat AS best_primary, gs.group_set_name AS mod_set,";
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
    sql += "LEFT OUTER JOIN group_set gs ";
    sql += "    ON gs.group_set_id = pm.group_set_id ";
    sql += "WHERE pm.primary_stat <> um.primary_stat ";
    sql += "AND	 pm.ally_code =  ?";
    sql += "AND	 um.date = ? ";
    sql += "ORDER BY pu.power DESC, s.slot_id";

    const mismatches = await runSQL(sql, [ally_code, date]);
    
    return mismatches;

} 

mod.checkSet = async (ally_code, date) => {


    let sql = "SELECT u.character_name, pm.primary_stat AS mod_primary, bs.best_group_sets AS best_set, gs.group_set_name AS mod_set, ";
    sql += "s.slot_id, s.slot_long_name, s.slot_name, pu.power ";
    sql += "FROM player_mod pm ";
    sql += "INNER JOIN group_set gs ";
    sql += "ON gs.group_set_id = pm.group_set_id ";
    sql += "INNER JOIN unit u ";
    sql += "ON u.base_id = pm.base_id ";
    sql += "INNER JOIN player_unit pu ";
    sql += "ON pu.base_id = u.base_id ";
    sql += "INNER JOIN slot s ";
    sql += "ON s.slot_id = pm.slot_id ";
    sql += "INNER JOIN (SELECT  base_id, GROUP_CONCAT(DISTINCT group_set.group_set_name SEPARATOR ',') AS best_group_sets ";
    sql += "FROM unit_mod ";
    sql += "INNER JOIN group_set ";
    sql += "ON unit_mod.group_set_id = group_set.group_set_id ";
    sql += "AND unit_mod.date = ? ";
    sql += "GROUP BY base_id) bs ";
    sql += "ON	bs.base_id = pm.base_id ";
    sql += "LEFT OUTER JOIN ( ";
    sql += "SELECT DISTINCT base_id, group_set_id ";
    sql += "FROM unit_mod ";
    sql += "WHERE DATE = ?) um ";
    sql += "ON		um.base_id = pm.base_id ";
    sql += "AND 	um.group_set_id = pm.group_set_id ";
    sql += "WHERE um.group_set_id IS NULL ";
    sql += "AND 	pm.ally_code = ? ";
    sql += "ORDER BY pu.power DESC, s.slot_id ";

    const mismatches = await runSQL(sql, [date, date, ally_code]);
    
    return mismatches;

} 

mod.checkSpeed = async (ally_code) => {


    let sql = "SELECT u.character_name, pm.primary_stat, gs.group_set_name, ";
    sql += "s.slot_id, s.slot_long_name, s.slot_name, pu.power, ";
    sql += "CASE WHEN primary_stat = 'Speed' THEN primary_stat_value ELSE 0 END + ";
    sql += "CASE WHEN secondary_stat_1 = 'Speed' THEN secondary_stat_1_value ELSE 0 END + ";
    sql += "CASE WHEN secondary_stat_2 = 'Speed' THEN secondary_stat_2_value ELSE 0 END + ";
    sql += "CASE WHEN secondary_stat_3 = 'Speed' THEN secondary_stat_3_value ELSE 0 END + ";
    sql += "CASE WHEN secondary_stat_4 = 'Speed' THEN secondary_stat_4_value ELSE 0 END AS speed ";
    sql += "FROM player_mod pm ";
    sql += "INNER JOIN group_set gs ";
    sql += "ON gs.group_set_id = pm.group_set_id ";
    sql += "INNER JOIN unit u ";
    sql += "ON u.base_id = pm.base_id ";
    sql += "INNER JOIN player_unit pu ";
    sql += "ON pu.base_id = u.base_id ";
    sql += "INNER JOIN slot s ";
    sql += "ON s.slot_id = pm.slot_id ";
    sql += "WHERE pm.ally_code = ? ";
    sql += "ORDER BY speed, pu.power DESC, s.slot_id ";

    const mismatches = await runSQL(sql, [ally_code]);
    
    return mismatches;

}

mod.searchUnassigned = async (ally_code, date, search) => {

    let params = [];
    params.push(date);
    params.push(ally_code);
    
    let sql = "SELECT	u.character_name, ";
    sql += "            s.slot_name, s.slot_long_name, ud.primary_stat, ";
    sql += "            CONCAT(gs1.group_set_name, ', ', gs2.group_set_name, ', ', gs3.group_set_name) AS group_set_name, ";
    sql += "            ugs.group_set_name AS u_group_set_name,  ";
    sql += "            pm.primary_stat AS u_primary_stat ";
    sql += "        FROM unit u ";
    sql += "        INNER JOIN unit_mod ud ";
    sql += "            ON	u.base_id = ud.base_id ";
    sql += "        INNER JOIN unit_mod set_1 ";
    sql += "            ON	ud.base_id = set_1.base_id ";
    sql += "            AND set_1.slot_id = 1 ";
    sql += "        INNER JOIN unit_mod set_2 ";
    sql += "            ON	ud.base_id = set_2.base_id ";
    sql += "            AND set_2.slot_id = 3 ";
    sql += "        INNER JOIN unit_mod set_3 ";
    sql += "            ON	ud.base_id = set_3.base_id ";
    sql += "            AND set_3.slot_id = 5 ";
    sql += "        INNER JOIN slot s ";
    sql += "            ON s.slot_id = ud.slot_id ";
    sql += "        INNER JOIN group_set gs1 ";
    sql += "            ON	gs1.group_set_id = set_1.group_set_id ";
    sql += "        INNER JOIN group_set gs2 ";
    sql += "            ON	gs2.group_set_id = set_2.group_set_id ";
    sql += "        INNER JOIN group_set gs3 ";
    sql += "            ON	gs3.group_set_id = set_3.group_set_id ";
    sql += "        INNER JOIN player_unit pu ";
    sql += "            ON	pu.base_id = ud.base_id ";
    sql += "        LEFT OUTER JOIN player_mod pm  ";
    sql += "            ON	pu.ally_code = pm.ally_code  ";
    sql += "            AND	ud.base_id = pm.base_id  ";
    sql += "            AND	ud.slot_id = pm.slot_id ";
    sql += "        LEFT OUTER JOIN group_set ugs ";
    sql += "        ON	ugs.group_set_id = pm.group_set_id ";
    sql += "    WHERE ud.date = ? ";
    sql += "    AND	pu.ally_code = ? ";
    if(search.slot !== ""){
        sql += "AND	ud.slot_id = ? ";
        params.push(search.slot);
    }
    if(search.group_set !== ""){
        sql += "AND 	(set_1.group_set_id = ? OR set_2.group_set_id = ? OR set_3.group_set_id = ?) ";
        params.push(search.group_set);
        params.push(search.group_set);
        params.push(search.group_set);
    }
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