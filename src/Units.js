import UnitOverview from './UnitOverview'

function Units(props) {

    return (
        <div className="row row-cols-3">
        {props.unitData.map((unit, index) => {
          return (
              <UnitOverview unit={unit} key={unit.base_id}></UnitOverview>
          );
        })}
      </div>
        );
}

export default Units;