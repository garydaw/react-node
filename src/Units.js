import { useState } from 'react';
import UnitOverview from './UnitOverview'

export default function Units({unitType, unitData}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUnits = unitData.filter(unit =>
    unit.character_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="p-3">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <input type="text"
                    id={unitType+"_search"}
                    className="form-control w-25"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="Search"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <i className="bi bi-gear" data-bs-toggle="modal" data-bs-target={"#unitConfigModal" + unitType}></i>
          </div>
          <div className="row row-cols-4">
            {filteredUnits.map((unit, index) => {
              return (
                  <UnitOverview unit={unit} key={unit.base_id}></UnitOverview>
              );
            })}
        </div>

        <div className="modal fade" id={"unitConfigModal" + unitType} tabIndex="-1" aria-labelledby={"unitConfigModal" + unitType + "Label"} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"unitConfigModal" + unitType + "Label"}>Unit Config</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                This will allow you to show or hide unit attributes.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
}