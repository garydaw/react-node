import { useState } from 'react';
import { useLoading } from './LoadingContext';
import Help from './Help';

export default function ModToolsSets({ally_code, dates, renderSelect}) {

    const [mismatches, setMismatches] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const helpText = "Checks you mod sets against the 'Best Mod (GAC - Kyber)' from swgoh.gg."

    let getSetMismatch = async () => {
      
        showLoading("Checking mis-match sets.")
        const date = document.getElementById("modTools_set_date").value;

        //get data
        const token = localStorage.getItem('token');
        const data =  await (await fetch(process.env.REACT_APP_API_URL + "mod/checkset/" + ally_code + "/" + date, 
                                        {
                                          method: 'GET',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + token,
                                          },
                                        })).json();
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
                {renderSelect(dates, "modTools_set_date", "Date", "date", "formatted")}
                <button className="btn btn-primary" onClick={getSetMismatch}>Check</button>
              </div>
            </div>
            <div className="col-1 offset-md-3 offset-lg-6 float-end"><Help modal_id="modToolsSetsHelp" header="Mod Tools Sets" content={helpText} colour="black"></Help></div>
        </div>
        <div className="table-responsive">
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
      </div>
    )
}