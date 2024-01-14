import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

const Popup = (props) => {
  const showMessage = () => {
    return typeof props.message?.text === "object"
      ? "Neka greška se desila"
      : props.message?.text;
  };

  return (
    <Modal
      show={props.message != null && props.showPopover == true}
      onHide={() => {
        props.setShowPopover(false);
      }}
    >
      <Modal.Header
        closeButton
        className={props.message?.error ? "text-bg-danger" : "text-bg-success"}
      >
        <Modal.Title className="ms-auto">
          {props.message?.error ? "Greška" : "Uspješno"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-6 fw-500 mx-auto scroll">
        {showMessage()}
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return { message: state.message };
};

export default connect(mapStateToProps, null)(Popup);
