import { useState } from 'react';
import { useLoading } from './LoadingContext';
import Help from './Help';

const apiUrl = 'http://localhost:5000/api/';

export default function ModToolsUnassigned({ally_code, dates, slots, group_sets, primaries}) {

    const [characters, setCharacters] = useState([]);
    const { isLoading, showLoading, hideLoading } = useLoading();
    const helpText = "Helps you assign your unassigned mods to unit that matches 'Best Mod (GAC - Kyber)' from swgoh.gg."

    let searchUnassigned = async () => {
      
        showLoading("Searching for unassigned Mod slots.")
        const date = document.getElementById("modTools_unassigned_date").value;
        const slot = document.getElementById("modTools_unassigned_slot").value;
        const group_set = document.getElementById("modTools_unassigned_group_sets").value;
        const primary = document.getElementById("modTools_unassigned_primaries").value;
        const assigned = document.getElementById("modTools_unassigned_include_assigned").checked;

        //get data
        const data = await (await fetch(apiUrl + "mod/searchUnassigned/" + ally_code + "/" + date + "?slot="+slot+"&group_set="+group_set+"&primary="+primary+"&assigned="+assigned)).json();
        hideLoading();
        setCharacters(data);
    }

    let setPrimary = (event) => {
      let select = document.getElementById("modTools_unassigned_primaries");
      //square
      if(event.target.value === "1"){
        //primary must be Offense
        select.value = "Offense";
        select.setAttribute("disabled", "disabled");
        //diamond
      } else if (event.target.value === "3"){
        //primary must be defense
        select.value = "Defense";
        select.setAttribute("disabled", "disabled");
      } else {
        select.removeAttribute("disabled");
      }
    }
    
    if(dates.length === 0)
      return "";
    return (
      <div className="pt-3">
        <div className="row pb-2">
          <label htmlFor="modTools_unassigned_date" className="col-1 col-form-label">Date</label>
          <div className="col-3">
            <select id="modTools_unassigned_date" className="form-select" aria-label="Date">
              <option value="">Please Select a Date</option>
              {dates.map((date, index) => {
                return <option key={"modTools_unassigned_date" + index} value={date.date}>{date.formatted}</option>
              })}   
            </select>
          </div>
          <label htmlFor="modTools_unassigned_slot" className="col-1 col-form-label">Slot</label>
          <div className="col-3">
            <select id="modTools_unassigned_slot" className="form-select" aria-label="Slot" onChange={setPrimary}>
              <option value="">Please Select a Slot</option>
              {slots.map((slot, index) => {
                return <option key={"modTools_unassigned_slot" + index} value={slot.slot_id}>{slot.slot_name} ({slot.slot_long_name})</option>
              })}   
            </select>
          </div>
          <div className="col-3 form-check">
            <input className="form-check-input" type="checkbox" id="modTools_unassigned_include_assigned"/>
              Included Assigned
          </div>
          <div className="col-1"><Help modal_id="modToolsUnassignedHelp" header="Mod Tools Unassigned" content={helpText} colour="black"></Help></div>
        </div>
        <div className="row">
          <label htmlFor="modTools_unassigned_group_sets" className="col-1 col-form-label">Set</label>
          <div className="col-3">
            <select id="modTools_unassigned_group_sets" className="form-select" aria-label="Group Sets">
              <option value="">Please Select a Set</option>
              {group_sets.map((group_set, index) => {
                return <option key={"modTools_unassigned_group_sets" + index} value={group_set.group_set_id}>{group_set.group_set_name}</option>
              })}   
            </select>
          </div>
          <label htmlFor="modTools_unassigned_primaries" className="col-1 col-form-label">Primary</label>
          <div className="col-3">
            <select id="modTools_unassigned_primaries" className="form-select" aria-label="Primaries">
              <option value="">Please Select a Primary</option>
              {primaries.map((primary, index) => {
                return <option key={"modTools_unassigned_primaries" + index} value={primary.primary_stat}>{primary.primary_stat}</option>
              })}   
            </select>
          </div>
          <div className="col-2 offset-1"><button className="form-control btn btn-primary" onClick={searchUnassigned}>Check</button></div>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Character</th>
              <th scope="col">Slot</th>
              <th scope="col">Best Set</th>
              <th scope="col">Your Set</th>
              <th scope="col">Best Primary</th>
              <th scope="col">Your Primary</th>
            </tr>
          </thead>
          <tbody>
          {characters.map((row, index) => {
              return (
                      <tr key={"modTools_unassigned_table_"+index}>
                        <th scope="row">{row.character_name}</th>
                        <td>{row.slot_name} ({row.slot_long_name})</td>
                        <td>{row.group_set_name}</td>
                        <td>{row.u_group_set_name}</td>
                        <td>{row.primary_stat}</td>
                        <td>{row.u_primary_stat}</td>
                      </tr>
              );
          })} 
          </tbody>
        </table>
      </div>
    )
}