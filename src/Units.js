import { useState } from 'react';
import UnitOverview from './UnitOverview'
import UnitDetails from './UnitDetails'

//to change to env vars
const apiUrl = 'http://localhost:5000/api/';

export default function Units({ally_code, unitType, unitData}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [unit, setUnit] = useState({});
  const [unitDetails, setUnitDetail] = useState({});
  
  const filteredUnits = unitData.filter(unit =>
    unit.character_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const openModal = async (this_unit) => {
    setUnit(this_unit);
    setShowModal(true);
    const data = await (await fetch(apiUrl + "player/" + ally_code + '/unit/' + this_unit.base_id)).json();
    setUnitDetail(data);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
                  <UnitOverview unit={unit} key={unit.base_id} openModal={openModal}></UnitOverview>
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

        
        <div className="modal" style={{ display: showModal ? 'block' : 'none' }} id={"unitDetailModal" + unitType} tabIndex="-1" aria-labelledby={"unitDetailModal" + unitType + "Label"} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"unitDetailModal" + unitType + "Label"}>{unit.character_name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <UnitDetails unit={unit}></UnitDetails>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
}