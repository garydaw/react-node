import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Player from './Player'

//import PlayerForm from './Playerform.js'

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

function App() {

    //variables
  const [allyCode,setAllyCode] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("");

  let getPlayerInfo = async () => {
    try {
        setLoadingMessage("Getting Player Data from database.");
        let thisAllyCode = document.getElementById("allyCode").value;
        setAllyCode(thisAllyCode);
  
        //get data
        const data = await (await fetch(apiUrl + "player/" + thisAllyCode +'/')).json();
        if(data.length === 0){
          setLoadingMessage("No data found, going to SWGOH.");
          refreshPlayerData();
        } else {
          setLoadingMessage("");
          setPlayerData(data);
        }
        
    } catch (err) {
        console.log(err.message)
    }
  }

  let refreshPlayerData = async () => {
    try {
        //get data
        const data = await (await fetch(apiUrl + "swgoh/player/" + allyCode +'/')).json();
        if(data.length === 0){
          setLoadingMessage("No data found please check your Ally Code.");
        } else {
          setLoadingMessage("");
          setPlayerData(data);
        }
        
    } catch (err) {
        console.log(err.message)
    }
  }

  let getUnits = async () => {
    try {
        //get data
        setLoadingMessage("Getting Units.");
        const data = await (await fetch(apiUrl + "swgoh/units/")).json();
        setLoadingMessage("");
        
        
    } catch (err) {
        console.log(err.message)
    }
  }

  function Loading(props) {
    if(props.loadingMessage === "")
      return "";
    else
      return (<div>{props.loadingMessage}</div>);
  }
  

  return (
    <div className="container">
      <h1>SWGOH Player Utils</h1>832233694
      <div className="input-group mb-3">
          <span className="input-group-text">Ally Code</span>
          <input type="text"  
            className="form-control"
            placeholder="Ally Code"
            aria-label="Ally Code"
            aria-describedby="Ally Code"
            id="allyCode"
            ></input>
        
        <button className="form-control btn btn-primary" onClick={getPlayerInfo}>Search</button>
        <button className="form-control btn btn-primary" onClick={getUnits}>Get Units</button>
      </div>
        <Loading loadingMessage={loadingMessage}></Loading>
        <Player allyCode={allyCode} playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
    </div>
  );
}


export default App;
