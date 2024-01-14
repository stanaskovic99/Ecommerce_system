import { React, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { addEmailToNewsletter } from "../actions/newsletters";
import Menu from "../components/Menu";
import Popup from "../components/Popup";

const NewEmail = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  const submitNewsletter = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.addEmailToNewsletter(formDataObj.email, "/newsletter");
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="ms-1 mb-3">
            <h4>Dodaj email</h4>
          </div>
          <Card className="mt-4">
            <Form
              className="m-2 row row-cols-1 row-cols-xl-3 row-cols-lg-2"
              onSubmit={submitNewsletter}
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

export default connect(null, { addEmailToNewsletter })(NewEmail);
