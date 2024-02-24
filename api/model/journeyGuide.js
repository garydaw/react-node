const runSQL = require('./database');

let journeyGuide = {};

journeyGuide.getJourneyGuide = async () => {

    let sql = "SELECT jg.base_id, jg.guide, u.character_name ";
    sql += "FROM journey_guide jg ";
    sql += "INNER JOIN unit u";
    sql += " ON jg.base_id = u.base_id ";
    sql += "ORDER BY u.character_name";

    const guides = await runSQL(sql, []);
    
    return guides;
}

journeyGuide.getNonGuideUnits = async () => {

    let sql = "SELECT u.base_id, u.character_name ";
    sql += "FROM unit u ";
    sql += "LEFT OUTER JOIN journey_guide jg ";
    sql += " ON jg.base_id = u.base_id ";
    sql += " WHERE jg.base_id IS NULL "
    sql += "ORDER BY u.character_name";

    const guides = await runSQL(sql, []);
    
    return guides;
}

journeyGuide.setJourneyGuide = async (data) => {

    let sql = "DELETE FROM journey_guide WHERE base_id = ?";

    await runSQL(sql, [data.base_id]);
    
    sql = "INSERT INTO journey_guide (base_id, list_order, guide) VALUES (?, 1, ?)";

    await runSQL(sql, [data.base_id, data.guide]);

    return;
} 

module.exports = journeyGuide;