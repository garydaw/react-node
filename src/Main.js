import { useState } from 'react';
import { useEffect } from 'react';
import Player from './Player'
import { useLoading } from './LoadingContext';
import { useError } from './ErrorContext';
import Help from './Help';

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

export default function Main() {

    const [playerData, setPlayerData] = useState({});
    const { isLoading, showLoading, hideLoading } = useLoading();
    const { isError, showError, hideError } = useError();
    const helpText = "Search for you player using you ally code. This can be found by clicking on your name from the home screen.";

    
    //load ally code if been here before
    useEffect(() => {

        const this_ally_code = localStorage.getItem("ally_code");
        if(this_ally_code !== null){
          document.getElementById("allyCode").value = this_ally_code;
          getPlayerInfo();
        }
    }, []);

    let getPlayerInfo = async () => {
        try {
    
            //set loading
            showLoading("Getting Player Data from database.");
            const ally_code = document.getElementById("allyCode").value;
      
            //get data
            const data = await (await fetch(apiUrl + "player/" + ally_code +'/')).json();
            hideLoading();
            localStorage.setItem("ally_code", ally_code);
            setPlayerData(data);
            
        } catch (err) {
            showError(err.message)
        }
      }

    let getUnits = async () => {
        try {
            //get data
            showLoading("Getting Units.");
            await (await fetch(apiUrl + "swgoh/units/")).json();
            hideLoading();
            
        } catch (err) {
            showError(err.message)
        }
      }
    
      let getBestMods = async () => {
        try {
            //get data
            showLoading("Getting Best Mods.");
            await (await fetch(apiUrl + "swgoh/bestmods/")).json();
            hideLoading();
            
        } catch (err) {
            showError(err.message)
        }
      }

      let refreshPlayerData = async () => {
        try {
            showLoading("Getting data from SWGOH.");
            //get data
            const data = await (await fetch(apiUrl + "swgoh/player/" + playerData.ally_code +'/')).json();
            if(data.length !== 0){
              hideLoading();
              setPlayerData(data);
            }
            
        } catch (err) {
          showError(err.message)
        }
      }

    return (
           
          <div className="container-full p-3">
            <div className="row">
              <div className="col-sm-6 col-md-5 offset-md-3">
                <div className="input-group">
                  <span className="input-group-text">Ally Code</span>
                  <input type="text"  
                    className="form-control"
                    placeholder="Ally Code"
                    aria-label="Ally Code"
                    aria-describedby="Ally Code"
                    id="allyCode"></input>
            
                  <button className="btn btn-primary" onClick={getPlayerInfo}>Search</button>
                  
                </div>
              </div>
              <div className="col-1">
                <Help modal_id="mainHelp" header="Main" content={helpText} colour="white"></Help>
              </div>
              <div className="col-sm-5 col-md-3 text-end">
                <div className="row">
                  <div className="btn-group">
                    <button type="button" className="btn btn-danger dropdown-toggle text-right" data-bs-toggle="dropdown" aria-expanded="false">
                      SWGOH Refresh
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><a className="dropdown-item" onClick={getUnits}>Units</a></li>
                      <li><a className="dropdown-item" onClick={getBestMods}>Mods</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Player playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
            </div>
          </div>
    
      );
}