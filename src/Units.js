import { useState } from 'react';
import UnitOverview from './UnitOverview'
import UnitDetails from './UnitDetails'
import Help from './Help';

export default function Units({ally_code, unitType, unitData}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setDetailsToggle] = useState(false);
  const [unitDetails, setUnitDetail] = useState({});
  const [unitImage, setUnitImage] = useState(false);
  const helpText = "Search for "+unitType+" based on name, role or category, click on details for more information."
  
  const filteredUnits = unitData.filter(unit =>
    unit.character_name.toLowerCase().includes(searchTerm.toLowerCase())
    ||
    unit.role.toLowerCase().includes(searchTerm.toLowerCase())
    ||
    unit.categories.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDetails = async (this_unit) => {
    setDetailsToggle(true);
    const token = localStorage.getItem('token');
    const data =  await (await fetch(process.env.REACT_APP_API_URL + "player/" + ally_code + '/unit/' + this_unit.base_id, 
                                    {
                                      method: 'GET',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token,
                                      },
                                    })).json();
    setUnitDetail(data);
  };

  const closeDetails = () => {
    setDetailsToggle(false);
  };

  const changeUnitImage = () => {
    setUnitImage(!unitImage);
  }

  return (
      <div className="p-3">
        <div className={showDetails ? 'd-none' : 'd-block' }>
          <div className="d-flex justify-content-between align-items-center pb-3">
            <input type="text"
                    id={unitType+"_search"}
                    className="form-control w-25"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="Search"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <div className="ms-3">
              <input className="form-check-input" type="checkbox" id="unit_details_checkbox" onChange={(e) => changeUnitImage()}/>
              Image/Stats
            </div>
            <Help modal_id={unitType+"Help"} header={unitType} content={helpText} colour="black"></Help>
          </div>
          <div className="row">
            {filteredUnits.map((unit, index) => {
              return (
                  <UnitOverview unit={unit} key={unit.base_id} openDetails={openDetails} unitImage={unitImage}></UnitOverview>
              );
            })}
          </div>
        </div>

        <div className={showDetails ? 'd-block' : 'd-none' }>
          <UnitDetails unitDetails={unitDetails} closeDetails={closeDetails}></UnitDetails>
        </div>

      </div>
    );
}