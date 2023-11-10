const runSQL = require('./database');

let swgoh = {};

swgoh.setUnits = async (units) => {

    //loop round units
    for(var u = 0; u < units.length; u++){

        console.log(units[u].base_id);
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

}

module.exports = swgoh;