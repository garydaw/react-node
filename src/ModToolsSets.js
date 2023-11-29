import { useState } from 'react';
import { useLoading } from './LoadingContext';
const apiUrl = 'http://localhost:5000/api/';


export default function ModToolsSets({ally_code, dates}) {

    const [mismatches, setMismatches] = useState([]);
    const { isLoading, showLoading, hideLoading } = useLoading();

    let getSetMismatch = async () => {
      
        showLoading("Checking mis-match sets.")
        const date = document.getElementById("modTools_set_date").value;

        //get data
        const data = await (await fetch(apiUrl + "mod/checkset/" + ally_code + "/" + date)).json();
        hideLoading();
        setMismatches(data);
    }
    
    if(dates.length === 0)
      return "";
    return (
      <div className="pt-3">
        <div className="row">
        <label htmlFor="modTools_set_date" className="col-1 col-form-label">Date</label>
          <div className="col-3">
          <select id="modTools_set_date" className="form-select" aria-label="Date">
            <option>Please Select a Date</option>
            {dates.map((date, index) => {
              return <option key={"modTools_set_date_" + index} value={date.date}>{date.formatted}</option>
            })}   
          </select>
          </div>
          <div className="col-4"><button className="form-control btn btn-primary w-25" onClick={getSetMismatch}>Check</button></div>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Character</th>
              <th scope="col">Slot</th>
              <th scope="col">Your Primary</th>
              <th scope="col">Best Set</th>
              <th scope="col">Your Set</th>
            </tr>
          </thead>
          <tbody>
          {mismatches.map((row, index) => {
              return (
                      <tr key={"modTools_set_table_" + index}>
                          <th scope="row">{row.character_name}</th>
                          <td>{row.slot_name} ({row.slot_long_name})</td>
                          <td>{row.mod_primary}</td>
                          <td>{row.best_set}</td>
                          <td>{row.mod_set}</td>
                      </tr>
              )
          })} 
          </tbody>
        </table>
        
      </div>
    )
}