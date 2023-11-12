import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Player from './Player'
import Crawler from './Crawler';

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

function App() {

    //variables
  const [playerData, setPlayerData] = useState({});
  const [loadingMessage, setLoadingMessage] = useState("");

  let getPlayerInfo = async () => {
    try {

        //set loading
        setLoadingMessage("Getting Player Data from database.");
        let ally_code = document.getElementById("allyCode").value;
  
        //get data
        const data = await (await fetch(apiUrl + "player/" + ally_code +'/')).json();
        setLoadingMessage("");
        setPlayerData(data);
        
    } catch (err) {
        console.log(err.message)
    }
  }

  let refreshPlayerData = async () => {
    try {
      setLoadingMessage("Getting data from SWGOH.");
        //get data
        const data = await (await fetch(apiUrl + "swgoh/player/" + playerData.ally_code +'/')).json();
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
        await (await fetch(apiUrl + "swgoh/units/")).json();
        setLoadingMessage("");
        
    } catch (err) {
        console.log(err.message)
    }
  }

  let getBestMods = async () => {
    try {
        //get data
        setLoadingMessage("Getting Best Mods.");
        await (await fetch(apiUrl + "swgoh/bestmods/")).json();
        setLoadingMessage("");
        
    } catch (err) {
        console.log(err.message)
    }
  }

  function Loading(props) {
    if(props.loadingMessage === "")
      return "";
    else
      return (<div className="loading-div">{props.loadingMessage}</div>);
  }

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearIntro();
    }, 50000); 

    return () => clearTimeout(timer);
  }, []);
  
  function clearIntro() {
    setShowIntro(false);
  }
  return (
    <div className="bg">
      {showIntro ? (
        <Crawler clearIntro={clearIntro}></Crawler>
      ) : (
       
      <div className="container p-3">
        <div className="row">
          <div className="col-6 offset-2">
            <div className="input-group">
              <span className="input-group-text w-25">Ally Code</span>
              <input type="text"  
                className="form-control w-50"
                placeholder="Ally Code"
                aria-label="Ally Code"
                aria-describedby="Ally Code"
                id="allyCode"></input>
        
              <button className="form-control btn btn-primary w-25" onClick={getPlayerInfo}>Search</button>
            </div>
          </div>
          <div className="col-2 offset-2 text-end">
            <div className="btn-group">
              <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                SWGOH Refresh
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" onClick={getUnits}>Units</a></li>
                <li><a className="dropdown-item" onClick={getBestMods}>Mods</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Loading loadingMessage={loadingMessage}></Loading>
        <Player playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
      </div>
    )}
    </div>

  );
}


export default App;
