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
        sql += "ORDER BY ro.unit_index ";

        const operation = await runSQL(sql, [path, phase, i]);
        operations.push(operation);
    }

    return operations;
}

rote.getEmptyAllocations = async (path, phase, operations) => {

    let sql = "SELECT op.base_id, u.combat_type, op.relic_level, "
        + "op.required, COUNT(*) AS guild_count, GREATEST(op.required - COUNT(*), 0) AS missing "
        + "FROM (SELECT base_id, relic_level, COUNT(*) AS required "
        + "FROM rote_operation "
        + "WHERE ally_code IS NULL "
        + "AND path = ? "
        + "AND PHASE = ? "
        + "AND operation IN (?) "
        + "GROUP BY  base_id, relic_level) op "
        + "INNER JOIN unit u "
        + "ON u.base_id = op.base_id "
        + "LEFT OUTER JOIN (SELECT pu1.* "
        + "                FROM player_unit pu1 "
        + "                LEFT OUTER JOIN rote_operation ro1 "
        + "                    ON  pu1.base_id = ro1.base_id "
        + "                    AND pu1.ally_code = ro1.ally_code "
        + "                    AND   ro1.path = ? "
        + "                    AND   ro1.PHASE = ? "
        + "                    AND   ro1.operation IN (?)  "
        + "                WHERE ro1.base_id IS NULL"
        + "                AND   pu1.ally_code NOT IN (SELECT ally_code "
        + "                                               FROM rote_operation "
        + "                                               WHERE path = ? "
        + "                                               AND PHASE = ? "
        + "                                               AND operation IN (?) "
        + "                                               GROUP BY ally_code "
        + "                                               HAVING COUNT(*) < 10) "
        + "                                             ) AS pu "
        + "ON 	op.base_id = pu.base_id "
        + "AND	pu.rarity = 7 "
        + "AND CASE WHEN u.combat_type = 1 THEN pu.relic_tier - 2 ELSE op.relic_level END >= op.relic_level "
        + "GROUP BY op.base_id, op.required ";

    const empty_operations = await runSQL(sql, [path, phase, operations, path, phase, operations, path, phase, operations]);

    return empty_operations;
}

rote.getAllyCountAvailableAllocations = async (path, phase, operations) => {

    const sql = 
    "SELECT 	pu.ally_code, COUNT(*) AS ally_available, "
    +"    IFNULL((SELECT 	COUNT(*) AS ally_allocation "
    +"        FROM 		rote_operation ro1 "
    +"        WHERE		ro1.PATH = ? "
    +"        AND 		ro1.PHASE = ? "
    +"        AND		ro1.ally_code = pu.ally_code "
    +"        GROUP BY pu.ally_code), 0) AS ally_allocated "
    +"    FROM 	(SELECT DISTINCT ro1.base_id, ro1.relic_level, u.combat_type "
    +"                FROM	rote_operation ro1 "
    +"                INNER JOIN unit u "
    +"                    ON	ro1.base_id = u.base_id "
    +"                WHERE		ro1.PATH = ? "
    +"                AND 		ro1.PHASE = ? "
    +"                AND     	ro1.operation IN (?) "
    +"                AND		ro1.ally_code IS NULL) ro "
    +"        INNER JOIN player_unit pu "
    +"        ON  	pu.base_id = ro.base_id "
    +"        AND	pu.rarity = 7 "
    +"        AND	CASE WHEN ro.combat_type = 1 THEN pu.relic_tier - 2 ELSE ro.relic_level END >= ro.relic_level "
    +"    GROUP BY pu.ally_code "
    +"    ORDER BY ally_available";

    return await runSQL(sql, [path, phase, path, phase, operations]);
}

rote.allocateAlly = async (path, phase, operations, ally_code) => {
    
    let sql = 
    "SELECT 	DISTINCT ro.base_id "
    +"    FROM 	rote_operation ro "
    +"    INNER JOIN unit u "
    +"        ON	ro.base_id = u.base_id "
    +"    INNER JOIN player_unit pu "
    +"       ON  	pu.base_id = ro.base_id "
    +"       AND	pu.rarity = 7 "
    +"       AND	CASE WHEN u.combat_type = 1 THEN pu.relic_tier - 2 ELSE ro.relic_level END >= ro.relic_level "
    +"    WHERE		ro.PATH = ? "
    +"    AND 		ro.PHASE = ? "
    +"    AND     	ro.operation IN (?) "
    +"    AND		ro.ally_code IS NULL "
    +"    AND		pu.ally_code = ?";

    const base_ids = await runSQL(sql, [path, phase, operations, ally_code]);
    
    base_ids.forEach(async function (ally, index) {
        sql = "UPDATE rote_operation SET ally_code = ? WHERE base_id = ? AND path = ? "
            + "AND phase = ? AND operation IN (?) AND ally_code IS NULL ORDER BY operation, unit_index LIMIT 1";
        await runSQL(sql, [ally_code, ally.base_id, path, phase, operations]);
    });
}

rote.allocateOperations = async (path, phase) => {

    //reset allocation
    let sql = "UPDATE rote_operation SET ally_code = null WHERE path = ? AND phase = ?";
    await runSQL(sql, [path, phase]);

    //all operations
    const all_operations = [1,2,3,4,5,6];

    //operations that cant be filled
    sql = "SELECT DISTINCT operation ";
    sql += "FROM rote_operation ro ";
    sql += "INNER JOIN unit u ";
    sql += "    ON	ro.base_id = u.base_id ";
    sql += "LEFT OUTER JOIN player_unit pu ";
    sql += "ON 	ro.base_id = pu.base_id ";
    sql += "AND	pu.rarity = 7 ";
    sql += "AND CASE WHEN u.combat_type = 1 THEN pu.relic_tier -2 ELSE ro.relic_level END >= ro.relic_level ";
    sql += "WHERE ro.path = ? ";
    sql += "AND 	ro.PHASE = ? ";
    sql += "AND	pu.base_id IS NULL ";

    const impossible_operations = await runSQL(sql, [path, phase]);
    const impossible_array = impossible_operations.map(obj => obj.operation);

    //possible operations, but may need multiple phases
    const makeable_operations = all_operations.filter(num => !impossible_array.includes(num));

    let fill_operations = makeable_operations;

    //check makeable operations
    let base_ids = await rote.getEmptyAllocations(path, phase, fill_operations);

    //filter by missing != 0
    let missing_base_ids = base_ids.filter(item => item.missing > 0);

    while (missing_base_ids.length > 0){
        missing_base_ids.sort((a, b) => b.missing < a.missing ? -1 : (b.missing > a.missing ? 1 : 0));

        sql = "SELECT operation, COUNT(*) as unit_count "
         + "FROM    rote_operation "
         + "WHERE   path = ? "
         + "AND 	PHASE = ? "
         + "AND     operation IN (?) "
         + "AND     base_id = ? "
         + "GROUP BY operation "
         + "ORDER BY COUNT(*) DESC"

         const unit_count = await runSQL(sql, [path, phase, fill_operations, missing_base_ids[0].base_id]);

         const remove_operation = rote.minNumbersToAddUpToTarget(unit_count, missing_base_ids[0].missing);

         fill_operations = fill_operations.filter(item => !remove_operation.includes(item));

         base_ids = await rote.getEmptyAllocations(path, phase, fill_operations);

        //filter by missing != 0
        missing_base_ids = base_ids.filter(item => item.missing > 0);
    }
    
    await rote.allocateToOperations(path, phase, fill_operations);
    const removed_operations = all_operations.filter(item => !fill_operations.includes(item));
    
    await rote.allocateToOperations(path, phase, removed_operations);

}

rote.allocateToOperations = async (path, phase, operations) => {

    let allocation_left = await rote.getAllyCountAvailableAllocations(path, phase, operations);
    let found = true;
    while(allocation_left.length > 0 && found){
        found = false;
        for(var i = 0; i < allocation_left.length; i++){
            if(allocation_left[i].ally_available + allocation_left[i].ally_allocated < 10){
                found = true;
                await rote.allocateAlly(path, phase, operations, allocation_left[i].ally_code);
            }
        }
        allocation_left = await rote.getAllyCountAvailableAllocations(path, phase, operations);
    }
}

rote.minNumbersToAddUpToTarget = (arr, target) => {
   
    let sum = BigInt(0);
    let index = arr.length - 1;
    const usedNumbers = [];
    
    while (sum < target && index >= 0) {
        while (sum + arr[index].unit_count <= target) {
            sum += arr[index].unit_count;
            usedNumbers.push(arr[index].operation);
            if (sum >= target) {
                return usedNumbers;
            }
        }
        index--;
    }
    
    return usedNumbers; // If no combination of numbers adds up to the target
}

module.exports = rote;

