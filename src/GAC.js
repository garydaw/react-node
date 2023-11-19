import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import GACTeam from './GACTeam';

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

    return (
        <div className="container p-0">
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
                    </div>
                </div>
                <div className="col-10">
                    <div id="gacDefenseContent" className={activeContent === "gacDefense" ? "d-show" : "d-none"}>
                        {teams.map((team, index) => {
                            if(team.defense)
                                return (
                                    <GACTeam team={team} key={"gac_defense_"+team.list_order}></GACTeam>
                                );
                        })}
                    </div>
                    <div id="gacOffenseContent" className={activeContent === "gacOffense" ? "d-show" : "d-none"}>
                        {teams.map((team, index) => {
                            if(team.offense)
                                return (
                                    <GACTeam team={team} key={"gac_offense_"+team.list_order}></GACTeam>
                                );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}