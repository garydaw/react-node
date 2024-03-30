import { useState } from 'react';
import axios from 'axios';
import { useLoading } from './LoadingContext';
import { useError } from './ErrorContext';

export default function RoteOperations() {
  const [operations, setOperations] = useState([]);
  const [ally, setAlly] = useState([]);
  const [swap, setSwap] = useState([]);
  const [path, setPath] = useState("");
  const [phase, setPhase] = useState("");
  const { showLoading, hideLoading } = useLoading();
  const { showError } = useError();
  const [viewByAlly, setViewByAlly] = useState(false);

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
    const this_path = document.getElementById("rote_operations_path").value
    const this_phase = document.getElementById("rote_operations_phase").value
    setPath(this_path);
    setPhase(this_phase);
  
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "rote/operation/" + this_path + "/" + this_phase, {headers})
        .then((res) => {
            
          setValues(res.data);
        });
  }

  const setValues = (data) => {
    setOperations(data.operations);
    setAlly(data.ally);
    setSwap(data.swaps)
  }

  const handleViewChange = () => {
    setViewByAlly(!viewByAlly); 
  };

  const groupedData = {};

  ally.forEach(item => {
    if (!groupedData[item.label_ally_name]) {
      groupedData[item.label_ally_name] = {};
    }
    if (!groupedData[item.label_ally_name][item.operation]) {
      groupedData[item.label_ally_name][item.operation] = [];
    }
    groupedData[item.label_ally_name][item.operation].push(item.character_name);
  });

  const swapData = {};

  swap.forEach(item => {
    if (!swapData[item.character_name]) {
      swapData[item.character_name] = [];
    }
    swapData[item.character_name].push({"ally_name":item.ally_name,"ally_code":item.ally_code});
    
  });

  const swapHandler = (event) => {
    const data = event.target.dataset;

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    let postObj = {};
    postObj.path = path;
    postObj.phase = phase;
    postObj.operation = parseInt(data.operation, 10) + 1;
    postObj.team_index = data.teamindex;
    postObj.ally_code = document.getElementById("rote_swap_"+data.operation+"_"+data.teamindex).value;

    axios
        .put(process.env.REACT_APP_API_URL + "rote/operation/swap", postObj, {headers})
        .then((res) => {
            
          setValues(res.data);
          hideLoading();
        })
        .catch(error => {
          hideLoading();
          showError(error.response.data.error);
        })
  };

  //does user have access to admin
  const access = localStorage.getItem("access");

  const allocateOperation = () => {
    showLoading("Calculating Allocations.");
    //const path = document.getElementById("rote_operations_path").value;
    //const phase = document.getElementById("rote_operations_phase").value;

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "rote/operation/allocate/" + path + "/" + phase, {headers})
        .then((res) => {
            
          setValues(res.data);
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
        <div className="col-md-2">
          <button type="button" className="btn btn-primary" onClick={viewOperation}>View</button>
        </div>
        {operations.length > 0 && access === "1" &&
          <>
            <div className="col-md-2 form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="roteViewType"  checked={viewByAlly} onChange={handleViewChange}/>
              <label className="form-check-label" htmlFor="roteViewType">View by Ally</label>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary" onClick={allocateOperation}>Auto Allocate</button>
            </div>
          </>
        }
      </div>

      {viewByAlly ? (
      
        <div>
          {Object.keys(groupedData).map((allyName, index) => (
            <div key={index}className="card-body border mt-3">
              <h3>{allyName}</h3>
              {Object.keys(groupedData[allyName]).map((operation, idx) => (
                <div key={idx}>
                  <h5>Operation {operation}</h5>
                  <div className="row">
                    {groupedData[allyName][operation].map((characterName, ind) => (
                      <div key={ind} className="col-6 col-md-4 col-lg-2 pe-3 pb-3 ">{characterName}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) :
      <div className="row">
        {operations.map((operation, index) => {
          return (
          <div className="card-body border mt-3">
            <h3>Operation {index + 1}</h3>
            {arrayOfRows.map((row, arrarRowindex) => {
            return (
              <div key={"RoteOperation_"+arrarRowindex} className="row row-cols-6">
                
                {row.map((team_index, rowindex) => {
                  
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
                                {access === "1" && operation[team_index].ally_name === null && swapData[operation[team_index].character_name] &&
                                  <div>
                                    <select id={"rote_swap_"+index+"_"+team_index}>
                                      {swapData[operation[team_index].character_name].map((allies, ally_index) => {
                                        return (<option key={ally_index} value={allies.ally_code}>{allies.ally_name}</option>)
                                      })}
                                    </select>
                                    <button data-operation={index}
                                            data-teamindex={team_index}
                                            className="btn btn-primary"
                                            onClick={swapHandler}>Swap</button>
                                  </div>
                                }
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
      }
    </div>
  );
}