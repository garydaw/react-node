import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Help from './Help';

export default function ModToolsCompare({ally_code}) {
    const [base_id, setBaseID] = useState("");
    const [units, setUnits] = useState([]);
    const [allies, setAllies] = useState([]);
    const [comparison, setComparison] = useState([]);
    const helpText = "Compare your mods against another guild ally or the whole guild."

    useEffect(() => {

      const token = localStorage.getItem('token');
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      };
      axios
          .get(process.env.REACT_APP_API_URL + "player/" + ally_code + "/unit/", {headers})
          .then((res) => {
            setUnits(res.data);
          });
        }, [ally_code]);


    const getAllies = async () => {
      setAllies([]);
      setBaseID(document.getElementById("modTools_compare_units").value);

      if(base_id !== ""){
        const token = localStorage.getItem('token');
        const data =  await (await fetch(process.env.REACT_APP_API_URL + "mod/ally/unit/" + ally_code + "/" + base_id, 
                                        {
                                          method: 'GET',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + token,
                                          },
                                        })).json();
        setAllies(data);
      }

    }
    
    
    const getComparison = async () => {
    
        const their_ally_code = document.getElementById("modTools_compare_ally").value;
        //get data
        const token = localStorage.getItem('token');
        const data =  await (await fetch(process.env.REACT_APP_API_URL + "mod/compare/" + ally_code + "/" + base_id + "/" + their_ally_code, 
                                        {
                                          method: 'GET',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + token,
                                          },
                                        })).json();

        setComparison(data);
    }
    
    return (
      <div className="pt-3">
        <div className="row">
          <div className='col-5'>
            <div className="input-group">
              <span className="input-group-text">Units</span>
              <select id="modTools_compare_units" className="form-select" aria-label="Unit" onChange={getAllies}>
                  <option value="">Please Select</option>
                  {units.map((item, index) => {
                    return <option key={"modTools_compare_units" + index} value={item.base_id}>{item.character_name}</option>
                  })}   
              </select>
            </div>
          </div>
          <div className='col-4'>
            <div className="input-group">
              <span className="input-group-text">Ally</span>
              <select id="modTools_compare_ally" className="form-select" aria-label="Ally" disabled={base_id === ""}>
                  <option value="guild">Whole Guild</option>
                  {allies.map((item, index) => {
                    return <option key={"modTools_compare_ally" + index} value={item.ally_code}>{item.ally_name}</option>
                  })}   
              </select>
            </div>
          </div>
          <div className='col-1'>
            <div className="input-group">
            <button className="btn btn-primary" onClick={getComparison} disabled={base_id === ""}>Compare</button>
            </div>
          </div>
          <div className="col-1 float-end"><Help modal_id="modToolsCompareHelp" header="Mod Tools Compare" content={helpText} colour="black"></Help></div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Character</th>
                <th scope="col">Slot</th>
                <th scope="col">Your Set</th>
                <th scope="col">Compare Set</th>
                <th scope="col">Your Primary</th>
                <th scope="col">Compare Primary</th>
              </tr>
            </thead>
            <tbody>
            {comparison.map((row, index) => {
                return (
                        <tr key={"modTools_compare_table_" + index}>
                            <th scope="row">{row.character_name}</th>
                            <td>{row.slot_name} ({row.slot_long_name})</td>
                            <td>{row.your_mod_set}</td>
                            <td>{row.their_mod_set}</td>
                            <td>{row.your_mod_primary}</td>
                            <td>{row.their_mod_primary}</td>
                        </tr>
                )
            })} 
            </tbody>
          </table>
        </div>
      </div>
    )
}