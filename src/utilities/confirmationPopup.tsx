function ConfirmationPopup(props: any) {
  const {
    setIsConfirmationModelOpen,
    actionFunction,
    callbackData,
    displayText
  } = props;

  return (
    <div className="confirm-model">
      <div className="model-header">
        <h5 className="modal-title center " id="exampleModalLongTitle">
          Are you sure?
        </h5>
      </div>
      <div className="modal-body">{displayText}</div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary confirm-popup-btn"
          onClick={() => actionFunction(callbackData)}
        >
          Confirm
        </button>
        <button
          type="button"
          className="btn btn-secondary confirm-popup-btn"
          onClick={() => setIsConfirmationModelOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
