const runSQL = require('./database');

let team = {};

team.getTeams = async (ally_code, team_size, team_type) => {

    let sql = "SELECT t.list_order, t.defense, t.offense, t.team_id, CONCAT(u1.character_name, ' Team') AS team_name, ";
    sql += "    u1.base_id AS base_id_1, u1.character_name AS character_name_1, u1.alignment AS alignment_1, ";
    sql += "    u2.base_id AS base_id_2, u2.character_name AS character_name_2, u2.alignment AS alignment_2, ";
    sql += "    u3.base_id AS base_id_3, u3.character_name AS character_name_3, u3.alignment AS alignment_3, ";
    sql += "    u4.base_id AS base_id_4, u4.character_name AS character_name_4, u4.alignment AS alignment_4, ";
    sql += "    u5.base_id AS base_id_5, u5.character_name AS character_name_5, u5.alignment AS alignment_5, ";
    sql += "    pu1.gear_level AS gear_level_1, pu1.gear_level_plus AS gear_level_plus_1, pu1.`level` AS level_1, pu1.`power` AS power_1, pu1.zeta_abilities AS zeta_abilities_1, pu1.omicron_abilities AS omicron_abilities_1, pu1.relic_tier AS relic_tier_1, ";
    sql += "    pu2.gear_level AS gear_level_2, pu2.gear_level_plus AS gear_level_plus_2, pu2.`level` AS level_2, pu2.`power` AS power_2, pu2.zeta_abilities AS zeta_abilities_2, pu2.omicron_abilities AS omicron_abilities_2, pu2.relic_tier AS relic_tier_2, ";
    sql += "    pu3.gear_level AS gear_level_3, pu3.gear_level_plus AS gear_level_plus_3, pu3.`level` AS level_3, pu3.`power` AS power_3, pu3.zeta_abilities AS zeta_abilities_3, pu3.omicron_abilities AS omicron_abilities_3, pu3.relic_tier AS relic_tier_3, ";
    sql += "    pu4.gear_level AS gear_level_4, pu4.gear_level_plus AS gear_level_plus_4, pu4.`level` AS level_4, pu4.`power` AS power_4, pu4.zeta_abilities AS zeta_abilities_4, pu4.omicron_abilities AS omicron_abilities_4, pu4.relic_tier AS relic_tier_4, ";
    sql += "    pu5.gear_level AS gear_level_5, pu5.gear_level_plus AS gear_level_plus_5, pu5.`level` AS level_5, pu5.`power` AS power_5, pu5.zeta_abilities AS zeta_abilities_5, pu5.omicron_abilities AS omicron_abilities_5, pu5.relic_tier AS relic_tier_5, ";
    sql += "    CASE WHEN u1.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u2.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u3.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u4.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u5.base_id IS NOT NULL THEN 1 ELSE 0 END AS team_count, ";
    sql += "    CASE WHEN pu1.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu2.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu3.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu4.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu5.base_id IS NOT NULL THEN 1 ELSE 0 END AS player_team_count, ";
    sql += "    CAST(IFNULL(pu1.`power`, 0) + IFNULL(pu2.`power`, 0) + IFNULL(pu3.`power`, 0) + IFNULL(pu4.`power`, 0) + IFNULL(pu5.`power`, 0) AS varchar(32)) AS team_power "
    sql += "FROM team t ";
    sql += "INNER JOIN unit u1 ";
    sql += "    ON t.base_id_1 = u1.base_id ";
    sql += "LEFT OUTER JOIN unit u2 ";
    sql += "    ON t.base_id_2 = u2.base_id ";
    sql += "LEFT OUTER JOIN unit u3 ";
    sql += "    ON t.base_id_3 = u3.base_id ";
    sql += "LEFT OUTER JOIN unit u4 ";
    sql += "    ON t.base_id_4 = u4.base_id ";
    sql += "LEFT OUTER JOIN unit u5 ";
    sql += "    ON t.base_id_5 = u5.base_id ";
    sql += "LEFT OUTER JOIN player_unit pu1 ";
    sql += "    ON t.base_id_1 = pu1.base_id ";
    sql += "    AND pu1.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu2 ";
    sql += "    ON t.base_id_2 = pu2.base_id ";
    sql += "    AND pu2.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu3 ";
    sql += "    ON t.base_id_3 = pu3.base_id ";
    sql += "    AND pu3.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu4 ";
    sql += "    ON t.base_id_4 = pu4.base_id ";
    sql += "    AND pu4.ally_code = ? ";
    sql += "LEFT OUTER JOIN player_unit pu5 ";
    sql += "    ON t.base_id_5 = pu5.base_id ";
    sql += "    AND pu5.ally_code = ? ";
    sql += "WHERE t.team_size = ? ";
    sql += "AND t.team_type = ? ";
    sql += "ORDER BY team_count - player_team_count,  CAST(team_power AS int) DESC";

    const teams = await runSQL(sql, [ally_code,ally_code,ally_code,ally_code,ally_code,team_size,team_type]);
    
    return teams;
}

team.getWalls = async (team_size, team_type) => {

    let sql = "SELECT tw_wall_id, tw_wall_name, combat_type ";
    sql += "FROM tw_wall ";

    const walls = await runSQL(sql, []);
    
    return walls;

}

team.getUnits = async () => {

    let sql = "SELECT base_id, character_name, unit_image ";
    sql += "FROM unit ";
    sql += "WHERE combat_type = 1 ";
    sql += "ORDER BY character_name";

    const units = await runSQL(sql, []);
    
    return units;

}

team.getGuildTeams = async (team_id) => {

    let sql = "SELECT p.ally_name AS team_name, t.list_order, t.team_id, p.ally_code, ";
    sql += "    u1.base_id AS base_id_1, u1.character_name AS character_name_1, u1.alignment AS alignment_1, t.combat_type, twt.tw_wall_id, ";
    sql += "    u2.base_id AS base_id_2, u2.character_name AS character_name_2, u2.alignment AS alignment_2, ";
    sql += "    u3.base_id AS base_id_3, u3.character_name AS character_name_3, u3.alignment AS alignment_3, ";
    sql += "    u4.base_id AS base_id_4, u4.character_name AS character_name_4, u4.alignment AS alignment_4, ";
    sql += "    u5.base_id AS base_id_5, u5.character_name AS character_name_5, u5.alignment AS alignment_5, ";
    sql += "    pu1.gear_level AS gear_level_1, pu1.gear_level_plus AS gear_level_plus_1, pu1.`level` AS level_1, pu1.`power` AS power_1, pu1.zeta_abilities AS zeta_abilities_1, pu1.omicron_abilities AS omicron_abilities_1, pu1.relic_tier AS relic_tier_1, ";
    sql += "    pu2.gear_level AS gear_level_2, pu2.gear_level_plus AS gear_level_plus_2, pu2.`level` AS level_2, pu2.`power` AS power_2, pu2.zeta_abilities AS zeta_abilities_2, pu2.omicron_abilities AS omicron_abilities_2, pu2.relic_tier AS relic_tier_2, ";
    sql += "    pu3.gear_level AS gear_level_3, pu3.gear_level_plus AS gear_level_plus_3, pu3.`level` AS level_3, pu3.`power` AS power_3, pu3.zeta_abilities AS zeta_abilities_3, pu3.omicron_abilities AS omicron_abilities_3, pu3.relic_tier AS relic_tier_3, ";
    sql += "    pu4.gear_level AS gear_level_4, pu4.gear_level_plus AS gear_level_plus_4, pu4.`level` AS level_4, pu4.`power` AS power_4, pu4.zeta_abilities AS zeta_abilities_4, pu4.omicron_abilities AS omicron_abilities_4, pu4.relic_tier AS relic_tier_4, ";
    sql += "    pu5.gear_level AS gear_level_5, pu5.gear_level_plus AS gear_level_plus_5, pu5.`level` AS level_5, pu5.`power` AS power_5, pu5.zeta_abilities AS zeta_abilities_5, pu5.omicron_abilities AS omicron_abilities_5, pu5.relic_tier AS relic_tier_5, ";
    sql += "    CASE WHEN u1.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u2.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u3.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u4.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN u5.base_id IS NOT NULL THEN 1 ELSE 0 END AS team_count, ";
    sql += "    CASE WHEN pu1.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu2.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu3.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu4.base_id IS NOT NULL THEN 1 ELSE 0 END + ";
    sql += "    CASE WHEN pu5.base_id IS NOT NULL THEN 1 ELSE 0 END AS player_team_count, ";
    sql += "    CAST(IFNULL(pu1.`power`, 0) + IFNULL(pu2.`power`, 0) + IFNULL(pu3.`power`, 0) + IFNULL(pu4.`power`, 0) + IFNULL(pu5.`power`, 0) AS varchar(32)) AS team_power, "
    sql += "    CASE WHEN pu1.relic_tier > 2 AND pu2.relic_tier > 2 AND pu3.relic_tier > 2 AND pu4.relic_tier > 2 AND pu5.relic_tier > 2 THEN 1 ELSE 0 END AS full_relic "
    sql += "FROM player p ";
    sql += "CROSS JOIN team t ";
    sql += "INNER JOIN unit u1 ";
    sql += "    ON t.base_id_1 = u1.base_id ";
    sql += "LEFT OUTER JOIN unit u2 ";
    sql += "    ON t.base_id_2 = u2.base_id ";
    sql += "LEFT OUTER JOIN unit u3 ";
    sql += "    ON t.base_id_3 = u3.base_id ";
    sql += "LEFT OUTER JOIN unit u4 ";
    sql += "    ON t.base_id_4 = u4.base_id ";
    sql += "LEFT OUTER JOIN unit u5 ";
    sql += "    ON t.base_id_5 = u5.base_id ";
    sql += "INNER JOIN player_unit pu1 ";
    sql += "    ON t.base_id_1 = pu1.base_id ";
    sql += "    AND pu1.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu2 ";
    sql += "    ON t.base_id_2 = pu2.base_id ";
    sql += "    AND pu2.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu3 ";
    sql += "    ON t.base_id_3 = pu3.base_id ";
    sql += "    AND pu3.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu4 ";
    sql += "    ON t.base_id_4 = pu4.base_id ";
    sql += "    AND pu4.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu5 ";
    sql += "    ON t.base_id_5 = pu5.base_id ";
    sql += "    AND pu5.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN tw_wall_team twt ";
    sql += "    ON  twt.team_id = t.team_id ";
    sql += "    AND twt.ally_code = p.ally_code ";
    sql += "WHERE t.team_id = ? ";
    sql += "AND (t.base_id_2 IS NOT NULL AND pu2.base_id IS NOT NULL) "
    sql += "AND (t.base_id_3 IS NOT NULL AND pu3.base_id IS NOT NULL) "
    sql += "AND (t.base_id_4 IS NOT NULL AND pu4.base_id IS NOT NULL) "
    sql += "AND (t.base_id_5 IS NOT NULL AND pu5.base_id IS NOT NULL) "
    sql += "ORDER BY CAST(team_power AS int) DESC";

    const units = await runSQL(sql, [team_id]);
    
    return units;

}

team.getWarTeams = async (team_size, team_type) => {
    
    let sql = "SELECT twt.tw_wall_id, twt.team_id, u.character_name, CAST(COUNT(*) AS varchar(4)) AS count "+
                "FROM tw_wall_team twt "+
                "INNER JOIN team t "+
                "    ON t.team_id = twt.team_id "+
                "INNER JOIN unit u "+
                "    ON u.base_id = t.base_id_1 "+
                "GROUP BY twt.tw_wall_id, twt.team_id, u.character_name";

    const teams = await runSQL(sql, []);
    
    return teams;
}

team.getWarTeamsWall = async (team_size, team_type, tw_wall_id) => {
    
    let sql = "SELECT  t.team_id, p.ally_code, p.ally_name, tw.tw_wall_name, ";
    if(tw_wall_id !== ""){
        sql += "p.ally_name AS team_name, ";
    } else {
        sql += "tw.tw_wall_name AS team_name, ";
    }
    sql += "    u1.base_id AS base_id_1, u1.character_name AS character_name_1, u1.alignment AS alignment_1, t.combat_type, twt.tw_wall_id, ";
    sql += "    u2.base_id AS base_id_2, u2.character_name AS character_name_2, u2.alignment AS alignment_2, ";
    sql += "    u3.base_id AS base_id_3, u3.character_name AS character_name_3, u3.alignment AS alignment_3, ";
    sql += "    u4.base_id AS base_id_4, u4.character_name AS character_name_4, u4.alignment AS alignment_4, ";
    sql += "    u5.base_id AS base_id_5, u5.character_name AS character_name_5, u5.alignment AS alignment_5, ";
    sql += "    pu1.gear_level AS gear_level_1, pu1.gear_level_plus AS gear_level_plus_1, pu1.`level` AS level_1, pu1.`power` AS power_1, pu1.zeta_abilities AS zeta_abilities_1, pu1.omicron_abilities AS omicron_abilities_1, pu1.relic_tier AS relic_tier_1, ";
    sql += "    pu2.gear_level AS gear_level_2, pu2.gear_level_plus AS gear_level_plus_2, pu2.`level` AS level_2, pu2.`power` AS power_2, pu2.zeta_abilities AS zeta_abilities_2, pu2.omicron_abilities AS omicron_abilities_2, pu2.relic_tier AS relic_tier_2, ";
    sql += "    pu3.gear_level AS gear_level_3, pu3.gear_level_plus AS gear_level_plus_3, pu3.`level` AS level_3, pu3.`power` AS power_3, pu3.zeta_abilities AS zeta_abilities_3, pu3.omicron_abilities AS omicron_abilities_3, pu3.relic_tier AS relic_tier_3, ";
    sql += "    pu4.gear_level AS gear_level_4, pu4.gear_level_plus AS gear_level_plus_4, pu4.`level` AS level_4, pu4.`power` AS power_4, pu4.zeta_abilities AS zeta_abilities_4, pu4.omicron_abilities AS omicron_abilities_4, pu4.relic_tier AS relic_tier_4, ";
    sql += "    pu5.gear_level AS gear_level_5, pu5.gear_level_plus AS gear_level_plus_5, pu5.`level` AS level_5, pu5.`power` AS power_5, pu5.zeta_abilities AS zeta_abilities_5, pu5.omicron_abilities AS omicron_abilities_5, pu5.relic_tier AS relic_tier_5, ";
    sql += "    CAST(IFNULL(pu1.`power`, 0) + IFNULL(pu2.`power`, 0) + IFNULL(pu3.`power`, 0) + IFNULL(pu4.`power`, 0) + IFNULL(pu5.`power`, 0) AS varchar(32)) AS team_power,";
    sql += "    CASE WHEN pu1.relic_tier > 2 AND pu2.relic_tier > 2 AND pu3.relic_tier > 2 AND pu4.relic_tier > 2 AND pu5.relic_tier > 2 THEN 1 ELSE 0 END AS full_relic ";
    sql += "FROM tw_wall_team twt ";
    sql += "INNER JOIN tw_wall tw ";
    sql += "    ON tw.tw_wall_id = twt.tw_wall_id ";
    sql += "INNER JOIN team t ";
    sql += "    ON twt.team_id = t.team_id ";
    sql += "INNER JOIN player p ";
    sql += "    ON p.ally_code = twt.ally_code ";
    sql += "INNER JOIN unit u1 ";
    sql += "    ON t.base_id_1 = u1.base_id ";
    sql += "LEFT OUTER JOIN unit u2 ";
    sql += "    ON t.base_id_2 = u2.base_id ";
    sql += "LEFT OUTER JOIN unit u3 ";
    sql += "    ON t.base_id_3 = u3.base_id ";
    sql += "LEFT OUTER JOIN unit u4 ";
    sql += "    ON t.base_id_4 = u4.base_id ";
    sql += "LEFT OUTER JOIN unit u5 ";
    sql += "    ON t.base_id_5 = u5.base_id ";
    sql += "INNER JOIN player_unit pu1 ";
    sql += "    ON t.base_id_1 = pu1.base_id ";
    sql += "    AND pu1.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu2 ";
    sql += "    ON t.base_id_2 = pu2.base_id ";
    sql += "    AND pu2.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu3 ";
    sql += "    ON t.base_id_3 = pu3.base_id ";
    sql += "    AND pu3.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu4 ";
    sql += "    ON t.base_id_4 = pu4.base_id ";
    sql += "    AND pu4.ally_code = p.ally_code ";
    sql += "LEFT OUTER JOIN player_unit pu5 ";
    sql += "    ON t.base_id_5 = pu5.base_id ";
    sql += "    AND pu5.ally_code = p.ally_code ";
    if(tw_wall_id !== ""){
        sql += "WHERE twt.tw_wall_id = ? ";
        sql += "ORDER BY u1.character_name, CAST(team_power AS int) DESC";
    } else {
        sql += "ORDER BY p.ally_name, tw.tw_wall_name";
    }

    const teams = await runSQL(sql, [tw_wall_id]);
    
    return teams;
}


team.setTeamWalls = async (data, team_size, team_type) => {
    
    let teamSql = "DELETE from tw_wall_team WHERE ally_code = ? and team_id = ?";
    await runSQL(teamSql, [data.ally_code, data.team_id]);
    
    teamSql = "INSERT INTO tw_wall_team (ally_code, team_id, tw_wall_id)" +
                "VALUES (?, ?, ?)";
    
    await runSQL(teamSql, [data.ally_code, data.team_id, data.tw_wall_id]);
    
}

team.addTeam = async (data, team_type) => {
    
    for(var t = 1; t < 5; t++){
        if (data.team[t] === null || data.team[t] === undefined || typeof data.team[t].base_id === undefined) {
            data.team[t] = {base_id:null};
        }
    }
    
    const teamSql = "INSERT INTO team (base_id_1, base_id_2, base_id_3, base_id_4, base_id_5, list_order, defense, offense, team_size, team_type)" +
                "SELECT ?, ?, ?, ?, ?, IFNULL(MAX(list_order), 0) + 1, ?, ?, ?, ? FROM team";
    
    await runSQL(teamSql, [data.team[0].base_id, data.team[1].base_id, data.team[2].base_id, data.team[3].base_id, data.team[4].base_id, 
            data.defense, data.offense, data.team_size, team_type]);
}

team.deleteTeam = async (team_id, offense) => {
    
    let teamSql = "";

    if(offense === "true"){
        teamSql = "UPDATE team SET offense = 0 WHERE team_id = ?";
    } else {
        teamSql = "UPDATE team SET defense = 0 WHERE team_id = ?";
    }
    
    await runSQL(teamSql, [team_id]);

    teamSql = "DELETE FROM team WHERE offense = 0 AND defense = 0 AND team_id = ?";

    await runSQL(teamSql, [team_id]);
}

module.exports = team;