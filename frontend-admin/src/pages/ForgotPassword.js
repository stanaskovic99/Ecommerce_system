import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popup from "../components/Popup";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/auth";
import { changePassword } from "../actions/users";

const ForgotPassword = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [showForm, setShowForm] = useState("forgotPassword");

  const onSendEmailClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.forgotPassword(formDataObj);
    setShowPopover(true);
  };

  useEffect(() => {
    if (props.user?.isAdmin) {
      setShowForm("changePassword");
    }
  }, [props.user]);

  const onSendClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.changePassword(
      props.user._id,
      formDataObj.newPassword,
      formDataObj.confirmNewPassword,
      formDataObj.oldPassword,
      true,
      props.user.email
    );
    setShowPopover(true);
  };

  const forgotPasswordForm = () => {
    return (
      <Form
        className="text-bg-light p-3 shadow-lg rounded row form-forgot-pass"
        onSubmit={onSendEmailClick}
      >
        <Form.Group className="mb-2 col col-12">
          <Form.Label>
            Unesite email adresu vašeg naloga i privremena lozinka će biti
            poslata putem email-a. Nakon toga će te biti proslijeđeni na
            stranicu za resetovanje lozinke.
            <br />
          </Form.Label>
          <Form.Control type="text" name="email" className="text-center" />
        </Form.Group>
        <div className="col col-12">
          <Button className="w-100" type="submit">
            Prijavi se
          </Button>
        </div>
        <div className="text-end mt-2">
          <div
            className="btn btn-outline-primary btn-sm ms-2"
            onClick={() => (window.location.href = "/")}
          >
            Nazad
          </div>
        </div>
      </Form>
    );
  };

  const changePasswordForm = () => {
    return (
      <Form
        onSubmit={onSendClick}
        className="text-bg-light p-3 shadow-lg rounded row form-forgot-pass"
      >
        <Form.Group className="mb-3 col col-12">
          <Form.Label>Privremena lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Privremena lozinka"
            name="oldPassword"
          />
        </Form.Group>

        <Form.Group className="mb-2 col col-12">
          <Form.Label>Nova lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nova lozinka"
            name="newPassword"
          />
        </Form.Group>
        <Form.Group className="mb-3 col col-12">
          <Form.Control
            type="password"
            placeholder="Ponovi novu lozinku"
            name="confirmNewPassword"
          />
        </Form.Group>
        <div className="col col-12">
          <Button className="mb-2 w-100" type="submit">
            Potvrdi
          </Button>
        </div>
      </Form>
    );
  };

  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center vh-100 login">
      {showForm === "forgotPassword" && forgotPasswordForm()}
      {showForm === "changePassword" && changePasswordForm()}
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: Object.values(state.users)[0] };
};

export default connect(mapStateToProps, { forgotPassword, changePassword })(
  ForgotPassword
);
