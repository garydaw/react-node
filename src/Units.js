import UnitOverview from './UnitOverview'

function Units(props) {

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center">
                <h6>Search</h6>
                <i className="bi bi-gear" data-bs-toggle="modal" data-bs-target={"#unitConfigModal" + props.unitType}></i>
            </div>
            <div>Fliters to be added</div>
            <div className="row row-cols-3">
              {props.unitData.map((unit, index) => {
                return (
                    <UnitOverview unit={unit} key={unit.base_id}></UnitOverview>
                );
              })}
          </div>

          <div className="modal fade" id={"unitConfigModal" + props.unitType} tabIndex="-1" aria-labelledby={"unitConfigModal" + props.unitType + "Label"} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={"unitConfigModal" + props.unitType + "Label"}>Unit Config</h5>
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

export default Units;