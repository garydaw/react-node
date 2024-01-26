import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export default function ModToolsSpeed({ally_code}) {

    const [mods, setMods] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "mod/checkspeed/"+ally_code, {headers})
            .then((res) => {
              setMods(res.data);
            });
    }, [ally_code]);

    return (
      <div className="pt-3">
        <p>List of all your assigned mods ordered by speed.</p>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Character</th>
                <th scope="col">Slot</th>
                <th scope="col">Primary</th>
                <th scope="col">Set</th>
                <th scope="col">Speed</th>
              </tr>
            </thead>
            <tbody>
            {mods.map((row, index) => {
                return (
                        <tr key={"modTools_set_table_" + index}>
                            <th scope="row">{row.character_name}</th>
                            <td>{row.slot_name} ({row.slot_long_name})</td>
                            <td>{row.primary_stat}</td>
                            <td>{row.group_set_name}</td>
                            <td>{row.speed}</td>
                        </tr>
                )
            })} 
            </tbody>
          </table>
        </div>
      </div>
    )
}