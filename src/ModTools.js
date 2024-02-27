import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ModToolsCompare from './ModToolsCompare';
import ModToolsPrimary from './ModToolsPrimary';
import ModToolsUnassigned from './ModToolsUnassigned';
import ModToolsSets from './ModToolsSets';
import ModToolsSpeed from './ModToolsSpeed';

export default function ModTools({ally_code}) {
    const [activeTool, setActiveTool] = useState("modtools_compare");
    const [dates, setDates] = useState([]);
    const [slots, setSlots] = useState([]);
    const [group_sets, setGroupSets] = useState([]);
    const [primaries, setPrimaries] = useState([]);
    
    let swapModTools =  (event) => {
        setActiveTool(event.target.id);
      }

    function formatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }

    const renderSelect = (data, id, label, value, name) => {

      return (
        <select id={id} className="form-select" aria-label={label}>
            <option value="">Please Select</option>
            {data.map((item, index) => {
              return <option key={id + index} value={item[value]}>{item[name]}</option>
            })}   
        </select>
      );
    }

    useEffect(() => {

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "mod/dates/", {headers})
            .then((res) => {
                let new_dates = [];
                for(var d = 0; d < res.data.length; d++){
                    new_dates.push({date: res.data[d].date, formatted: formatDate(res.data[d].date)})
                }
                setDates(new_dates);
            });

        axios
            .get(process.env.REACT_APP_API_URL + "mod/slots/", {headers})
            .then((res) => {
                setSlots(res.data);
            });

        axios
            .get(process.env.REACT_APP_API_URL + "mod/group_sets/", {headers})
            .then((res) => {
                setGroupSets(res.data);
            });

        axios
            .get(process.env.REACT_APP_API_URL + "mod/primaries/", {headers})
            .then((res) => {
                setPrimaries(res.data);
            });
        
    }, []);

   

    return (
        <div className="p-0">
            <div className="row">
                <div className="col-4 col-md-3 col-lg-2">
                    <div className="list-group">
                        <button type="button"
                            id="modtools_compare"
                            className={activeTool === 'modtools_compare' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}
                            aria-current="true">
                                Unit Comparison
                        </button>
                        <button type="button"
                            id="modtools_primary"
                            className={activeTool === 'modtools_primary' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}
                            aria-current="true">
                                Check Primaries
                        </button>
                        <button type="button"
                            id="modtools_set"
                            className={activeTool === 'modtools_set' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}>
                                Check Sets
                        </button>
                        <button type="button"
                            id="modtools_unassigned"
                            className={activeTool === 'modtools_unassigned' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}>
                                Unassigned
                        </button>
                        <button type="button"
                            id="modtools_speed"
                            className={activeTool === 'modtools_speed' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}>
                                Speed
                        </button>
                    </div>
                </div>
                <div className="col-8 col-md-9 col-lg-10">
                    <div id="modtools_compare_content" className={activeTool === 'modtools_compare' ? "d-show" : "d-none"}>
                        <ModToolsCompare ally_code={ally_code}></ModToolsCompare>
                    </div>
                    <div id="modtools_primary_content" className={activeTool === 'modtools_primary' ? "d-show" : "d-none"}>
                        <ModToolsPrimary ally_code={ally_code} dates={dates} renderSelect={renderSelect}></ModToolsPrimary>
                    </div>
                    <div id="modtools_set_content" className={activeTool === 'modtools_set' ? "d-show" : "d-none"}>
                        <ModToolsSets ally_code={ally_code} dates={dates} renderSelect={renderSelect}></ModToolsSets>
                    </div>
                    <div id="modtools_unassigned_content" className={activeTool === 'modtools_unassigned' ? "d-show" : "d-none"}>
                        <ModToolsUnassigned ally_code={ally_code} dates={dates} slots={slots} group_sets={group_sets} primaries={primaries} renderSelect={renderSelect}></ModToolsUnassigned>
                    </div>
                    <div id="modtools_speed_content" className={activeTool === 'modtools_speed' ? "d-show" : "d-none"}>
                        <ModToolsSpeed ally_code={ally_code}></ModToolsSpeed>
                    </div>
                </div>
            </div>
        </div>
    )
}