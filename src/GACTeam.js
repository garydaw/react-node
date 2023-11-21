import GACUnitOverview from "./GACUnitOverview";

export default function GACTeam({team}) {
    let units = [];
    let active = 0;
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

      if(unit.character_name === null){
        active++;
      } else if (unit.power !== null){
        active++;
      }
    }

    return (
        <div className="p-3">
            <div className="row">
              {units.map((unit, index) => {
                  return (
                      <GACUnitOverview key={"gacteam_"+team.list_order+"_"+index} className='col-2' unit={unit}></GACUnitOverview>
                  );
                })}
          </div>
        </div>
      );
}