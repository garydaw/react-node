const runSQL = require('./database');

let gacTeam = {};

gacTeam.getGACTeam = async (ally_code) => {

    let sql = "SELECT gt.list_order, gt.defense, gt.offense, ";
    sql += "    u1.character_name AS character_name_1, u1.alignment AS alignment_1, ";
    sql += "    u2.character_name AS character_name_2, u2.alignment AS alignment_2, ";
    sql += "    u3.character_name AS character_name_3, u3.alignment AS alignment_3, ";
    sql += "    u4.character_name AS character_name_4, u4.alignment AS alignment_4, ";
    sql += "    u5.character_name AS character_name_5, u5.alignment AS alignment_5, ";
    sql += "    pu1.gear_level AS gear_level_1, pu1.gear_level_plus AS gear_level_plus_1, pu1.`level` AS level_1, pu1.`power` AS power_1, pu1.zeta_abilities AS zeta_abilities_1, pu1.omicron_abilities AS omicron_abilities_1, pu1.relic_tier AS relic_tier_1, ";
    sql += "    pu2.gear_level AS gear_level_2, pu2.gear_level_plus AS gear_level_plus_2, pu2.`level` AS level_2, pu2.`power` AS power_2, pu2.zeta_abilities AS zeta_abilities_2, pu2.omicron_abilities AS omicron_abilities_2, pu2.relic_tier AS relic_tier_2, ";
    sql += "    pu3.gear_level AS gear_level_3, pu3.gear_level_plus AS gear_level_plus_3, pu3.`level` AS level_3, pu3.`power` AS power_3, pu3.zeta_abilities AS zeta_abilities_3, pu3.omicron_abilities AS omicron_abilities_3, pu3.relic_tier AS relic_tier_3, ";
    sql += "    pu4.gear_level AS gear_level_4, pu4.gear_level_plus AS gear_level_plus_4, pu4.`level` AS level_4, pu4.`power` AS power_4, pu4.zeta_abilities AS zeta_abilities_4, pu4.omicron_abilities AS omicron_abilities_4, pu4.relic_tier AS relic_tier_4, ";
    sql += "    pu5.gear_level AS gear_level_5, pu5.gear_level_plus AS gear_level_plus_5, pu5.`level` AS level_5, pu5.`power` AS power_5, pu5.zeta_abilities AS zeta_abilities_5, pu5.omicron_abilities AS omicron_abilities_5, pu5.relic_tier AS relic_tier_5 ";
    sql += "     ";
    sql += "FROM gac_team gt ";
    sql += "INNER JOIN unit u1 ";
    sql += "    ON gt.base_id_1 = u1.base_id ";
    sql += "LEFT OUTER JOIN unit u2 ";
    sql += "    ON gt.base_id_2 = u2.base_id ";
    sql += "LEFT OUTER JOIN unit u3 ";
    sql += "    ON gt.base_id_3 = u3.base_id ";
    sql += "LEFT OUTER JOIN unit u4 ";
    sql += "    ON gt.base_id_4 = u4.base_id ";
    sql += "LEFT OUTER JOIN unit u5 ";
    sql += "    ON gt.base_id_5 = u5.base_id ";
    sql += "LEFT OUTER JOIN player_unit pu1 ";
    sql += "    ON gt.base_id_1 = pu1.base_id ";
    sql += "    AND pu1.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu2 ";
    sql += "    ON gt.base_id_2 = pu2.base_id ";
    sql += "    AND pu2.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu3 ";
    sql += "    ON gt.base_id_3 = pu3.base_id ";
    sql += "    AND pu3.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu4 ";
    sql += "    ON gt.base_id_4 = pu4.base_id ";
    sql += "    AND pu4.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu5 ";
    sql += "    ON gt.base_id_5 = pu5.base_id ";
    sql += "    AND pu5.ally_code = ? ";
    sql += "ORDER BY gt.list_order";

    const team = await runSQL(sql, [ally_code,ally_code,ally_code,ally_code,ally_code]);
    
    return team;
} 

module.exports = gacTeam;