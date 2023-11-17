import { useState } from 'react';
import Player from './Player'
import { useLoading } from './LoadingContext';

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

export default function Main() {

    const [playerData, setPlayerData] = useState({});
    const { isLoading, showLoading, hideLoading } = useLoading();

    let getPlayerInfo = async () => {
        try {
    
            //set loading
            showLoading("Getting Player Data from database.");
            const ally_code = document.getElementById("allyCode").value;
      
            //get data
            const data = await (await fetch(apiUrl + "player/" + ally_code +'/')).json();
            hideLoading("Getting Player Data from database.");
            setPlayerData(data);
            
        } catch (err) {
            console.log(err.message)
        }
      }

    let getUnits = async () => {
        try {
            //get data
            showLoading("Getting Units.");
            await (await fetch(apiUrl + "swgoh/units/")).json();
            hideLoading("Getting Units.");
            
        } catch (err) {
            console.log(err.message)
        }
      }
    
      let getBestMods = async () => {
        try {
            //get data
            showLoading("Getting Best Mods.");
            await (await fetch(apiUrl + "swgoh/bestmods/")).json();
            hideLoading("Getting Best Mods.");
            
        } catch (err) {
            console.log(err.message)
        }
      }

      let refreshPlayerData = async () => {
        try {
            showLoading("Getting data from SWGOH.");
            //get data
            const data = await (await fetch(apiUrl + "swgoh/player/" + playerData.ally_code +'/')).json();
            if(data.length === 0){
              //setLoadingMessage("No data found please check your Ally Code.");
            } else {
                hideLoading("Getting data from SWGOH.");
              setPlayerData(data);
            }
            
        } catch (err) {
            console.log(err.message)
        }
      }

    return (
           
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
            <Player playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
          </div>
    
      );
}