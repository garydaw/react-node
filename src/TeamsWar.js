import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CharacterImage from './CharacterImage';
import { Alert } from 'react-bootstrap';

export default function TeamsWar({team_type, team_size}) {
  const [twTeams, setTWTeams] = useState([]);

  let getTWTeams = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
  };
   axios
    .get(process.env.REACT_APP_API_URL + "team/war/" + team_type + "/" + team_size +"/", {headers})
    .then((res) => {
        
      setTWTeams(res.data);
    });
  }

  useEffect(() => {

    getTWTeams();
    
  }, []);

return (
  <div className="container"style={{minWidth:"1000px"}}>
    <div className="row" style={{height:"500px"}}>
      <div className="col">
        <div className="row" style={{height:"34%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-primary-subtle" style={{borderTopLeftRadius: "200px"}}>
          <h5>Fleet Wall Back</h5>
          </div>
          <div className="col border border-dark-subtle border-2 bg-primary-subtle">
            <h5>Fleet Wall Front</h5>
          </div>
        </div>
        <div className="row" style={{height:"33%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle">
          <h5>Back Wall Middle</h5>
          </div>
          <div className="col border border-dark-subtle border-2 bg-success-subtle">
            <h5>Third Wall Middle</h5>
          </div>
        </div>
        <div className="row" style={{height:"33%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle" style={{borderBottomLeftRadius: "200px"}}>
            <h5>Back Wall Bottom</h5>
          </div>
          <div className="col border border-dark-subtle border-2 bg-success-subtle">
            <h5>Third Wall Bottom</h5>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row h-50">
          <div className="col border border-dark-subtle border-2 bg-warning-subtle">
            <h5>Second Wall Top</h5>
          </div>
          <div className="col border border-dark-subtle border-2 bg-danger-subtle" style={{borderTopRightRadius: "200px"}}>
            <h5>Front Wall Top</h5>
            {twTeams.map((team, index) => {
                  if(team.tw_wall_id !== "FT"){
                    return (<></>);
                  }
                  return (
                  <div key={"tw_wall_"+team.tw_wall_id+"_"+team.team_id}>
                    {team.count} - {team.character_name}
                  </div>
                  );
                })}
          </div>
        </div>
        <div className="row h-50">
          <div className="col border border-dark-subtle border-2 bg-warning-subtle">
            <h5>Second Wall Bottom</h5>
          </div>
          <div className="col border border-dark-subtle border-2 bg-danger-subtle" style={{borderBottomRightRadius: "200px"}}>
            <h5>Front Wall Bottom</h5>
            1 Leia<br/>
            19 Phasma
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}