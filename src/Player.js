function Player(props) {

    if(props.allyCode === "")
        return "";
    else
        return (
            <div>
                <div>{props.allyCode}</div>
                <button onClick={props.refreshPlayerData}>{props.playerData.length > 0 ? "Refresh Data" : "Get Data"}</button>
            </div>
        )
}

export default Player;