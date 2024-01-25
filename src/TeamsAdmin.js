import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CharacterImage from './CharacterImage';
import { Alert } from 'react-bootstrap';

export default function TeamsAdmin({team_type, team_size, getTeams}) {
  const [unitData, setUnitData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [team, setTeamData] = useState(new Array(parseInt(team_size)).fill(null));

  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "team/units", {headers})
        .then((res) => {
          setUnitData(res.data);
        });
    
    }, []);

    const filteredUnits = unitData.filter(unit =>
      unit.character_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
      
    let addToTeam =  (unit) => {
      let this_team = team.slice();
      let found = false;
      for(var t = 0;t < this_team.length && !found; t++){
        if(this_team[t] === null){
          this_team[t] = unit;
          found = true;
          setTeamData(this_team);
          
        } else if(this_team[t].base_id === unit.base_id){
          found = true;
          setAlertMessage("Can not add the same unit.");
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
      if(team[0]===null){
        setAlertMessage("The team must have at least one character.");
        return;
      }
      const token = localStorage.getItem('token');
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      };
      let postObj = {};
      postObj.team = team;
      postObj.defense = document.getElementById(team_type + "Admin_defense_"+team_size).checked;
      postObj.offense = document.getElementById(team_type + "Admin_offense_"+team_size).checked;
      postObj.team_size = team_size;
      if(!postObj.defense && !postObj.offense){
        setAlertMessage("The team must have at least one of Defense or Offense selected.");
        return;
      }
      axios.post(process.env.REACT_APP_API_URL + "team/" + team_type, postObj, {headers})
        .then(response => {
          setTeamData(new Array(parseInt(team_size)).fill(null));
          getTeams();
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
              <div key={team_type + "AdminTeam_"+team_size+"_"+index} className="col-6 col-md-4 col-lg-2 pe-3 pb-3">
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
        <div className="col-4 col-md-3 form-check ms-3">
          <input className="form-check-input" type="checkbox" id={team_type + "Admin_defense_"+team_size}/>
            Defense
        </div>
        <div className="col-4 col-md-3 form-check">
          <input className="form-check-input" type="checkbox" id={team_type + "Admin_offense_"+team_size}/>
            Offense
        </div>
        <div className="d-none d-md-block col-4 col-md-3">
          <button type="button" className="btn btn-primary" onClick={addTeam}>Add</button>
        </div>
      </div>
      <div className="row d-md-none">
        <div className="col-4 pb-3">
          <button type="button" className="btn btn-primary" onClick={addTeam}>Add</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3 pb-3">
          <input type="text"
                  id={team_type + "AdminSearch_"+team_size}
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
            <div key={team_type + "Admin_"+team_size+"_"+unit.base_id} className="col-6 col-sm-4 col-md-3 col-lg-2 ps-3 pb-3" onClick={() => addToTeam(unit)}>
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