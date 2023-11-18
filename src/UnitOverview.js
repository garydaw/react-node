export default function UnitOverview({unit}) {
    
    /*
    {unit.combat_type === 1 &&
                                <li>Zeta: {unit.zeta_abilities.length}</li>
                            }
                            {unit.combat_type === 1 &&
                                <li>Omicron: {unit.omicron_abilities.length}</li>
                            }*/
    let background = "card";
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
    }
    return (
        <div className="col pb-3">
            <div className={background}>
                <div className="card-body">
                    <h5 className="card-title">{unit.character_name}</h5>
                    <div className="card-text">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="fw-bold">Power</span> : {unit.power}</li>
                            <li className="list-group-item"><span className="fw-bold">Level</span> : {unit.level}</li>
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Gear Level</span> : {unit.gear_level} (+{unit.gear_level_plus})</li>
                            }
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Zetas</span> : {unit.zeta_abilities}</li>
                            }
                            {unit.combat_type === 1 &&
                                <li className="list-group-item"><span className="fw-bold">Omicrons</span> : {unit.omicron_abilities}</li>
                            }
                        </ul>
                    </div>
                    <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    )
}