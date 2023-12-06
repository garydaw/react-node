import { useState } from 'react';
import { useLoading } from './LoadingContext';
import Help from './Help';

export default function ModToolsPrimary({ally_code, dates, renderSelect}) {

    const [mismatches, setMismatches] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const helpText = "Checks you primary stat against the 'Best Mod (GAC - Kyber)' from swgoh.gg."

    let getPrimaryMismatch = async () => {
      
        showLoading("Checking mis-match primaries.")
        const date = document.getElementById("modTools_primary_date").value;

        //get data
        const data = await (await fetch(process.env.REACT_APP_API_URL + "mod/checkprimary/" + ally_code + "/" + date)).json();
        hideLoading();
        setMismatches(data);
    }
    
    if(dates.length === 0)
      return "";
    return (
      <div className="pt-3">
        <div className="row">
          <div className='col-11 col-md-8 col-lg-5'>
            <div className="input-group">
              <span className="input-group-text">Date</span>
              {renderSelect(dates, "modTools_primary_date", "Date", "date", "formatted")}
              <button className="btn btn-primary" onClick={getPrimaryMismatch}>Check</button>
            </div>
          </div>
          <div className="col-1 offset-md-3 offset-lg-6 float-end"><Help modal_id="modToolsPrimaryHelp" header="Mod Tools Primary" content={helpText} colour="black"></Help></div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Character</th>
                <th scope="col">Slot</th>
                <th scope="col">Your Set</th>
                <th scope="col">Best Primary</th>
                <th scope="col">Your Primary</th>
              </tr>
            </thead>
            <tbody>
            {mismatches.map((row, index) => {
                return (
                        <tr key={"modTools_primary_table_" + index}>
                            <th scope="row">{row.character_name}</th>
                            <td>{row.slot_name} ({row.slot_long_name})</td>
                            <td>{row.mod_set}</td>
                            <td>{row.best_primary}</td>
                            <td>{row.mod_primary}</td>
                        </tr>
                )
            })} 
            </tbody>
          </table>
        </div>
      </div>
    )
}