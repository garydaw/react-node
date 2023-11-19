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
                setActiveContent("jg_"+res.data[0].base_id)
            });
        
    }, []);

    return (
        <div className="container p-0">
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        {guides.map((guide, index) => {
                            return (
                                <button type="button"
                                    key={"jg_" + guide.base_id}
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
                <div className="col-10">
                    {guides.map((guide, index) => {
                        return (
                            <div key={"jg_" + guide.base_id + "content"} 
                                id={"jg_" + guide.base_id + "content"} 
                                className={activeContent === "jg_"+guide.base_id ? "d-show" : "d-none"}
                                dangerouslySetInnerHTML={{__html: guide.guide}}>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}