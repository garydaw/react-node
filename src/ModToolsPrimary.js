import { useState } from 'react';
import { useLoading } from './LoadingContext';
const apiUrl = 'http://localhost:5000/api/';


export default function ModToolsPrimary({ally_code, dates}) {

    const [mismatches, setMismatches] = useState([]);
    const { isLoading, showLoading, hideLoading } = useLoading();

    let getPrimaryMismatch = async () => {
      try {
          showLoading("Checking mis-match primaries.")
          const date = document.getElementById("modTools_primary_date").value;

          //get data
          const data = await (await fetch(apiUrl + "mod/checkprimary/" + ally_code + "/" + date)).json();
          hideLoading();
          setMismatches(data);
          
      } catch (err) {
          console.log(err.message)
      }
    }
    
    if(dates.length === 0)
      return "";
    return (
      <div className="pt-3">
        <div className="row">
        <label htmlFor="modTools_primary_date" className="col-1 col-form-label">Date</label>
          <div className="col-3">
          <select id="modTools_primary_date" className="form-select" aria-label="Date">
            <option>Please Select a Date</option>
            {dates.map((date, index) => {
              return <option key={"modTools_primary_date_" + index} value={date.date}>{date.formatted}</option>
            })}   
          </select>
          </div>
          <div className="col-4"><button className="form-control btn btn-primary w-25" onClick={getPrimaryMismatch}>Check</button></div>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Character</th>
              <th scope="col">Slot</th>
              <th scope="col">Best Primary</th>
              <th scope="col">Your Primary</th>
            </tr>
          </thead>
          <tbody>
          {mismatches.map((row, index) => {
              return <tr key={"modTools_primary_table_" + index}><th scope="row">{row.character_name}</th><td>{row.slot_name} ({row.slot_long_name})</td><td>{row.best_primary}</td><td>{row.mod_primary}</td></tr>
          })} 
          </tbody>
        </table>
        
      </div>
    )
}