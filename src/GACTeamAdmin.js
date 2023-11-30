import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CharacterImage from './CharacterImage';

const apiUrl = 'http://localhost:5000/api/';

export default function GACTeamAdmin({team_size, getTeams}) {
  const [unitData, setUnitData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [team, setTeamData] = useState(new Array(parseInt(team_size)).fill(null));

  useEffect(() => {

    axios
        .get(apiUrl + "gacTeam/units")
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
          alert("Can not add the same unit.");
        }
         
      }
      if(!found){
        alert("Team is full.")
      }
    }

    let removeFromTeam = (indexToRemove) => {
      let this_team = team.filter((_, index) => index !== indexToRemove);
      this_team.push(null);
      setTeamData(this_team);
    }

    let addTeam = () => {
      let postObj = {};
      postObj.team = team;
      postObj.defense = document.getElementById("gacAdmin_defense_"+team_size).checked;
      postObj.offense = document.getElementById("gacAdmin_offense_"+team_size).checked;
      postObj.team_size = team_size;

      axios.post(apiUrl + "gacTeam", postObj)
        .then(response => {
          setTeamData(new Array(parseInt(team_size)).fill(null));
          getTeams();
        });
    }

return (
    <div className="p-3">
       <div className="row row-cols-6">
          {team.map((unit, index) => {
            return (
              <div key={"gacAdminTeam_"+team_size+"_"+index} className="card col m-3">
                  <div className="card-body">
                 
                      {unit !== null && 
                        <>
                         <div className="d-flex justify-content-between align-items-center">
                            <h5>{unit.character_name}</h5>
                            <i className="bi bi-x-circle" onClick={() => removeFromTeam(index)}></i>
                         </div>
                         <CharacterImage unit_image={unit.unit_image} circle="100"></CharacterImage>
                        </>
                      }
                  </div>
            </div>
            );
          })}
      </div>
      <div className="row">
        <div className="col-3 form-check">
          <input className="form-check-input" type="checkbox" id={"gacAdmin_defense_"+team_size}/>
            Defense
        </div>
        <div className="col-3 form-check">
          <input className="form-check-input" type="checkbox" id={"gacAdmin_offense_"+team_size}/>
            Offense
        </div>
        <div className="col-3">
          <button type="button" className="btn btn-primary" onClick={addTeam}>Add</button>
        </div>
      </div>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <input type="text"
                  id={"gacAdminSearch_"+team_size}
                  className="form-control w-25"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="Search"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="row row-cols-6">
          {filteredUnits.map((unit, index) => {
            return (
              <div key={"gacAdmin_"+team_size+"_"+unit.base_id} className="card col m-3" onClick={() => addToTeam(unit)}>
                  <div className="card-body">
                      <h5>{unit.character_name}</h5>
                      <CharacterImage unit_image={unit.unit_image} circle="100"></CharacterImage>
                  </div>
            </div>
            );
          })}
      </div>

    </div>
  );
}