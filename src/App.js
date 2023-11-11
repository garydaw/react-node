import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Player from './Player'
import logo from './img/sw.png'

//import PlayerForm from './Playerform.js'

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

  function Loading(props) {
    if(props.loadingMessage === "")
      return "";
    else
      return (<div>{props.loadingMessage}</div>);
  }
  

  return (
    <div className="bg">
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
                <li><a className="dropdown-item" href="832233694">Mods</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Loading loadingMessage={loadingMessage}></Loading>
        <Player playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
      </div>


      <section className="intro text-center">
        A long time ago, in a galaxy far, far away....
      </section>

      <section className="logo">
      <img className="logoImage" src={logo} alt="Bobba Daw" />
      </section>

      <div id="board">  
        <div id="content">
          <p className="crawlText" id="title">Version I</p>
          <p className="crawlText" id="subtitle">THE INITIAL DEPLOYMENT</p>
          <p className="crawlText">Through tireless hours and countless web searches the SWGOH utilities is here.</p>
          <p className="crawlText">This is the site you're looking for. It is not a trap! Do or do not use this site, there is no try! But if you don't
            I will find your lack of faith disturbing!</p>        
        </div>  
      </div>

    </div>

  );
}


export default App;
