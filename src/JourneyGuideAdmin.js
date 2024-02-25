import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function JourneyGuide({guides, getGuides}) {
    const [currentBaseID, setCurrentBaseID] = useState("");
    const [currentCharacterName, setCurrentCharacterName] = useState("");
    const [currentGuide, setCurrentGuide] = useState("");
    const [nonGuideUnits, setNonGuideUnits] = useState([]);
    
    useEffect(() => {

        getNonGuideUnits();
        
    }, []);


    const getNonGuideUnits = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "journeyGuide/nonGuideUnits/", {headers})
            .then((res) => {
                
                setNonGuideUnits(res.data);
            });
    }

    const getJourneyGuide = () => {
        const base_id = document.getElementById("jg_admin_existing").value;
        for(var i = 0; i < guides.length; i++){
            if(guides[i].base_id === base_id){
                setCurrentBaseID(guides[i].base_id);
                setCurrentCharacterName(guides[i].character_name);
                setCurrentGuide(guides[i].guide);
                break;
            }
        }
    }

    const addJourneyGuide = () => {
        const base_id = document.getElementById("jg_admin_new").value;
        for(var i = 0; i < nonGuideUnits.length; i++){
            if(nonGuideUnits[i].base_id === base_id){
                setCurrentBaseID(nonGuideUnits[i].base_id);
                setCurrentCharacterName(nonGuideUnits[i].character_name);
                setCurrentGuide("");
                break;
            }
        }
    }

    const saveJourneyGuide = async() => {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        };
      
        let postObj = {};
        postObj.base_id = currentBaseID;
        postObj.character_name = currentCharacterName;
        postObj.guide = currentGuide;

        axios.post(process.env.REACT_APP_API_URL + "journeyGuide/", postObj, {headers})
            .then(response => {
                setCurrentBaseID("");
                setCurrentCharacterName("");
                setCurrentGuide("");
                getGuides();
                getNonGuideUnits();
                
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <div className="input-group">
                        <span className="input-group-text">Existing</span>
                        <select id="jg_admin_existing" className="form-select" aria-label="Existing">
                            <option value="">Please Select</option>
                            {guides.map((item, index) => {
                                return <option key={"jg_existing_" + item.base_id} value={item.base_id}>{item.character_name}</option>
                            })}   
                        </select>
                        <button className="btn btn-primary" onClick={getJourneyGuide}>Load</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group">
                        <span className="input-group-text">New</span>
                        <select id="jg_admin_new" className="form-select" aria-label="New">
                            <option value="">Please Select</option>
                            {nonGuideUnits.map((item, index) => {
                                return <option key={"jg_new_" + item.base_id} value={item.base_id}>{item.character_name}</option>
                            })}   
                        </select>
                        <button className="btn btn-primary" onClick={addJourneyGuide}>Add</button>
                    </div>
                </div>
            </div>
            {currentBaseID !== "" &&
                <div>
                    <h4>{currentCharacterName}</h4>
                    <ReactQuill theme="snow" value={currentGuide} onChange={setCurrentGuide}/>
                    <button className="btn btn-primary" onClick={saveJourneyGuide}>Save</button>
                </div>
            }
        </div>
    )
}