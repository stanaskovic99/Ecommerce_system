import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Popup from "../components/Popup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, loginByToken } from "../actions/auth";
import { getLocalStorage } from "../utils/localStorage";
import { getSessionStorage } from "../utils/sessionStorage";

const Login = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    let user = getLocalStorage("user");
    if (!user) {
      user = getSessionStorage("user");
    }
    if (user) {
      props.loginByToken();
    }
  }, []);

  const onLoginClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.rememberMe = formDataObj.rememberMe == "on" ? true : false;
    props.login(
      formDataObj.usernameEmail,
      formDataObj.password,
      formDataObj.rememberMe
    );
    setShowPopover(true);
  };

  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center vh-100 login">
      <Form
        className="text-bg-light p-3 shadow-lg rounded row form-login"
        onSubmit={onLoginClick}
      >
        <h1 className="text-center text-uppercase col col-12 mb-4">Prijava</h1>
        <Form.Group className="mb-3 col col-12">
          <Form.Label>Email ili korisniko ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi email ili korisničko ime."
            name="usernameEmail"
          />
        </Form.Group>
        <Form.Group className="mb-3 col col-12">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type="password"
            placeholder="Unesi lozinku."
            name="password"
          />
        </Form.Group>
        <div className="col col-12">
          <div className="row row-cols-2 gx-0">
            <Form.Group className="mb-3 col">
              <Form.Check
                type="checkbox"
                label="Zapamti me"
                name="rememberMe"
              />
            </Form.Group>
            <Link
              to={"/forgot-password"}
              className="mb-3 col text-end text-secondary text-decoration-none"
            >
              Zaboravili ste lozinku ?
            </Link>
          </div>
        </div>
        <div className="col col-12">
          <Button className="w-100" type="submit">
            Prijavi se
          </Button>
        </div>
      </Form>

      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

export default connect(null, {
  login,
  loginByToken,
})(Login);
