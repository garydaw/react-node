import { useState } from 'react';
import { useLoading } from './LoadingContext';

const apiUrl = 'http://localhost:5000/api/';

export default function ModToolsUnassigned({ally_code, dates, slots}) {

    const [characters, setCharacters] = useState([]);
    const { isLoading, showLoading, hideLoading } = useLoading();

    let searchUnassigned = async () => {
      try {
          showLoading("Checking mis-match primaries.")
          const date = document.getElementById("modTools_unassigned_date").value;

          //get data
          const data = await (await fetch(apiUrl + "mod/searchUnassigned/" + ally_code + "/" + date + "?something=123&slot=4")).json();
          hideLoading();
          setCharacters(data);
          
      } catch (err) {
          console.log(err.message)
      }
    }
    
    if(dates.length === 0)
      return "";
    return (
      <div className="pt-3 pr-3">
        <div className="row">
          <div className="col-4">
            <select id="modTools_unassigned_date" className="form-select" aria-label="Date">
              <option>Please Select</option>
              {dates.map((date, index) => {
                return <option value={date.date}>{date.formatted}</option>
              })}   
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <select id="modTools_unassigned_slot" className="form-select" aria-label="Slot">
              <option>Please Select</option>
              {slots.map((slot, index) => {
                return <option value={slot.slot_id}>{slot.slot_name} ({slot.slot_long_name})</option>
              })}   
            </select>
          </div>
          <div className="col-3">Set</div>
          <div className="col-3">Primary</div>
          <div className="col-3"><button className="form-control btn btn-primary" onClick={searchUnassigned}>Check</button></div>
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
          {characters.map((row, index) => {
              return <tr><th scope="row">{row.character_name}</th><td>{row.slot_long_name} ({row.slot_name})</td><td>{row.best_unassigned}</td><td>{row.mod_unassigned}</td></tr>
          })} 
          </tbody>
        </table>
        
      </div>
    )
}