import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import JourneyGuideAdmin from './JourneyGuideAdmin'

export default function JourneyGuide() {
    const [activeContent, setActiveContent] = useState("");
    const [guides, setGuides] = useState([]);
    
    //does user have access to admin
    const access = localStorage.getItem("access");

    let swapContent =  (event) => {
        setActiveContent(event.target.id);
      }

    useEffect(() => {

        getGuides();
        
    }, []);

    const getGuides = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };
        axios
            .get(process.env.REACT_APP_API_URL + "journeyGuide/", {headers})
            .then((res) => {
                
                setGuides(res.data);
                if(res.data.length > 0)
                    setActiveContent("jg_"+res.data[0].base_id)
            });
    }

    return (
        <div className="p-0">
            <div className="row">
                <div className="col-2">
                    <div className="list-group">
                        {access === "1" && <button type="button"
                            key="jg_admin"
                            id="jg_admin"
                            className={activeContent === "jg_admin" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                            onClick={swapContent}
                            aria-current="true">
                                Admin
                        </button>}
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
                <div className="col-10 card-body border">
                    {access === "1" && <div key="jg_admincontent" 
                        id={"jg_admincontent"} 
                        className={activeContent === "jg_admin" ? "d-show" : "d-none"}>
                            <JourneyGuideAdmin guides={guides} getGuides={getGuides}/>
                    </div>}
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