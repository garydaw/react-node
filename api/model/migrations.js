const runSQL = require('./database');

let migrations = {};

migrations.run = async (version) => {

    switch(version){
        case "1":
            await versionOne();
            break;
        default:
            console.log("doh!");
    }

} 

async function versionOne (){

    console.log("starting version One");
    console.log("creating player");
    await runSQL("CREATE TABLE IF NOT EXISTS player ("+
        "ally_code int NOT NULL, "+
        "ally_name VARCHAR(64), "+
        "character_galactic_power int, "+
        "ship_galactic_power int, "+
        "guild_id varchar(32), "+
        "guild_name varchar(256), "+
        "primary key(ally_code));");
  
    console.log("creating unit");
    await runSQL("CREATE TABLE IF NOT EXISTS unit ("+
        "base_id VARCHAR(64) NOT NULL, "+
        "combat_type int, "+
        "character_name VARCHAR(128), "+
        "url VARCHAR(256), "+
        "primary key(base_id));");
  
    console.log("creating slot");
    await runSQL("CREATE TABLE IF NOT EXISTS slot ("+
        "slot_id int NOT NULL, "+
        "slot_name varchar(16) NOT NULL, "+
        "slot_long_name varchar(64) NOT NULL, "+
        "primary key(slot_id));");

    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 1, 'Square', 'Transmitter' WHERE 1 NOT IN (SELECT slot_id FROM slot)");
    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 2, 'Arrow', 'Receiver' WHERE 2 NOT IN (SELECT slot_id FROM slot)");
    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 3, 'Diamond', 'Processor' WHERE 3 NOT IN (SELECT slot_id FROM slot)");
    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 4, 'Triangle', 'Holo-Array' WHERE 4 NOT IN (SELECT slot_id FROM slot)");
    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 5, 'Circle', 'Data-Bus' WHERE 5 NOT IN (SELECT slot_id FROM slot)");
    await runSQL("INSERT INTO slot (slot_id, slot_name, slot_long_name) SELECT 6, 'Cross', 'Multiplexer' WHERE 6 NOT IN (SELECT slot_id FROM slot)");
  
    console.log("creating player_unit");
    await runSQL("CREATE TABLE IF NOT EXISTS player_unit ("+
        "ally_code int NOT NULL, "+
        "base_id VARCHAR(64) NOT NULL, "+
        "gear_level int, "+
        "level int, "+
        "power int, "+
        "rarity int, "+
        "primary key(ally_code, base_id), "+
        "CONSTRAINT fk_player_unit__player "+
        "FOREIGN KEY (ally_code) REFERENCES player (ally_code) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT, "+
        "CONSTRAINT fk_player_unit__unit "+
        "FOREIGN KEY (base_id) REFERENCES unit (base_id) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT);");
  
    console.log("creating player_mod");
    await runSQL("CREATE TABLE IF NOT EXISTS player_mod ("+
        "id varchar(32) NOT NULL, "+
        "ally_code int NOT NULL, "+
        "base_id VARCHAR(64) NOT NULL, "+
        "level int NOT NULL, "+
        "tier int NOT NULL, "+
        "rarity int NOT NULL, "+
        "slot_id int NOT NULL, "+
        "group_set int NOT NULL, "+
        "primary_stat varchar(64) NOT NULL, "+
        "primary_stat_value varchar(16) NOT NULL, "+
        "secondary_stat_1 varchar(64) NOT NULL, "+
        "secondary_stat_1_value varchar(16) NOT NULL, "+
        "secondary_stat_2 varchar(64) NOT NULL, "+
        "secondary_stat_2_value varchar(16) NOT NULL, "+
        "secondary_stat_3 varchar(64) NOT NULL, "+
        "secondary_stat_3_value varchar(16) NOT NULL, "+
        "secondary_stat_4 varchar(64) NOT NULL, "+
        "secondary_stat_4_value varchar(16) NOT NULL, "+
        "primary key(id), "+
        "CONSTRAINT fk_player_mod__player_unit "+
        "FOREIGN KEY (ally_code, base_id) REFERENCES player_unit (ally_code, base_id) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT, "+
        "CONSTRAINT fk_player_mod__slot "+
        "FOREIGN KEY (slot_id) REFERENCES slot (slot_id) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT);");
  
    console.log("creating unit_mod");
    await runSQL("CREATE TABLE IF NOT EXISTS unit_mod ("+
        "date date NOT NULL DEFAULT CURDATE(), "+
        "base_id varchar(64) NOT NULL, "+
        "slot_id int NOT NULL, "+
        "group_set varchar(64) NOT NULL, "+
        "primary_stat varchar(64) NOT NULL, "+
        "primary key(date, base_id, slot_id), "+
        "CONSTRAINT fk_unit_mod__unit "+
        "FOREIGN KEY (base_id) REFERENCES unit (base_id) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT, "+
        "CONSTRAINT fk_unit_mod__slot "+
        "FOREIGN KEY (slot_id) REFERENCES slot (slot_id) "+
        "ON DELETE CASCADE "+
        "ON UPDATE RESTRICT);");
}

module.exports = migrations;