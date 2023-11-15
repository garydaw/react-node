import { useState } from 'react';
import ModToolsPrimary from './ModToolsPrimary';


export default function ModTools({ally_code}) {
    const [activeTool, setActiveTool] = useState("modtools_primary");
    
    let swapModTools =  (event) => {
        setActiveTool(event.target.id);
      }

    return (
        <div className="container p-0">
            <div className="row">
                <div className="col-3">
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
                            id="modtools_where"
                            className={activeTool === 'modtools_where' ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapModTools}>
                                Where?
                        </button>
                    </div>
                </div>
                <div className="col-9">
                    <div id="modtools_primary_content" className={activeTool === 'modtools_primary' ? "d-show" : "d-none"}>
                        <ModToolsPrimary ally_code={ally_code}></ModToolsPrimary>
                    </div>
                    <div id="modtools_set_content" className={activeTool === 'modtools_set' ? "d-show" : "d-none"}>
                        Set
                    </div>
                    <div id="modtools_where_content" className={activeTool === 'modtools_where' ? "d-show" : "d-none"}>
                        Where
                    </div>
                </div>
            </div>
        </div>
    )
}