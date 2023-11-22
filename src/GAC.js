import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import GACTeam from './GACTeam';
import GACTeamAdmin from './GACTeamAdmin';

const apiUrl = 'http://localhost:5000/api/';

export default function GAC({ally_code}) {
    const [activeContent, setActiveContent] = useState("gacDefense");
    const [teams, setTeams] = useState([]);
    
    let swapContent =  (event) => {
        setActiveContent(event.target.id);
      }

    useEffect(() => {

        axios
            .get(apiUrl + "gacTeam/" + ally_code)
            .then((res) => {
                
                setTeams(res.data);
            });
        
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
                <div className="col-2">
                    <div className="list-group">
                        <button type="button"
                            id="gacDefense"
                            className={activeContent === "gacDefense" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Defense
                        </button>
                        <button type="button"
                            id="gacOffense"
                            className={activeContent === "gacOffense" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Offense
                        </button>
                        <button type="button"
                            id="gacAdmin"
                            className={activeContent === "gacAdmin" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Admin
                        </button>
                    </div>
                </div>
                <div className="col-10">
                    <div id="gacDefenseContent" className={activeContent === "gacDefense" ? "d-show" : "d-none"}>
                    {Object.keys(defense).map(category => (
                        <div key={category} className="card-body border">
                            <h4 className="card-title">Missing {category} Unit(s)</h4>
                            <div className="card-text">
                                <ul className="p-0">
                                    {defense[category].map(team => (
                                        <GACTeam team={team} key={"gac_defense_"+team.list_order}></GACTeam>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    </div>
                    <div id="gacOffenseContent" className={activeContent === "gacOffense" ? "d-show" : "d-none"}>
                        {Object.keys(offense).map(category => (
                            <div key={category} className="card-body border">
                                <h4 className="card-title">Missing {category} Unit(s)</h4>
                                <div className="card-text">
                                    <ul className="p-0">
                                        {offense[category].map(team => (
                                            <GACTeam team={team} key={"gac_offense_"+team.list_order}></GACTeam>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="gacAdminContent" className={activeContent === "gacAdmin" ? "d-show" : "d-none"}>
                        <GACTeamAdmin key="gac_offense_admin"></GACTeamAdmin>
                    </div>
                </div>
            </div>
        </div>
    )
}