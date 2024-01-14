import { React, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { login, loginByToken } from "../../actions/auth";

import { getLocalStorage } from "../../utils/localStorage";
import { getSessionStorage } from "../../utils/sessionStorage";
import Popup from "../Popup";

const LoginForm = (props) => {
  useEffect(() => {
    let user = getLocalStorage("user");
    if (!user) {
      user = getSessionStorage("user");
    }
    if (user) {
      props.loginByToken(user.token, props.ongoingOrder);
    }
  }, []);

  const onLoginClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.login(formDataObj, props.ongoingOrder);
    props.setShowPopover(true);
  };

  return (
    <div className="container-login-auth text-bg-light p-3 shadow-lg rounded">
      <Form onSubmit={onLoginClick}>
        <h1 className="text-center text-uppercase">Prijava</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email ili korisničko ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi email ili korisničko ime"
            name="usernameEmail"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type="password" placeholder="Lozinka" name="password" />
        </Form.Group>
        <Form.Group className="mb-3 position-relative">
          <Form.Check type="checkbox" label="Zapamti me" name="rememberMe" />
          <div
            className="mb-3 text-right position-absolute top-0 end-0 hover-link"
            onClick={() => props.setShowForm("forgotPassword")}
          >
            Zaboravili ste lozinku ?
          </div>
        </Form.Group>

        <Button className="mb-2 w-100" type="submit">
          Potvrdi
        </Button>
      </Form>
      <hr className="dropdown-divider" />
      <div className="text-center">
        Nisi registrovana ?
        <div
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => props.setShowForm("registration")}
        >
          Registruj se
        </div>
      </div>
      <Popup
        showPopover={props.showPopover}
        setShowPopover={props.setShowPopover}
      />
    </div>
  );
};

export default connect(null, { login, loginByToken })(LoginForm);
