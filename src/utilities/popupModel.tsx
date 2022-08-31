import Modal from "react-modal";

function PopupModel(props: any) {
  return (
    <Modal
      isOpen={props.modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => props.setIsOpen(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {props.modelContent}
    </Modal>
  );
}

export default PopupModel;
