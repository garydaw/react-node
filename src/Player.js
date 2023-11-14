import Units from './Units'
import ModTools from './ModTools'

function Player(props) {

    const numFormatter = new Intl.NumberFormat('en-US');
    if(Object.keys(props.playerData).length === 0)
        return "";
    else if (props.playerData.error_message)
        return (
            <div className="pt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Player Details</span>
                    </div>
                    <div className="card-body pt-3">
                        {props.playerData.error_message}
                    </div>
                </div>
            </div>)
    else
        return (
            <div className="pt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Player Details</span>
                        <button className="btn btn-sm btn-primary" onClick={props.refreshPlayerData}>{props.playerData.units ? "Refresh Data" : "Get Data"}</button>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Ally Code</span> : {props.playerData.ally_code}</li>
                                <li className="list-group-item"><span className="fw-bold">Name</span> : {props.playerData.ally_name}</li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item"><span className="fw-bold">Galactic Power</span> : {numFormatter.format(props.playerData.character_galactic_power + props.playerData.ship_galactic_power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Guild Name</span> : {props.playerData.guild_name}</li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><span className="fw-bold">Character Power</span> : {numFormatter.format(props.playerData.character_galactic_power)}</li>
                                <li className="list-group-item"><span className="fw-bold">Ship Power</span> : {numFormatter.format(props.playerData.ship_galactic_power)}</li>
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
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="units" role="tabpanel" aria-labelledby="units-tab">{props.playerData.units && <Units unitData={props.playerData.units}></Units>}</div>
                            <div className="tab-pane fade" id="ships" role="tabpanel" aria-labelledby="ships-tab">{props.playerData.ships && <Units unitData={props.playerData.ships}></Units>}</div>
                            <div className="tab-pane fade" id="modTools" role="tabpanel" aria-labelledby="modTools-tab">{props.playerData.units && <ModTools ally_code={props.playerData.ally_code}></ModTools>}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Player;