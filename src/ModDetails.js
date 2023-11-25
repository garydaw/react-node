export default function ModDetails({mod}) {

    const rarityArray = ["-","MK I","MK II", "MK III", "MK IV", "MK V", "MK VI"];
    const tierArray = ["-","E","D","C","B","A"];

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title">{mod.slot_name} ({mod.slot_long_name})</h6>
                    <h6>{mod.primary_stat_value} {mod.primary_stat}</h6>
                </div>
                <div className="row">
                    <div className="col-3">Set : {mod.group_set_name}</div>
                    <div className="col-3">Level : {mod.level}</div>
                    <div className="col-3">Rarity : {rarityArray[mod.rarity]}</div>
                    <div className="col-3">Tier : {tierArray[mod.tier]}</div>
                </div>
                <div className="row">
                    <div className="col-6">{mod.secondary_stat_1_value} {mod.secondary_stat_1}</div>
                    <div className="col-6">{mod.secondary_stat_2_value} {mod.secondary_stat_2}</div>
                </div>
                <div className="row">
                    <div className="col-6">{mod.secondary_stat_3_value} {mod.secondary_stat_3}</div>
                    <div className="col-6">{mod.secondary_stat_4_value} {mod.secondary_stat_4}</div>
                </div>
            </div>
        </div>
    )
}