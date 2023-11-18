export default function UnitOverview({unit}) {
    
    const numFormatter = new Intl.NumberFormat('en-US');

    //calculate background if GL or at relic level and are some of the gear slots filled
    let background = "card";
    let gear_plus = "";
    if(unit.gear_level === 13){
        if(unit.is_galactic_legend){
            background += " bg-warning bg-opacity-25";
        } else if (unit.alignment === 1){ //netural
            background += " bg-info bg-opacity-25";
        } else if (unit.alignment === 2){ //light
            background += " bg-primary bg-opacity-25";
        } else if (unit.alignment === 3){ //dark
            background += " bg-danger bg-opacity-75";
        }
    } else {
        if(unit.gear_level_plus !== 0){
            gear_plus = " (+" + unit.gear_level_plus + ")";
        }
    }


    return (
        <div className="col pb-3">
            <div className={background}>
                <div className="card-body">
                    <h5 className="card-title">{unit.character_name}</h5>
                    <div className="card-text">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="fw-bold">Power</span> : {numFormatter.format(unit.power)}</li>
                            <li className="list-group-item"><span className="fw-bold">Level</span> : {unit.level}</li>
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Gear Level</span> : {unit.gear_level + gear_plus}</li>
                            }
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Zetas</span> : {unit.zeta_abilities}</li>
                            }
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Omicrons</span> : {unit.omicron_abilities}</li>
                            }
                            {unit.relic_tier > 2 &&
                                <li className="list-group-item"><span className="fw-bold">Relic</span> : {unit.relic_tier - 2}</li>
                            }
                        </ul>
                        <button className="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}