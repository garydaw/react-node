import { useState } from 'react';
import { useEffect } from 'react';
import Player from './Player'
import { useLoading } from './LoadingContext';
import { useError } from './ErrorContext';
import Help from './Help';

//to change to env vars

export default function Main({logoutHandler}) {

    const [playerData, setPlayerData] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const { showError } = useError();
    const [passwordError, setPasswordError] = useState("");
    const helpText = "Search for you player using you ally code. This can be found by clicking on your name from the home screen.";

    //does user have access to admin
    const access = localStorage.getItem("access");

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
            const token = localStorage.getItem('token');
            const data = await (await fetch(process.env.REACT_APP_API_URL + "player/" + ally_code + "/", 
                                            {
                                              method: 'GET',
                                              headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                              },
                                            })).json();
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
            const token = localStorage.getItem('token');
            const response = await (await fetch(process.env.REACT_APP_API_URL + "swgoh/units", 
                                            {
                                              method: 'GET',
                                              headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                              },
                                            }));
            hideLoading();
            if (response.ok) {
              console.log(response);
            } else {

              showError(response.statusText);
            }
        } catch (err) {
            showError(err.message)
        }
      }
    
      let getBestMods = async () => {
        try {
            //get data
            showLoading("Getting Best Mods.");
            const token = localStorage.getItem('token');
            await (await fetch(process.env.REACT_APP_API_URL + "swgoh/bestmods", 
                                            {
                                              method: 'GET',
                                              headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                              },
                                            })).json();
            hideLoading();
            
        } catch (err) {
            showError(err.message)
        }
      }

      let refreshPlayerData = async () => {
        try {
            showLoading("Getting data from SWGOH.");
            //get data
            const token = localStorage.getItem('token');
            const data =  await (await fetch(process.env.REACT_APP_API_URL + "swgoh/player/" + playerData.ally_code + "/", 
                                            {
                                              method: 'GET',
                                              headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token,
                                              },
                                            })).json();
            if(data.length !== 0){
              hideLoading();
              setPlayerData(data);
            }
            
        } catch (err) {
          showError(err.message)
        }
      }

      let passwordHandler = async () =>
      {
        setPasswordError("");
        const current_password = document.getElementById("current_password").value;
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;
        const username = localStorage.getItem('ally_code');

        if(password1 === ""){
          setPasswordError("Passwords cannot be blank");
          return;
        }
        if(password1 !== password2){
          setPasswordError("New Passwords do not match!");
          return;
        }
        /*
        const response = await fetch(process.env.REACT_APP_API_URL + '/player/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          localStorage.setItem('token', data.token);
          localStorage.setItem('access', data.user.access);
          localStorage.setItem('ally_code', data.user.ally_code);
        } else {
          // Handle login failure
          const errorData = await response.json();
          setPasswordError(errorData.message);
    }*/
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
                  <div className="btn-group offset-8 col-1">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Admin
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      {access === "1" && <li><a className="dropdown-item" href="#" onClick={getUnits}>Refresh Units</a></li>}
                      {access === "1" && <li><a className="dropdown-item" href="#" onClick={getBestMods}>Refresh Mods</a></li>}
                      <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#password_modal">Change Password</a></li>
                      <li><a className="dropdown-item" href="#" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Player playerData={playerData} refreshPlayerData={refreshPlayerData}></Player>
            </div>

           
            <div className="modal fade" id="password_modal" tabIndex="-1" aria-labelledby="password_modal_Label" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="password_modal_Label">Change Password</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>This site is NOT https, so please dont use a usual password as it is not secure!</p>
                    <div className="row">
                      <div className="col-10 offset-1 card d-show mt-5 pb-3">
                          <div className="mb-3">
                              <label htmlFor="current_password" className="form-label">Current Password</label>
                              <input type="text" className="form-control" id="current_password" placeholder="Enter your Current Password" required></input>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="password1" className="form-label">New Password</label>
                              <input type="password" className="form-control" id="password1" placeholder="Enter your new password" required></input>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="password2" className="form-label">Re-Type New Password</label>
                              <input type="password" className="form-control" id="password2" placeholder="Re-type your new password" required></input>
                          </div>
                          <div className={passwordError === "" ? "d-none" : "d-show pb-3 text-danger"}>
                            {passwordError}
                          </div>
                          <button type="submit" onClick={passwordHandler} className="btn btn-primary btn-block">Change Password</button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
      );
}