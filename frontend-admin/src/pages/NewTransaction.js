import { React, useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import { createTransaction } from "../actions/transactions";

const NewTransaction = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  const submitTransaction = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let formDataObj = Object.fromEntries(formData.entries());
    props.createTransaction(
      formDataObj.description,
      formDataObj.amount,
      formDataObj.date
    );
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div>
            <h4>Nova transakcija</h4>
          </div>
          <Card className="mt-4">
            <Form
              className="m-2 row row-cols-1 row-cols-xl-3 row-cols-lg-2"
              onSubmit={submitTransaction}
            >
              <Form.Group className="mb-3 col" controlId="form-name">
                <Form.Label className="form-input-title">Opis</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  placeholder="Unesi opis"
                  name="description"
                  className="desc-area"
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label className="form-input-title">Total</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Unesi total"
                  name="amount"
                />
              </Form.Group>
              <Form.Group className="mb-3 col">
                <Form.Label className="form-input-title">
                  Datum transakcije
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  placeholder="Unesi datum transakcije"
                  name="date"
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

export default connect(null, { createTransaction })(NewTransaction);
