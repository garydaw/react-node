import TeamUnitOverview from "./TeamUnitOverview";

export default function Team({team_type, team, offense,  deleteTeam, showGuildTeams}) {
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

    let style = "btn btn-danger";
    if((offense === "true" && team_type === "gac") || team_type === "tw"){
      style += " ms-3"
    }

    //does user have access to admin
    const access = localStorage.getItem("access");

    const numFormatter = new Intl.NumberFormat('en-US');
    
    return (
        <div className="p-3">
            <h4>{team.team_name} ({numFormatter.format(team.team_power)})</h4>
            <div className="row d-flex">
              {units.map((unit, index) => {
                  return (
                      <TeamUnitOverview key={team_type + "team_"+team.list_order+"_"+index} team_type={team_type} className='col-2' unit={unit}></TeamUnitOverview>
                  );
                })}
          </div>
          {team_type === "tw" && <button type="button" className="btn btn-primary" onClick={() => showGuildTeams(team.team_id)}>Guild Teams</button>}
          {offense === "true" && team_type === "gac" && <a href={"https://swgoh.gg/gac/who-to-attack/"+url_param} target="_blank" rel="noreferrer">Who to attack?</a>}
          {access === "1" && team_type !== "guild" &&
            <button type="button" className={style} onClick={() => deleteTeam(team.team_id, offense)}>Delete</button>
          }
        </div>
      );
}