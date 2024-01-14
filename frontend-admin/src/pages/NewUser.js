import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createUser } from "../actions/users";
import Menu from "../components/Menu";
import Popup from "../components/Popup";

const NewUser = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const submitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.createUser(
      formDataObj.email,
      formDataObj.password,
      formDataObj.username,
      formDataObj.isAdmin,
      formDataObj.firstName,
      formDataObj.lastName
    );
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="ms-1 mb-3">
            <h4>Kreiranje Korisnika</h4>
          </div>
          <Card className="mt-4">
            <Form
              className="m-2 row row-cols-1 row-cols-xl-3 row-cols-lg-2"
              onSubmit={submitUser}
            >
              <Form.Group className="mb-3  col">
                <Form.Label className="form-input-title">Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Unesi email"
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3  col">
                <Form.Label className="form-input-title">
                  Korisničko ime
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi korisničko ime"
                  name="username"
                />
              </Form.Group>
              <Form.Group className="mb-3  col">
                <Form.Label className="form-input-title">Lozinka</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder="Unesi lozinku"
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3  col">
                <Form.Label className="form-input-title">Ime</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi ime"
                  name="firstName"
                />
              </Form.Group>
              <Form.Group className="mb-3  col">
                <Form.Label className="form-input-title">Prezime</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi prezime"
                  name="lastName"
                />
              </Form.Group>
              <Form.Group className="mb-3 col col-auto mt-auto">
                <Form.Label className="form-input-title">
                  Admin prava
                </Form.Label>
                <div className="d-flex">
                  <Form.Check
                    size="sm"
                    type="radio"
                    label="Ne"
                    name="isAdmin"
                    className="me-4"
                    value={false}
                    defaultChecked
                  />
                  <Form.Check
                    size="sm"
                    type="radio"
                    label="Da"
                    name="isAdmin"
                    value={true}
                  />
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="button-form-size align-self-end"
              >
                Predaj
              </Button>
            </Form>
          </Card>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};
export default connect(null, { createUser })(NewUser);
