const runSQL = require('./database');

let swgoh = {};

swgoh.setUnits = async (units) => {

    //loop round units
    for(var u = 0; u < units.length; u++){

        //insert or update
        let sql = "INSERT INTO unit (base_id, combat_type, character_name, url) ";
        sql += "VALUES (?, ?, ?, ?) ";
        sql += "ON DUPLICATE KEY UPDATE ";
        sql += "combat_type = ?, ";
        sql += "character_name = ?, ";
        sql += "url = ? ";

        await runSQL(sql, [units[u].base_id,
                            units[u].combat_type, units[u].name, units[u].url, 
                            units[u].combat_type, units[u].name, units[u].url]);

    }

    //get unit count
    let rows = await runSQL("SELECT COUNT(*) as num_of_units FROM unit");
    
    return rows;

}

swgoh.getUnits = async () => {

    //get unit count
    let rows = await runSQL(" SELECT base_id, combat_type, character_name, url FROM unit");
    
    return rows;
}


swgoh.setPlayer = async (player) => {

    const ally_code = player.data.ally_code;

     //insert or update
     let sql = "INSERT INTO player (ally_code, ally_name, character_galactic_power, ship_galactic_power, guild_id, guild_name) ";
     sql += "VALUES (?, ?, ?, ?, ?, ?) ";
     sql += "ON DUPLICATE KEY UPDATE ";
     sql += "ally_name = ?, ";
     sql += "character_galactic_power = ?, ";
     sql += "ship_galactic_power = ?, ";
     sql += "guild_id = ?, ";
     sql += "guild_name = ? ";

     await runSQL(sql, [ally_code,
        player.data.name, player.data.character_galactic_power, player.data.ship_galactic_power, player.data.guild_id, player.data.guild_name,
        player.data.name, player.data.character_galactic_power, player.data.ship_galactic_power, player.data.guild_id, player.data.guild_name]);

  
    //loop round units
    for(var u = 0; u < player.units.length; u++){

        //insert or update
        let sql = "INSERT INTO player_unit (ally_code, base_id, gear_level, level, power, rarity) ";
        sql += "VALUES (?, ?, ?, ?, ?, ?) ";
        sql += "ON DUPLICATE KEY UPDATE ";
        sql += "gear_level = ?, ";
        sql += "level = ?, ";
        sql += "power = ?, ";
        sql += "rarity = ? ";

        await runSQL(sql, [ally_code, player.units[u].data.base_id,
            player.units[u].data.gear_level, player.units[u].data.level, player.units[u].data.power, player.units[u].data.rarity,
            player.units[u].data.gear_level, player.units[u].data.level, player.units[u].data.power, player.units[u].data.rarity]);

    }

    const deleteAll = true;

    if(deleteAll){
        await runSQL("DELETE FROM player_mod WHERE ally_code  = ?", [ally_code]);
    }

    //loop round mods
    for(var m = 0; m < player.mods.length; m++){

        //insert or update
        let sql = "INSERT INTO player_mod (id, ";
        sql += "ally_code, base_id, level, tier, rarity, slot_id, group_set, ";
        sql += "primary_stat, primary_stat_value, secondary_stat_1, secondary_stat_1_value, secondary_stat_2, secondary_stat_2_value, ";
        sql += "secondary_stat_3, secondary_stat_3_value, secondary_stat_4, secondary_stat_4_value) ";
        sql += "VALUES (?, ";
        sql += "?, ?, ?, ?, ?, ?, ?, ";
        sql += "?, ?, ?, ?, ?, ?, ";
        sql += "?, ?, ?, ?) ";
        if(!deleteAll){
            sql += "ON DUPLICATE KEY UPDATE ";
            sql += "ally_code  = ?, ";
            sql += "base_id  = ?, ";
            sql += "level  = ?, ";
            sql += "tier  = ?, ";
            sql += "rarity  = ?, ";
            sql += "slot_id  = ?, ";
            sql += "group_set  = ?, ";
            sql += "primary_stat  = ?, ";
            sql += "primary_stat_value  = ?, ";
            sql += "secondary_stat_1  = ?, ";
            sql += "secondary_stat_1_value  = ?, ";
            sql += "secondary_stat_2  = ?, ";
            sql += "secondary_stat_2_value  = ?, ";
            sql += "secondary_stat_3  = ?, ";
            sql += "secondary_stat_3_value  = ?, ";
            sql += "secondary_stat_4  = ?, ";
            sql += "secondary_stat_4_value  = ? ";
        }

        if(deleteAll){
            await runSQL(sql, [ player.mods[m].id,
                ally_code, player.mods[m].character, player.mods[m].level, player.mods[m].tier, player.mods[m].rarity, player.mods[m].slot, player.mods[m].set,
                player.mods[m].primary_stat.name, player.mods[m].primary_stat.display_value, player.mods[m].secondary_stats[0].name, player.mods[m].secondary_stats[0].display_value, player.mods[m].secondary_stats[1].name, player.mods[m].secondary_stats[1].display_value,
                player.mods[m].secondary_stats[2].name, player.mods[m].secondary_stats[2].display_value, player.mods[m].secondary_stats[3].name, player.mods[m].secondary_stats[3].display_value]);
        } else {
            await runSQL(sql, [ player.mods[m].id,
                ally_code, player.mods[m].character, player.mods[m].level, player.mods[m].tier, player.mods[m].rarity, player.mods[m].slot, player.mods[m].set,
                player.mods[m].primary_stat.name, player.mods[m].primary_stat.display_value, player.mods[m].secondary_stats[0].name, player.mods[m].secondary_stats[0].display_value, player.mods[m].secondary_stats[1].name, player.mods[m].secondary_stats[1].display_value,
                player.mods[m].secondary_stats[2].name, player.mods[m].secondary_stats[2].display_value, player.mods[m].secondary_stats[3].name, player.mods[m].secondary_stats[3].display_value,
                ally_code, player.mods[m].character, player.mods[m].level, player.mods[m].tier, player.mods[m].rarity, player.mods[m].slot, player.mods[m].set,
                player.mods[m].primary_stat.name, player.mods[m].primary_stat.display_value, player.mods[m].secondary_stats[0].name, player.mods[m].secondary_stats[0].display_value, player.mods[m].secondary_stats[1].name, player.mods[m].secondary_stats[1].display_value,
                player.mods[m].secondary_stats[2].name, player.mods[m].secondary_stats[2].display_value, player.mods[m].secondary_stats[3].name, player.mods[m].secondary_stats[3].display_value]);
        }
    }

}

swgoh.deleteBestMods = async () => {

    await runSQL("DELETE FROM unit_mod WHERE date = CURDATE()", []);
}

swgoh.setMods = async (base_id, character_name, html) => {
    
    var mod_start = 0;

    //triangle
    var mod_text = "Best Triangle (Holo-Array) Mod Primary Stat: <strong>";
    mod_start = html.indexOf(mod_text, mod_start) + mod_text.length;

    //no mods found
    if(mod_start === mod_text.length - 1){
        console.log("not Found");
        return;
    }

    var mod_end = html.indexOf("</strong>", mod_start);
    var triangle = html.substr(mod_start, mod_end - mod_start);

    //Cross
    mod_text = "Best Cross (Multiplexer) Mod Primary Stat: <strong>";
    mod_start = html.indexOf(mod_text, mod_start) + mod_text.length;
    mod_end = html.indexOf("</strong>", mod_start);
    var cross = html.substr(mod_start, mod_end - mod_start);

    //circle
    mod_text = "Best Circle (Data-Bus) Mod Primary Stat: <strong>";
    mod_start = html.indexOf(mod_text, mod_start) + mod_text.length;
    mod_end = html.indexOf("</strong>", mod_start);
    var circle = html.substr(mod_start, mod_end - mod_start);

    //arrow
    mod_text = "Best Arrow (Receiver) Mod Primary Stat: <strong>";
    mod_start = html.indexOf(mod_text, mod_start) + mod_text.length;
    mod_end = html.indexOf("</strong>", mod_start);
    var arrow = html.substr(mod_start, mod_end - mod_start);

    //sets
    mod_text = "The most popular Mod Set for " + htmlEncode(character_name) + " is";
    mod_start = html.indexOf(mod_text, mod_start) + mod_text.length;
    mod_end = html.indexOf("</p>", mod_start);
    var full_set = html.substr(mod_start, mod_end - mod_start);

    var set_start = 0;
    var set = [];

    var set_text = '<span style="font-weight: bold;">';
    set_start = full_set.indexOf(set_text, set_start) + set_text.length;
    var set_end = full_set.indexOf("</span>", set_start);
    set.push(full_set.substr(set_start, set_end - set_start));

    //double set
    if(full_set.substr(set_end + 9,1) === "4"){
        set.push(full_set.substr(set_start, set_end - set_start));
    }
    
    set_start = full_set.indexOf(set_text, set_start) + set_text.length;
    var set_end = full_set.indexOf("</span>", set_start);
    set.push(full_set.substr(set_start, set_end - set_start));

    //double set
    if(full_set.substr(set_end + 9,1) === "4"){
        set.push(full_set.substr(set_start, set_end - set_start));
    }

    if(set.length === 2){
        set_start = full_set.indexOf(set_text, set_start) + set_text.length;
        var set_end = full_set.indexOf("</span>", set_start);
        set.push(full_set.substr(set_start, set_end - set_start));
    }

    let sql = "INSERT INTO unit_mod (base_id, slot_id, group_set, primary_stat) VALUES (?, ?, ?, ?)";

    //square
    await runSQL(sql, [base_id, 1, set[0], "Offense"]);

    //arrow
    await runSQL(sql, [base_id, 2, set[0], arrow]);

    //diamond
    await runSQL(sql, [base_id, 3, set[1], "Defense"]);

    //triangle
    await runSQL(sql, [base_id, 4, set[1], triangle]);

    //circle
    await runSQL(sql, [base_id, 5, set[2], circle]);

    //cross
    await runSQL(sql, [base_id, 6, set[2], cross]);

}

function htmlEncode(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

module.exports = swgoh;