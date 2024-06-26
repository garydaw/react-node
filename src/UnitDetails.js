import ModDetails from "./ModDetails"
import CharacterImage from './CharacterImage';

export default function UnitDetails({unitDetails, closeDetails}) {

    const numFormatter = new Intl.NumberFormat('en-US');
    
    if(Object.keys(unitDetails).length === 0)
        return "";

    let modArray = new Array(7).fill(null)
    for(var m = 0; m < unitDetails.mods.length; m++){
        unitDetails.mods[m].best_sets = unitDetails.best_sets;
        modArray[unitDetails.mods[m].slot_id] = unitDetails.mods[m];
    }

    let categoryArray = [];
    if(unitDetails.details.categories !== "")
        categoryArray  =unitDetails.details.categories.split(",");
    
    const gear_level_flags = unitDetails.details.gear_level_flags.toString(2).split('');
    for(var f = 0; f < gear_level_flags.length; f++){
        if(gear_level_flags[f] === "1"){
            gear_level_flags[f] = "bi bi-gear-fill";
        } else {
            gear_level_flags[f] = "bi bi-gear";
        }
    }
    while(gear_level_flags.length < 6){
        gear_level_flags.unshift("bi bi-gear");
    }

    let hide_gear = false;
    if(unitDetails.details.gear_level === 13){
        hide_gear = true;
    }
    
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center pb-3">
                <span>
                    <h5>{unitDetails.details.character_name}</h5> 
                    <span className="bg-secondary bg-opacity-25 text-success me-1 p-1">{unitDetails.details.role}</span>
                    {categoryArray.map((category, index) => {
                        return (
                            <span key={"unitDetails_category_"+index} className="bg-secondary bg-opacity-25 me-1 p-1">{category}</span>
                        );
                    })}
                </span>
                <button type="button" className="btn-close" onClick={closeDetails}></button>
            </div>
            <div className="row pb-3 d-none d-lg-flex">
                <div className="col-4">
                    <ModDetails mod={modArray[2]}></ModDetails>
                    <ModDetails mod={modArray[4]}></ModDetails>
                    <ModDetails mod={modArray[6]}></ModDetails>
                </div>
                <div className="col-4">
                    <div className="row d-flex justify-content-between align-items-center">
                        {hide_gear === false ? (
                            <div className="col-2">
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[5]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[4]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[3]}></i></div>
                            </div>
                        ) : (<div className="col-2"></div>)}
                        <div className="col-8 justify-content-center d-inline-flex">
                            <CharacterImage unit_image={unitDetails.details.unit_image} unit_name={unitDetails.details.character_name}></CharacterImage>
                        </div>
                        {hide_gear === false ? (
                            <div className="col-2">
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[2]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[1]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[0]}></i></div>
                            </div>
                        ) : (<div className="col-2"></div>)}
                    </div>
                    <div className="row">
                        
                        <div className="col-12">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Power</span> : {numFormatter.format(unitDetails.details.power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Level</span> : {unitDetails.details.level}</li>
                                {unitDetails.details.combat_type === 1 && 
                                    <li className="list-group-item"><span className="fw-bold">Gear Level</span> : {unitDetails.details.gear_level}</li>
                                }
                                {unitDetails.details.combat_type === 1 &&
                                    <li className="list-group-item"><span className="fw-bold">Zetas</span> : {unitDetails.details.zeta_abilities}</li>
                                }
                                {unitDetails.details.combat_type === 1 &&
                                    <li className="list-group-item"><span className="fw-bold">Omicrons</span> : {unitDetails.details.omicron_abilities}</li>
                                }
                                {unitDetails.details.relic_tier > 2 &&
                                    <li className="list-group-item"><span className="fw-bold">Relic</span> : {unitDetails.details.relic_tier - 2}</li>
                                }
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="col-4">
                    <ModDetails mod={modArray[3]}></ModDetails>
                    <ModDetails mod={modArray[5]}></ModDetails>
                    <ModDetails mod={modArray[7]}></ModDetails>
                </div>
            </div>
            
            <div className="row pb-3 d-lg-none">
                <div className="col-12">
                    <div className="row d-flex justify-content-between align-items-center">
                        {hide_gear === false ? (
                            <div className="col-2">
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[5]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[4]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[3]}></i></div>
                            </div>
                        ) : (<div className="col-2"></div>)}
                        <div className="col-8 justify-content-center d-inline-flex">
                            <CharacterImage unit_image={unitDetails.details.unit_image} unit_name={unitDetails.details.character_name}></CharacterImage>
                        </div>
                        {hide_gear === false ? (
                            <div className="col-2">
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[2]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[1]}></i></div>
                                <div className="p-3 my-3 border text-center"><i className={gear_level_flags[0]}></i></div>
                            </div>
                        ) : (<div className="col-2"></div>)}
                    </div>
                    <div className="row">
                        
                        <div className="col-12">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Power</span> : {numFormatter.format(unitDetails.details.power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Level</span> : {unitDetails.details.level}</li>
                                {unitDetails.details.combat_type === 1 && 
                                    <li className="list-group-item"><span className="fw-bold">Gear Level</span> : {unitDetails.details.gear_level}</li>
                                }
                                {unitDetails.details.combat_type === 1 &&
                                    <li className="list-group-item"><span className="fw-bold">Zetas</span> : {unitDetails.details.zeta_abilities}</li>
                                }
                                {unitDetails.details.combat_type === 1 &&
                                    <li className="list-group-item"><span className="fw-bold">Omicrons</span> : {unitDetails.details.omicron_abilities}</li>
                                }
                                {unitDetails.details.relic_tier > 2 &&
                                    <li className="list-group-item"><span className="fw-bold">Relic</span> : {unitDetails.details.relic_tier - 2}</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pb-3 d-lg-none">
                <div className="col-12 col-md-6">
                    <ModDetails mod={modArray[2]}></ModDetails>
                    <ModDetails mod={modArray[4]}></ModDetails>
                    <ModDetails mod={modArray[6]}></ModDetails>
                </div>
                <div className="col-12 col-md-6">
                    <ModDetails mod={modArray[3]}></ModDetails>
                    <ModDetails mod={modArray[5]}></ModDetails>
                    <ModDetails mod={modArray[7]}></ModDetails>
                </div>
            </div>
        </div>
    )
}