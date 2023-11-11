import Units from './Units'

function Player(props) {

    if(Object.keys(props.playerData).length === 0)
        return "";
    else
        return (
            <div>
                <div>
                    <div>Ally Code : {props.playerData.ally_code}</div>
                    <div>Name: {props.playerData.ally_name}</div>
                    <button className="form-control btn btn-primary" onClick={props.refreshPlayerData}>{props.playerData.length > 0 ? "Refresh Data" : "Get Data"}</button>
                </div>
                {props.playerData.units && <Units unitData={props.playerData.units}></Units>}
            </div>
        );
}

export default Player;