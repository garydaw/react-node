import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/';

export default function ModToolsPrimary({ally_code}) {

    const [dates, setDates] = useState([]);
    const [mismatches, setMismatches] = useState([]);
    
    useEffect(() => {
      axios
        .get(apiUrl + "mod/dates/")
        .then((res) => {
          setDates(res.data)
        })
    }, []);

    function formatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }

    let getPrimaryMismatch = async () => {
      try {
  
          const date = document.getElementById("modTools_primary_date").value;

          //get data
          const data = await (await fetch(apiUrl + "mod/checkprimary/" + ally_code + "/" + date)).json();
          
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
          <div className="col-4">
          <select id="modTools_primary_date" className="form-select" aria-label="Default select example">
            <option>Open this select menu</option>
            {dates.map((date, index) => {
              return <option value={date.date}>{formatDate(date.date)}</option>
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
              return <tr><th scope="row">{row.character_name}</th><td>{row.slot_long_name} ({row.slot_name})</td><td>{row.best_primary}</td><td>{row.mod_primary}</td></tr>
          })} 
          </tbody>
        </table>
        
      </div>
    )
}