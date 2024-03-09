
import CharacterImage from './CharacterImage';

export default function RoteUnitOverview({unit}) {
    
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

    let columns = "col-6 col-sm-4 col-md-2 pb-3";
    return (
        <div className={columns}>
            <div className={background}>
                <div className="card-body">
                    <h5 className="card-title">{unit.ally_name}</h5>
                    <div className="card-text">
                        <CharacterImage unit_image={unit.unit_image} unit_name={unit.character_name}></CharacterImage>
                        
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="fw-bold">Power</span> : {numFormatter.format(unit.power)}</li>
                            <li className="list-group-item"><span className="fw-bold">Level</span> : {unit.level}</li>
                            <li className="list-group-item"><span className="fw-bold">Gear Level</span> : {unit.gear_level + gear_plus}</li>
                            
                            {unit.relic_tier > 2 &&
                                <li className="list-group-item"><span className="fw-bold">Relic</span> : {unit.relic_tier - 2}</li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}