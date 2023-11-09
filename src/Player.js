function Player(props) {

    if(props.allyCode === "")
        return "";
    else
        return (
            <div>
                <div>Ally Code : {props.allyCode}</div>
                <div>Name: {props.playerData[0].name}</div>
                <button className="form-control btn btn-primary" onClick={props.refreshPlayerData}>{props.playerData.length > 0 ? "Refresh Data" : "Get Data"}</button>
            </div>
        )
}

export default Player;