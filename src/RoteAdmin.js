import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CharacterImage from './CharacterImage';
import { Alert } from 'react-bootstrap';

export default function RoteAdmin({unitData}) {
  const team_size = 15;
  const [searchTerm, setSearchTerm] = useState('');
  const [team, setTeamData] = useState(new Array(parseInt(team_size)).fill(null));

  const [alertMessage, setAlertMessage] = useState("");

  const filteredUnits = unitData.filter(unit =>
    unit.character_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const arrayOfRows = [];
  // Counter to keep track of the numbering
  let counter = 1;

  // Outer loop to create 3 arrays
  for (let i = 0; i < 3; i++) {
    // Initialize the inner array
    const columnArray = [];

    // Inner loop to populate the inner array with numbers from 1 to 15
    for (let j = 0; j < 5; j++) {
      columnArray.push(counter);
      counter++;
    }

    // Push the inner array to the outer array
    arrayOfRows.push(columnArray);
  }
      
    let addToTeam =  (unit) => {
      let this_team = team.slice();
      let found = false;
      for(var t = 0;t < this_team.length && !found; t++){
        if(this_team[t] === null){
          this_team[t] = unit;
          found = true;
          setTeamData(this_team);
        }
         
      }
      if(!found){
        setAlertMessage("Team is full.");
      }
    }

    let removeFromTeam = (indexToRemove) => {
      let this_team = team.filter((_, index) => index !== indexToRemove);
      this_team.push(null);
      setTeamData(this_team);
    }

    let addTeam = () => {
      for(var i = 0; i < team.length; i++){
        if(team[i]===null){
          setAlertMessage("The team must have all " + team_size + " characters selected.");
          return;
        }
      }
      
      const token = localStorage.getItem('token');
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      };
      let postObj = {};
      postObj.team = team;
      postObj.path = document.getElementById("rote_path").value;
      postObj.phase = document.getElementById("rote_phase").value;
      postObj.relic_level = document.getElementById("rote_relic_level").value;
      
      axios.post(process.env.REACT_APP_API_URL + "rote/operation", postObj, {headers})
        .then(response => {
          //setTeamData(new Array(parseInt(team_size)).fill(null));
          //getTeams();
        });
    }

return (
    <div className="p-3">
      {alertMessage !== "" && (
        <Alert variant="danger" onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}
       <div className="row row-cols-6">
          {team.map((unit, index) => {
            return (
              <div key={"AdminRote_"+team_size+"_"+index} className="col-6 col-md-4 col-lg-2 pe-3 pb-3">
                <div className="card">
                  <div className="card-body">
                 
                      {unit !== null && 
                        <>
                         <div className="d-flex justify-content-between align-items-center">
                            <h5>{unit.character_name}</h5>
                            <i className="bi bi-x-circle" role="button" onClick={() => removeFromTeam(index)}></i>
                         </div>
                         <CharacterImage unit_image={unit.unit_image} unit_name={unit.character_name}></CharacterImage>
                        </>
                      }
                  </div>
                </div>
            </div>
            );
          })}
      </div>
      <div className="row">
        <div className="col-4 col-md-3">
          <div className="input-group">
            <span className="input-group-text">Path</span>
            <select id="rote_path" className="form-select" aria-label="Path">
                <option value="light">Light</option>
                <option value="netural">Netural</option>
                <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <div className="col-4 col-md-3">
          <div className="input-group">
            <span className="input-group-text">Min Relic</span>
            <select id="rote_relic_level" className="form-select" aria-label="Min Relic">
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">8</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-4 col-md-3">
          <div className="input-group">
            <span className="input-group-text">Phase</span>
            <select id="rote_phase" className="form-select" aria-label="Phase">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
          </div>
        </div>
        <div className="col-4 col-md-3">
          <button type="button" className="btn btn-primary" onClick={addTeam}>Add</button>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12 col-sm-6 col-md-3 pb-3">
          <input type="text"
                  id="RoteAdminSearch"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>

      <div className="row">
        {filteredUnits.map((unit, index) => {
          return (
            <div key={"RoteAdmin_15_"+unit.base_id} className="col-6 col-sm-4 col-md-3 col-lg-2 ps-3 pb-3" onClick={() => addToTeam(unit)}>
              <div className="card">
                <div className="card-body text-centre">
                    <h5>{unit.character_name}</h5>
                    <CharacterImage unit_image={unit.unit_image} unit_name={unit.character_name}></CharacterImage>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}