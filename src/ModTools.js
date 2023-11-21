import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ModToolsPrimary from './ModToolsPrimary';
import ModToolsUnassigned from './ModToolsUnassigned';

const apiUrl = 'http://localhost:5000/api/';



export default function ModTools({ally_code}) {
    const [activeTool, setActiveTool] = useState("modtools_primary");
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

    useEffect(() => {

        axios
            .get(apiUrl + "mod/dates/")
            .then((res) => {
                let new_dates = [];
                for(var d = 0; d < res.data.length; d++){
                    new_dates.push({date: res.data[d].date, formatted: formatDate(res.data[d].date)})
                }
                setDates(new_dates);
            });

        axios
            .get(apiUrl + "mod/slots/")
            .then((res) => {
                setSlots(res.data);
            });

        axios
            .get(apiUrl + "mod/group_sets/")
            .then((res) => {
                setGroupSets(res.data);
            });

        axios
            .get(apiUrl + "mod/primaries/")
            .then((res) => {
                setPrimaries(res.data);
            });
        
    }, []);

   

    return (
        <div className="p-0">
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
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
                    </div>
                </div>
                <div className="col-10">
                    <div id="modtools_primary_content" className={activeTool === 'modtools_primary' ? "d-show" : "d-none"}>
                        <ModToolsPrimary ally_code={ally_code} dates={dates}></ModToolsPrimary>
                    </div>
                    <div id="modtools_set_content" className={activeTool === 'modtools_set' ? "d-show" : "d-none"}>
                        Set
                    </div>
                    <div id="modtools_unassigned_content" className={activeTool === 'modtools_unassigned' ? "d-show" : "d-none"}>
                        <ModToolsUnassigned ally_code={ally_code} dates={dates} slots={slots} group_sets={group_sets} primaries={primaries}></ModToolsUnassigned>
                    </div>
                </div>
            </div>
        </div>
    )
}