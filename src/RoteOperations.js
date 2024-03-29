import { useState } from 'react';
import axios from 'axios';
import { useLoading } from './LoadingContext';
import { useError } from './ErrorContext';

export default function RoteOperations() {
  const [operations, setOperations] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { showError } = useError();

  //set up 3*5 array to layout the team
  const arrayOfRows = [];
  let counter = 0;
  
  for (let i = 0; i < 3; i++) {
    
    const columnArray = [];
    for (let j = 0; j < 5; j++) {
      columnArray.push(counter);
      counter++;
    }

    arrayOfRows.push(columnArray);
  }
  
  const viewOperation = () => {
    const path = document.getElementById("rote_operations_path").value;
    const phase = document.getElementById("rote_operations_phase").value;

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "rote/operation/" + path + "/" + phase, {headers})
        .then((res) => {
            
          setOperations(res.data);
        });
  }

  //does user have access to admin
  const access = localStorage.getItem("access");

  const allocateOperation = () => {
    showLoading("Calculating Allocations.");
    const path = document.getElementById("rote_operations_path").value;
    const phase = document.getElementById("rote_operations_phase").value;

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "rote/operation/allocate/" + path + "/" + phase, {headers})
        .then((res) => {
            
          setOperations(res.data);
          hideLoading();
        })
        .catch(error => {
          hideLoading();
          showError(error.response.data.error);
        })
  }
  
  return (
    <div className="p-3">
       
      <div className="row">
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">Path</span>
            <select id="rote_operations_path" className="form-select" aria-label="Path">
                <option value="light">Light</option>
                <option value="neutral">Neutral</option>
                <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">Phase</span>
            <select id="rote_operations_phase" className="form-select" aria-label="Phase">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-primary" onClick={viewOperation}>View</button>
        </div>
        {operations.length > 0 && access === "1" &&
          <div className="col-md-3">
            <button type="button" className="btn btn-primary" onClick={allocateOperation}>Auto Allocate</button>
          </div>
        }
      </div>

      <div className="row">
        {operations.map((operation, index) => {
          return (
          <div className="card-body border mt-3">
            <h3>Operation {index + 1}</h3>
            {arrayOfRows.map((row, index) => {
            return (
              <div key={"RoteOperation_"+index} className="row row-cols-6">
                
                {row.map((team_index, index) => {
                  
                  let this_class = "card";
                  if(operation[team_index] !== undefined){
                    if(operation[team_index].ally_code === null){
                      this_class += " bg-danger bg-opacity-75";
                    } else {
                      this_class += " bg-success bg-opacity-25";
                    }
                  }
                  return (
                  <div key={"RoteOperation_card_"+index+"_"+team_index} className="col-6 col-md-4 col-lg-2 pe-3 pb-3 ">
                    <div className={this_class}>
                      <div className="card-body">
                           {operation[team_index] !== undefined && 
                          
                            <div key={"RoteOperation_unit_"+team_index}>
                                <h5>{operation[team_index].character_name}</h5>
                                <p>{operation[team_index].ally_name}</p>
                            </div>
                            
                          }
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            );
            })}
            </div>

        )})}
      </div>
    </div>
  );
}