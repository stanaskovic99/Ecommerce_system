import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import { changePassword } from "../actions/users";

const ChangePassword = (props) => {
  const { id } = props.match?.params;

  useEffect(() => {
    setShowPopover(true);
  }, []);

  const [showPopover, setShowPopover] = useState(false);

  const submitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.changePassword(
      id,
      formDataObj.newPassword,
      formDataObj.confirmNewPassword,
      formDataObj.oldPassword,
      false
    );
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="ms-2 mb-3">
            <h4>Promjena lozinke</h4>
          </div>
          <div className="ms-1 row gx-5 w-100">
            <div className="col col-12 gx-0">
              <Card className="m-2 me-1">
                <Form
                  className="m-2 row row-cols-1 row-cols-md-2 row-cols-xl-3"
                  onSubmit={submitUser}
                >
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Stara lozinka
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      placeholder="Unesi staru lozinku"
                      name="oldPassword"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Nova lozinka
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      placeholder="Unesi novu lozinku"
                      name="newPassword"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Potvrda lozinka
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      placeholder="Potvrdi novu lozinku"
                      name="confirmNewPassword"
                    />
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
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

export default connect(null, { changePassword })(ChangePassword);
