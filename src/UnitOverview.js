export default function UnitOverview({unit}) {
    
    /*
    {unit.combat_type === 1 &&
                                <li>Zeta: {unit.zeta_abilities.length}</li>
                            }
                            {unit.combat_type === 1 &&
                                <li>Omicron: {unit.omicron_abilities.length}</li>
                            }*/
    return (
        <div className="col pb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{unit.character_name}</h5>
                    <div className="card-text">
                        <ol>
                            <li>Power: {unit.power}</li>
                            <li>Level: {unit.level}</li>
                            {unit.combat_type === 1 &&
                                <li>Gear Level: {unit.gear_level}</li>
                            }
                            
                        </ol>
                    </div>
                    <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    )
}