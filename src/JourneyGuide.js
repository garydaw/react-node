import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/';

export default function JourneyGuide({ally_code}) {
    const [activeContent, setActiveContent] = useState("");
    const [guides, setGuides] = useState([]);
    
    let swapContent =  (event) => {
        setActiveContent(event.target.id);
      }

    useEffect(() => {

        axios
            .get(apiUrl + "journeyGuide/")
            .then((res) => {
                
                setGuides(res.data);
            });
        
    }, []);

    return (
        <div className="container p-0">
            <div className="row">
                <div className="col-3">
                    <div className="list-group">
                        {guides.map((guide, index) => {
                            return (
                                <button type="button"
                                    id={"jg_" + guide.base_id}
                                    className={activeContent === "jg_"+guide.base_id ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                    onClick={swapContent}
                                    aria-current="true">
                                        {guide.character_name}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="col-9">
                    {guides.map((guide, index) => {
                        return (
                            <div id={"jg_" + guide.base_id + "content"} className={activeContent === "jg_"+guide.base_id ? "d-show" : "d-none"}>
                                {guide.guide}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}