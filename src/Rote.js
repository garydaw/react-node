import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import RoteUnitOverview from './RoteUnitOverview';

export default function Rote() {
    const [units, setUnits] = useState([]);
    const [playerUnits, setPlayerUnits] = useState([]);
    
    useEffect(() => {

        getUnits();
        
    }, []);


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
        const base_id = document.getElementById("rote_units").value;
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
        <div>
            <div className="row">
                <div className="col-4">
                    <div className="input-group">
                        <span className="input-group-text">Units</span>
                        <select id="rote_units" className="form-select" aria-label="Units">
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
    )
}