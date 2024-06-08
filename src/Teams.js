import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Team from './Team';
import TeamsAdmin from './TeamsAdmin';
import TeamsWar from './TeamsWar';
import Help from './Help';

export default function Teams({team_type, ally_code, team_size}) {
    const [activeContent, setActiveContent] = useState(team_type+"Defense_"+team_size);
    const [previousContent, setPreviousContent] = useState(team_type+"Defense_"+team_size);
    const [teams, setTeams] = useState([]);
    const [guildTeams, setGuildTeams] = useState([]);
    const [isTeamGuildFullRelic, setTeamGuildFullRelic] = useState(false);
    const [walls, setWalls] = useState([]);

    const helpText = "List of some of the best teams for "+team_type.toUpperCase()+", this are broken down by the number of units you have/don't have."+
                " The details shown for the unit are your details.";
    
    let swapContent =  (event) => {
        setPreviousContent(activeContent);
        setActiveContent(event.target.id);
      }

    //does user have access to admin
    const access = localStorage.getItem("access");

    let getTeams = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "team/" + team_type + "/" + team_size +"/" + ally_code, {headers})
            .then((res) => {
                
                setTeams(res.data);
            });
    }
    
    let getWalls = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "team/" + team_type + "/" + team_size +"/walls", {headers})
            .then((res) => {
                
                setWalls(res.data);
            });
    }

    let deleteTeam = (team_id, offense) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .delete(process.env.REACT_APP_API_URL + "team/" + team_id + "/" + offense, {headers})
            .then((res) => {
                
                getTeams();
            });
    }

    let showGuildTeams = (team_id) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "team/guild/" + team_id, {headers})
            .then((res) => {
                setPreviousContent(activeContent);
                setActiveContent("guildTeams");
                setGuildTeams(res.data);
            });
    }

    const checkTeamGuildFullRelicHandler = () => {
        setTeamGuildFullRelic(!isTeamGuildFullRelic);
      }

    const filteredGuildTeams = guildTeams.filter(team =>
        !isTeamGuildFullRelic || team.full_relic === 1 
      );

    const closeGuildTeam = () => {
        setActiveContent(previousContent);
        setPreviousContent("guildTeams");
    }

    useEffect(() => {

        getTeams();
        getWalls();
        
    }, []);


    let offense = [];
    let defense = [];

    teams.forEach(team => {
        const missing_members = team.team_count - team.player_team_count;
        if(team.defense){
            if (!defense[missing_members]) {
                defense[missing_members] = [];
              }
            defense[missing_members].push(team);
        }
        if(team.offense){
            if (!offense[missing_members]) {
                offense[missing_members] = [];
              }
            offense[missing_members].push(team);
        }
    });

    return (
        <div className="p-0">
            <div className="row">
                <div className="col-4 col-md-3 col-lg-2">
                    <div className="list-group">
                        <button type="button"
                            id={team_type+"Defense_"+team_size}
                            className={activeContent === team_type+"Defense_"+team_size ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Defense
                        </button>
                        <button type="button"
                            id={team_type+"Offense_"+team_size}
                            className={activeContent === team_type+"Offense_"+team_size ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Offense
                        </button>
                        {team_type === "tw" &&
                            <button type="button"
                                id={team_type+"War_"+team_size}
                                className={activeContent === team_type+"War_"+team_size ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                onClick={swapContent}
                                aria-current="true">
                                {team_type.toUpperCase()} War
                            </button>
                        }
                        {access === "1" && 
                            <button type="button"
                                id={team_type+"Admin_"+team_size}
                                className={activeContent === team_type+"Admin_"+team_size ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                onClick={swapContent}
                                aria-current="true">
                                    Admin
                            </button>
                        }
                    </div>
                </div>

                <div className="col-8 col-md-9 col-lg-10">
                
                    <div id={team_type+"DefenseContent_"+team_size} className={activeContent === team_type+"Defense_"+team_size ? "d-show" : "d-none"}>
                    {Object.keys(defense).map((category, index) => (
                        <div key={category} className="card-body border">
                            <div className="d-flex justify-content-between align-items-center pb-3">
                                <h4 className="card-title">Missing {category} Unit(s)</h4>
                                {index === 0 && <Help modal_id={team_type+"HelpDefense"+team_size} header={team_type.toUpperCase()} content={helpText} colour="black"></Help>}
                            </div>
                            <div className="card-text">
                                <ul className="p-0">
                                    {defense[category].map(team => (
                                        <Team team_type={team_type} team={team} offense="false" key={team_type+"_defense_"+team_size+"_"+team.list_order} deleteTeam={deleteTeam} showGuildTeams={showGuildTeams} walls={walls}></Team>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    </div>
                    <div id={team_type+"OffenseContent_"+team_size} className={activeContent === team_type+"Offense_"+team_size ? "d-show" : "d-none"}>
                        {Object.keys(offense).map((category, index) => (
                            <div key={category} className="card-body border">
                                <div className="d-flex justify-content-between align-items-center pb-3">
                                    <h4 className="card-title">Missing {category} Unit(s)</h4>
                                    {index === 0 && <Help modal_id={team_type+"HelpOffense"+team_size} header={team_type.toUpperCase()} content={helpText} colour="black"></Help>}
                                </div>
                                <div className="card-text">
                                    <ul className="p-0">
                                        {offense[category].map(team => (
                                            <Team team_type={team_type} team={team} offense="true" key={team_type+"_offense_"+team_size+"_"+team.list_order} deleteTeam={deleteTeam} showGuildTeams={showGuildTeams} walls={walls}></Team>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id={team_type+"AdminContent_"+team_size} className={activeContent === team_type+"Admin_"+team_size ? "d-show" : "d-none"}>
                        <TeamsAdmin key={team_type+"_offense_admin_"+team_size} team_type={team_type} team_size={team_size} getTeams={getTeams}></TeamsAdmin>
                    </div>

                    <div id="guildTeams" className={activeContent === "guildTeams" ? "d-show" : "d-none"}>
                        
                        <div className="card-body border">
                            <div className="d-flex justify-content-between align-items-center pb-3">
                                <h4 className="card-title">Guild Teams ({filteredGuildTeams.length})</h4>
                                <button type="button" className="btn-close" onClick={closeGuildTeam}></button>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="teamGuildFullRelic" checked={isTeamGuildFullRelic} onChange={checkTeamGuildFullRelicHandler}/>
                                <label className="form-check-label" htmlFor="teamGuildFullRelic">
                                    Full Relic
                                </label>
                            </div>
                            <div className="card-text">
                                <ul className="p-0">
                                    {filteredGuildTeams.map((team, index) => (
                                        <Team team_type="guild" team={team} offense="true" key={"guild_team_"+index} deleteTeam={deleteTeam} showGuildTeams={showGuildTeams} walls={walls}></Team>
                                    ))}
                                </ul>
                            </div>
                        </div>
                      
                    </div>
                    <div id={team_type+"War_"+team_size} className={activeContent === team_type+"War_"+team_size ? "d-show" : "d-none"}>
                        <TeamsWar key={team_type+"War_"+team_size} team_type={team_type} team_size={team_size}></TeamsWar>
                    </div>
                </div>
            </div>
        </div>
    )
}