import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Team from './Team';

export default function TeamsWar({team_type, team_size, setTWList}) {
  const [twTeams, setTWTeams] = useState([]);
  const [viewByAlly, setViewByAlly] = useState(false);
  const [twTeamsAlly, setTWTeamsAlly] = useState([]);
  const token = localStorage.getItem('token');
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
  };

  let getTWTeams = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "team/war/" + team_type + "/" + team_size +"/", {headers})
      .then((res) => {
          
        setTWTeams(res.data);
      });
  }

  const handleViewChange = () => {
    setTWTeamsAlly([]);
    setViewByAlly(!viewByAlly);
    if(twTeamsAlly.length === 0){
      axios
        .get(process.env.REACT_APP_API_URL + "team/war/" + team_type + "/" + team_size +"/ally", {headers})
        .then((res) => {
            
          setTWTeamsAlly(res.data);
        });
    }
  };

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

let previousAlly = null;
return (
  <div className="p-3">
    <div className="col-md-2 form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="twWarViewType" onChange={handleViewChange}/>
      <label className="form-check-label" htmlFor="twWarViewType">View by Ally</label>

    </div>
    {viewByAlly ? (
        
        <div>
          {twTeamsAlly.map((team, index) => {
            const allyChanged = team.ally_code !== previousAlly;
            previousAlly = team.ally_code;

            return (
              <div className="card-body border">
                {allyChanged && <div className="d-flex justify-content-between align-items-center pb-3">
                  <h4 className="card-title">{team.ally_name}</h4>
                </div>}
                <div className="card-text">
                  <ul className="p-0">
                      <Team team_type={team_type+"_wall"} team={team} offense="true" key={team_type+"War_"+team_size+"_wall_list_"+team.list_order}></Team>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        
    ) : 
    <div className="container"style={{minWidth:"1000px"}}>
      <div className="row" style={{height:"500px"}}>
        <div className="col">
          <div className="row" style={{height:"34%"}}>
            <div className="col border border-dark-subtle border-2 text-end bg-primary-subtle"
                style={{borderTopLeftRadius: "200px"}}
                data-tw_wall_id="FlB"
                onClick={setTWList}
                role="button">
              <h5>Fleet Wall Back</h5>
              {teamSummary["FlB"]}
            </div>
            <div className="col border border-dark-subtle border-2 bg-primary-subtle"
                data-tw_wall_id="FlF"
                onClick={setTWList}
                role="button">
              <h5>Fleet Wall Front</h5>
              {teamSummary["FlF"]}
            </div>
          </div>
          <div className="row" style={{height:"33%"}}>
            <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle"
                data-tw_wall_id="BM"
                onClick={setTWList}
                role="button">
            <h5>Back Wall Middle</h5>
              {teamSummary["BM"]}
            </div>
            <div className="col border border-dark-subtle border-2 bg-success-subtle"
                data-tw_wall_id="TM"
                onClick={setTWList}
                role="button">
              <h5>Third Wall Middle</h5>
                {teamSummary["TM"]}
            </div>
          </div>
          <div className="row" style={{height:"33%"}}>
            <div className="col border border-dark-subtle border-2 text-end bg-secondary-subtle"
              style={{borderBottomLeftRadius: "200px"}}
              data-tw_wall_id="BB"
              onClick={setTWList}
              role="button">
              <h5>Back Wall Bottom</h5>
              {teamSummary["BB"]}
            </div>
            <div className="col border border-dark-subtle border-2 bg-success-subtle"
                data-tw_wall_id="TB"
                onClick={setTWList}
                role="button">
              <h5>Third Wall Bottom</h5>
              {teamSummary["TB"]}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row h-50">
            <div className="col border border-dark-subtle border-2 bg-warning-subtle"
                data-tw_wall_id="ST"
                onClick={setTWList}
                role="button">
              <h5>Second Wall Top</h5>
              {teamSummary["ST"]}
            </div>
            <div className="col border border-dark-subtle border-2 bg-danger-subtle"
              style={{borderTopRightRadius: "200px"}}
              data-tw_wall_id="FT"
              onClick={setTWList}
              role="button">
              <h5>Front Wall Top</h5>
              {teamSummary["FT"]}
            </div>
          </div>
          <div className="row h-50">
            <div className="col border border-dark-subtle border-2 bg-warning-subtle"
                data-tw_wall_id="SB"
                onClick={setTWList}
                role="button">
              <h5>Second Wall Bottom</h5>
              {teamSummary["SB"]}
            </div>
            <div className="col border border-dark-subtle border-2 bg-danger-subtle"
              style={{borderBottomRightRadius: "200px"}}
              data-tw_wall_id="FB"
              onClick={setTWList}
              role="button">
              <h5>Front Wall Bottom</h5>
              {teamSummary["FB"]}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  </div>
  );
}