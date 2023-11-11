import Units from './Units'

function Player(props) {

    const numFormatter = new Intl.NumberFormat('en-US');
    if(Object.keys(props.playerData).length === 0)
        return "";
    else
        return (
            <div>
            <div className="pt-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Player Details </span>
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
                <div className="pt-3">
                    <div className="card">
                        <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" data-target="content1">Units</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-target="content2">Ships</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-target="content3">Mod Tools</a>
                            </li>
                        </ul>
                        </div>
                        <div className="card-body">
                            <p id="content1" className="active">Content for Link 1</p>
                            <p id="content2">Content for Link 2</p>
                            <p id="content3">Content for Link 3</p>
                        </div>
                    </div>
                </div>
                {props.playerData.units && <Units unitData={props.playerData.units}></Units>}
            </div>
            </div>
        );
}

export default Player;