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

  let teamSummary = [];
  
  twTeams.forEach((team, index) => {
    if (!teamSummary[team.tw_wall_id]) {
      teamSummary[team.tw_wall_id] = [];
    }
    teamSummary[team.tw_wall_id].push(<div key={"tw_wall_"+team.tw_wall_id+"_"+team.team_id}>{team.count}-{team.character_name}</div>);

  });

return (
  <div className="container"style={{minWidth:"1000px"}}>
    <div className="row" style={{height:"500px"}}>
      <div className="col">
        <div className="row" style={{height:"34%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-primary-subtle" style={{borderTopLeftRadius: "200px"}}>
            <h5>Fleet Wall Back</h5>
            {teamSummary["FlB"]}
          </div>
          <div className="col border border-dark-subtle border-2 bg-primary-subtle">
            <h5>Fleet Wall Front</h5>
            {teamSummary["FlF"]}
          </div>
        </div>
        <div className="row" style={{height:"33%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle">
          <h5>Back Wall Middle</h5>
            {teamSummary["BM"]}
          </div>
          <div className="col border border-dark-subtle border-2 bg-success-subtle">
            <h5>Third Wall Middle</h5>
              {teamSummary["TM"]}
          </div>
        </div>
        <div className="row" style={{height:"33%"}}>
          <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle" style={{borderBottomLeftRadius: "200px"}}>
            <h5>Back Wall Bottom</h5>
            {teamSummary["BB"]}
          </div>
          <div className="col border border-dark-subtle border-2 bg-success-subtle">
            <h5>Third Wall Bottom</h5>
            {teamSummary["TB"]}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row h-50">
          <div className="col border border-dark-subtle border-2 bg-warning-subtle">
            <h5>Second Wall Top</h5>
            {teamSummary["ST"]}
          </div>
          <div className="col border border-dark-subtle border-2 bg-danger-subtle" style={{borderTopRightRadius: "200px"}}>
            <h5>Front Wall Top</h5>
            {teamSummary["FT"]}
          </div>
        </div>
        <div className="row h-50">
          <div className="col border border-dark-subtle border-2 bg-warning-subtle">
            <h5>Second Wall Bottom</h5>
            {teamSummary["SB"]}
          </div>
          <div className="col border border-dark-subtle border-2 bg-danger-subtle" style={{borderBottomRightRadius: "200px"}}>
            <h5>Front Wall Bottom</h5>
            {teamSummary["FB"]}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}