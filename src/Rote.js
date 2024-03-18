import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import RoteUnitOverview from './RoteUnitOverview';
import RoteOperations from './RoteOperations';
import RoteAdmin from './RoteAdmin';

export default function Rote() {
    const [activeContent, setActiveContent] = useState("rote_units");
    const [units, setUnits] = useState([]);
    const [playerUnits, setPlayerUnits] = useState([]);
    
    useEffect(() => {

        getUnits();
        
    }, []);

    let swapContent =  (event) => {
        setActiveContent(event.target.id);
    }

    //does user have access to admin
    const access = localStorage.getItem("access");

    const getUnits = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "rote/units/", {headers})
            .then((res) => {
                
                setUnits(res.data);
            });
    }

    
    const getGuildUnits = async() => {
        setPlayerUnits([]);
        const base_id = document.getElementById("rote_units_select").value;
        if(base_id !== ""){
            
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            };
            axios
                .get(process.env.REACT_APP_API_URL + "rote/units/" + base_id, {headers})
                .then((res) => {
                    
                    setPlayerUnits(res.data);
                });
        }
    }

    return (
        <div className="p-0">
            <div className="row">
                <div className="col-4 col-md-3 col-lg-2">
                    <div className="list-group">
                        <button type="button"
                            id="rote_units"
                            className={activeContent === "rote_units" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Units
                        </button>
                        <button type="button"
                            id="rote_operations"
                            className={activeContent === "rote_operations" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Operations
                        </button>
                        {access === "1" && 
                            <button type="button"
                                id="rote_admin"
                                className={activeContent === "rote_admin" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                onClick={swapContent}
                                aria-current="true">
                                    Admin
                            </button>
                        }
                    </div>
                </div>

                <div className="col-8 col-md-9 col-lg-10">
                
                    <div id="rote_units_content" className={activeContent === "rote_units" ? "d-show" : "d-none"}>
                        <div className="row pt-3 pb-3">
                            <div className="col-4">
                                <div className="input-group">
                                    <span className="input-group-text">Units</span>
                                    <select id="rote_units_select" className="form-select" aria-label="Units">
                                        <option value="">Please Select</option>
                                        {units.map((item, index) => {
                                            return <option key={"rote_unit_" + item.base_id} value={item.base_id}>{item.character_name}</option>
                                        })}   
                                    </select>
                                    <button className="btn btn-primary" onClick={getGuildUnits}>Check Guild</button>
                                </div>
                            </div>
                        </div>
                        {playerUnits.length !== 0 &&
                            <div className="row">
                                {playerUnits.map((unit, index) => {
                                return (
                                    <RoteUnitOverview unit={unit} key={"rote_unit"+unit.ally_code}></RoteUnitOverview>
                                );
                                })}
                            </div>
                        }

                    </div>

                    <div id="rote_operations_content" className={activeContent === "rote_operations" ? "d-show" : "d-none"}>
                        <RoteOperations></RoteOperations>
                    </div>

                    <div id="rote_admin_content" className={activeContent === "rote_admin" ? "d-show" : "d-none"}>
                        <RoteAdmin unitData={units}></RoteAdmin>
                    </div>

                </div>
            </div>
        </div>
    )
}