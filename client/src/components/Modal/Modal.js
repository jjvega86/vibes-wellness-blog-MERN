import Modal from "react-bootstrap/Modal";
//TODO: Create a multi use modal component. Eventually a custom modal Hook (useModal)
const Modal = (props) => {
  return (
    <>
      <button onClick={showModal}>Display Modal</button>
    </>
  );
};

export default Modal;
