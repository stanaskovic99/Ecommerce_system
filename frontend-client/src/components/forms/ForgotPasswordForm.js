import { React, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Popup from "../Popup";

const ForgotPasswordForm = (props) => {
  const onSendClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.forgotPassword(formDataObj);
    props.setShowPopover(true);
    props.setShowForm("changePassword");
  };

  return (
    <div className="container-login-auth text-bg-light p-3 shadow-lg rounded">
      <div className="text-center icon-forgot-pass mb-3">
        <LockResetOutlinedIcon fontSize="large w-100 h-100" />
      </div>

      <Form onSubmit={onSendClick}>
        <Form.Group className="mb-3">
          <Form.Label>
            Unesite email adresu vašeg naloga i privremena lozinka će biti
            poslata putem email-a. <br /> Nakon toga će te biti proslijeđeni na
            stranicu za resetovanje lozinke.
            <br />
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi email"
            name="email"
            className="text-center"
          />
        </Form.Group>

        <Button className="mb-2 w-100" type="submit">
          Potvrdi
        </Button>
      </Form>
      <hr className="dropdown-divider" />
      <div className="text-end">
        <div
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => props.setShowForm("login")}
        >
          Nazad
        </div>
      </div>

      <Popup
        showPopover={props.showPopover}
        setShowPopover={props.setShowPopover}
      />
    </div>
  );
};

export default connect(null, { forgotPassword })(ForgotPasswordForm);
