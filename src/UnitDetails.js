import ModDetails from "./ModDetails"

export default function UnitDetails({unitDetails, closeDetails}) {
    
    const numFormatter = new Intl.NumberFormat('en-US');
    
    if(Object.keys(unitDetails).length === 0)
        return "";

    let modArray = new Array(7).fill(null)
    for(var m = 0; m < unitDetails.mods.length; m++){
        modArray[unitDetails.mods[m].slot_id] = unitDetails.mods[m];
    }

    let categoryArray = [];
    if(unitDetails.details.categories !== "")
        categoryArray  =unitDetails.details.categories.split(",");
    
    const gear_level_flags = unitDetails.details.gear_level_flags.toString(2).split('');
    for(var f = 0; f < gear_level_flags.length; f++){
        if(gear_level_flags[f] === "1"){
            gear_level_flags[f] = "&#10003";
        } else {
            gear_level_flags[f] = "X";
        }
    }
    while(gear_level_flags.length < 6){
        gear_level_flags.unshift("X");
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
            <div className="row pb-3">
                <div className="col-4">
                    <ModDetails mod={modArray[1]}></ModDetails>
                    <ModDetails mod={modArray[3]}></ModDetails>
                    <ModDetails mod={modArray[5]}></ModDetails>
                </div>
                <div className="col-4 ">
                    <div className="bg-warning text-center">IMAGE<br></br>IMAGE<br></br>IMAGE<br></br>IMAGE<br></br>IMAGE</div>
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-1">
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[5]}}></div>
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[4]}}></div>
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[3]}}></div>
                        </div>
                        <div className="col-8">
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
                        <div className="col-1 me-3">
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[2]}}></div>
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[1]}}></div>
                            <div className="p-3 pe-4 my-3 border" dangerouslySetInnerHTML={{__html: gear_level_flags[0]}}></div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <ModDetails mod={modArray[2]}></ModDetails>
                    <ModDetails mod={modArray[4]}></ModDetails>
                    <ModDetails mod={modArray[6]}></ModDetails>
                </div>
            </div>
        </div>
    )
}