import Units from './Units';
import ModTools from './ModTools';
import JourneyGuide from './JourneyGuide';
import GAC from './GAC';
import Help from './Help';

export default function Player({playerData, refreshPlayerData}) {

    const numFormatter = new Intl.NumberFormat('en-US');
    const helpText = "Refresh your data from SWGOH, data can take 24hrs to sync to SWGOH."

    if(Object.keys(playerData).length === 0)
        return "";
    else if (playerData.error_message)
        return (
            <div className="pt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Player Details</span>
                    </div>
                    <div className="card-body pt-3">
                        {playerData.error_message}
                    </div>
                </div>
            </div>)
    else
        return (
            <div className="pt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Player Details</span>
                        <div className='row'>
                            <div className='col-2'>
                                <Help modal_id="playerHelp" header="Player Refresh" content={helpText} colour="black"></Help>
                            </div>
                            <div className='col-10'>
                                <button className="btn btn-sm btn-primary" onClick={refreshPlayerData}>{playerData.units ? "Refresh Data" : "Get Data"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Ally Code</span> : {playerData.ally_code}</li>
                                <li className="list-group-item"><span className="fw-bold">Name</span> : {playerData.ally_name}</li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="fw-bold">Galactic Power</span> : {numFormatter.format(playerData.character_galactic_power + playerData.ship_galactic_power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Guild Name</span> : {playerData.guild_name}</li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Character Power</span> : {numFormatter.format(playerData.character_galactic_power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Ship Power</span> : {numFormatter.format(playerData.ship_galactic_power)}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='pt-3'>
                    <div className="card">
                        <ul className="nav nav-tabs card-header pb-0" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="units-tab" data-bs-toggle="tab" data-bs-target="#units" type="button" role="tab" aria-controls="units" aria-selected="true">Units</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="ships-tab" data-bs-toggle="tab" data-bs-target="#ships" type="button" role="tab" aria-controls="ships" aria-selected="false">Ships</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="modTools-tab" data-bs-toggle="tab" data-bs-target="#modTools" type="button" role="tab" aria-controls="modTools" aria-selected="false">Mod Tools</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="journeyGuide-tab" data-bs-toggle="tab" data-bs-target="#journeyGuide" type="button" role="tab" aria-controls="journeyGuide" aria-selected="false">Journey Guides</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="gac5-tab" data-bs-toggle="tab" data-bs-target="#gac5" type="button" role="tab" aria-controls="gac5" aria-selected="false">GAC 5v5</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="gac3-tab" data-bs-toggle="tab" data-bs-target="#gac3" type="button" role="tab" aria-controls="gac3" aria-selected="false">GAC 3v3</button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="units" role="tabpanel" aria-labelledby="units-tab">{playerData.units && <Units ally_code={playerData.ally_code} unitType="units" unitData={playerData.units}></Units>}</div>
                            <div className="tab-pane fade" id="ships" role="tabpanel" aria-labelledby="ships-tab">{playerData.ships && <Units ally_code={playerData.ally_code} unitType="ships" unitData={playerData.ships}></Units>}</div>
                            <div className="tab-pane fade" id="modTools" role="tabpanel" aria-labelledby="modTools-tab">{playerData.units && <ModTools ally_code={playerData.ally_code}></ModTools>}</div>
                            <div className="tab-pane fade" id="journeyGuide" role="tabpanel" aria-labelledby="journeyGuide-tab"><JourneyGuide key="jg" ally_code={playerData.ally_code}></JourneyGuide></div>
                            <div className="tab-pane fade" id="gac5" role="tabpanel" aria-labelledby="gac5-tab"><GAC ally_code={playerData.ally_code} team_size="5"></GAC></div>
                            <div className="tab-pane fade" id="gac3" role="tabpanel" aria-labelledby="gac3-tab"><GAC ally_code={playerData.ally_code} team_size="3"></GAC></div>
                        </div>
                    </div>
                </div>
            </div>
        );
}