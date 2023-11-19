export default function Help ({ modal_id, header, content, colour }) {
  
    return (
        <div>
          <i className={"bi bi-question-circle text-"+colour} data-bs-toggle="modal" data-bs-target={"#" + modal_id}></i>
          <div className="modal fade" id={modal_id} tabIndex="-1" aria-labelledby={modal_id + "Label"} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={modal_id + "Label"}>{header}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {content}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  };