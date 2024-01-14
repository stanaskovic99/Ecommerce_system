import { React } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createUser } from "../../actions/users";
import Popup from "../Popup";

const RegistrationForm = (props) => {
  const onSubmitClick = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.createUser(formDataObj, props.ongoingOrder);
    props.setShowPopover(true);
  };

  return (
    <div className="container-registration text-bg-light p-3 shadow-lg rounded">
      <Form onSubmit={onSubmitClick}>
        <h1 className="text-center text-uppercase">Registracija</h1>
        <div className="row">
          <Form.Group className="mb-3 col col-reg-2">
            <Form.Label className="form-input-title">Ime</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi ime"
              name="firstName"
            />
          </Form.Group>
          <Form.Group className="mb-3 col col-reg-2">
            <Form.Label className="form-input-title">Prezime</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi prezime"
              name="lastName"
            />
          </Form.Group>
        </div>
        <div className="row row-cols-1 row-cols-xl-2">
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Unesi email"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3 col">
            <Form.Label className="form-input-title">Korisničko ime</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Unesi korisničko ime"
              name="username"
            />
          </Form.Group>
        </div>
        <div className="row">
          <Form.Group className="mb-3 col col-reg-2">
            <Form.Label className="form-input-title">Lozinka</Form.Label>
            <Form.Control
              size="sm"
              type="password"
              placeholder="Lozinka"
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3  col col-reg-2">
            <Form.Label className="form-input-title">
              Potvrda lozinke
            </Form.Label>
            <Form.Control
              size="sm"
              type="password"
              placeholder="Ponovi lozinku"
              name="confirmPassword"
            />
          </Form.Group>
        </div>

        <Button className="mb-2 w-100 mt-2" type="submit">
          Potvrdi
        </Button>
      </Form>
      <hr className="dropdown-divider" />
      <div className="text-center">
        Već si registrovana?
        <div
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => props.setShowForm("login")}
        >
          Prijavi se
        </div>
      </div>

      <Popup
        showPopover={props.showPopover}
        setShowPopover={props.setShowPopover}
      />
    </div>
  );
};

export default connect(null, { createUser })(RegistrationForm);
