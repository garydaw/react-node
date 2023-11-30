import { useState } from 'react';
import UnitOverview from './UnitOverview'
import UnitDetails from './UnitDetails'
import Help from './Help';

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

export default function Units({ally_code, unitType, unitData}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setDetailsToggle] = useState(false);
  const [unitDetails, setUnitDetail] = useState({});
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
    const data = await (await fetch(apiUrl + "player/" + ally_code + '/unit/' + this_unit.base_id)).json();
    setUnitDetail(data);
  };

  const closeDetails = () => {
    setDetailsToggle(false);
  };

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
            <Help modal_id={unitType+"Help"} header={unitType} content={helpText} colour="black"></Help>
          </div>
          <div className="row">
            {filteredUnits.map((unit, index) => {
              return (
                  <UnitOverview unit={unit} key={unit.base_id} openDetails={openDetails}></UnitOverview>
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