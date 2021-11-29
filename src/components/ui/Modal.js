import React from "react";
import ReactDom from "react-dom";
import styles from "../../css/Modal.module.css";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseCart}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const backDropPortalElement = document.getElementById('backDrop');
const modalOverlayPortalElement = document.getElementById('modalOverlay');

const Modal = (props) => {
  return(
    <React.Fragment>
      {ReactDom.createPortal(<BackDrop onCloseCart={props.onCloseCart}/>,backDropPortalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,modalOverlayPortalElement)}
    </React.Fragment>
  );
};

export default Modal;
