const runSQL = require('./database');

let journeyGuide = {};

journeyGuide.getJourneyGuide = async () => {

    let sql = "SELECT jg.base_id, jg.guide, jg.list_order, ";
    sql += "u.character_name "
    sql += "FROM journey_guide jg ";
    sql += "INNER JOIN unit u";
    sql += " ON jg.base_id = u.base_id ";
    sql += "ORDER BY jg.list_order";

    const guides = await runSQL(sql, []);
    
    return guides;
} 

module.exports = journeyGuide;