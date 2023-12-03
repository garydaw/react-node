import { useState } from 'react';
import { useLoading } from './LoadingContext';
import Help from './Help';

const apiUrl = 'http://localhost:5000/api/';

export default function ModToolsUnassigned({ally_code, dates, slots, group_sets, primaries, renderSelect}) {

    const [characters, setCharacters] = useState([]);
    const { isLoading, showLoading, hideLoading } = useLoading();
    const helpText = "Helps you assign your unassigned mods to unit that matches 'Best Mod (GAC - Kyber)' from swgoh.gg."

    const searchUnassigned = async () => {
      
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

    const setPrimary = (event) => {
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

          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text">Date</span>
              {renderSelect(dates, "modTools_unassigned_date", "Date", "date", "formatted")}
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text">Slot</span>
              <select id="modTools_unassigned_slot" className="form-select" aria-label="Slot" onChange={setPrimary}>
                <option value="">Please Select</option>
                {slots.map((slot, index) => {
                  return <option key={"modTools_unassigned_slot" + index} value={slot.slot_id}>{slot.slot_name} ({slot.slot_long_name})</option>
                })}   
              </select>
            </div>
          </div>

          <div className="col-4 d-none d-lg-flex form-check justify-content-between align-items-center">
            <div className="ms-3">
              <input className="form-check-input" type="checkbox" id="modTools_unassigned_include_assigned"/>
              Included Assigned
            </div>
            <div className="pe-3">
              <Help modal_id="modToolsUnassignedHelp" header="Mod Tools Unassigned" content={helpText} colour="black"></Help>
            </div>
          </div>
        </div>

        <div className="row pb-2">

          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text">Set</span>
              {renderSelect(group_sets, "modTools_unassigned_group_sets", "Group Sets", "group_set_id", "group_set_name")}
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-4">
            <div className="input-group">
              <span className="input-group-text">Primary</span>
              {renderSelect(primaries, "modTools_unassigned_primaries", "Primaries", "primary_stat", "primary_stat")}
            </div>
          </div>

          <div className="col-4 d-none d-lg-block"><button className="btn btn-primary" onClick={searchUnassigned}>Check</button></div>
        </div>

        <div className="row">

          <div className="col-12 col-md-6 d-flex d-lg-none form-check justify-content-between align-items-center">
            <div className="ms-3">
              <input className="form-check-input" type="checkbox" id="modTools_unassigned_include_assigned"/>
              Included Assigned
            </div>
            <div className="pe-3">
              <Help modal_id="modToolsUnassignedHelp" header="Mod Tools Unassigned" content={helpText} colour="black"></Help>
            </div>
          </div>
          <div className="col-12 col-md-6 d-lg-none"><button className="btn btn-primary" onClick={searchUnassigned}>Check</button></div>
        </div>

        <div className="table-responsive">
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
      </div>
    )
}