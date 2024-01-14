import { React, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createStatus } from "../actions/status ";
import Menu from "../components/Menu";
import Popup from "../components/Popup";

const NewStatus = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  const submitStatus = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.createStatus(formDataObj.name, formDataObj.color);
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Novi artikal</h4>
          </div>
          <Card className="mt-4">
            <Form className="m-2 " onSubmit={submitStatus}>
              <div className="row row-cols-auto">
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">Ime</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Unesi ime"
                    name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">Boja</Form.Label>
                  <Form.Control
                    size="sm"
                    type="color"
                    defaultValue="#563d7c"
                    title="Odaberi boju"
                    name="color"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="button-form-size col align-self-end"
                >
                  Predaj
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

export default connect(null, { createStatus })(NewStatus);
