import TeamUnitOverview from "./TeamUnitOverview";

export default function Team({team_type, team, offense}) {
    let units = [];
    let url_param = "";
    let param_count = 0;
    for(var u = 1; u < 6; u++){
      let unit = {}
      unit.character_name = team["character_name_" + u];
      unit.alignment = team["alignment_" + u];
      unit.gear_level = team["gear_level_" + u];
      unit.gear_level_plus = team["gear_level_plus_" + u];
      unit.level = team["level_" + u];
      unit.power = team["power_" + u];
      unit.zeta_abilities = team["zeta_abilities_" + u];
      unit.omicron_abilities = team["omicron_abilities_" + u];
      unit.relic_tier = team["relic_tier_" + u];
      units.push(unit);
      if(team["base_id_" + u] != null){
        if(param_count === 0){
          url_param = team["base_id_" + u] + "/";
          param_count++;
        } else if(param_count === 1){
          url_param += "?a_unit=" + team["base_id_" + u];
          param_count++;
        } else {
          url_param += "&a_unit=" + team["base_id_" + u];
        }
      }
    }
    
    return (
        <div className="p-3">
            <div className="row d-flex">
              {units.map((unit, index) => {
                  return (
                      <TeamUnitOverview key={team_type + "team_"+team.list_order+"_"+index} team_type={team_type} className='col-2' unit={unit}></TeamUnitOverview>
                  );
                })}
          </div>
          {offense === "true" && team_type === "gac" && <a href={"https://swgoh.gg/gac/who-to-attack/"+url_param} target="_blank" rel="noreferrer">Who to attack?</a>}
        </div>
      );
}