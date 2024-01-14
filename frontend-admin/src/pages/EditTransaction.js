import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import { fetchTransaction, updateTransaction } from "../actions/transactions";
import { stringUtcToLocalDateTimeString } from "../utils/helper";

const EditTransaction = (props) => {
  const { id } = props.match.params;
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    props.fetchTransaction(id);
  }, []);

  const submitTransaction = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    props.updateTransaction(
      id,
      formDataObj.description,
      formDataObj.amount,
      formDataObj.date
    );
    setShowPopover(true);
    event.target.reset();
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="mb-3">
            <h4>Uređivanje Transakcije</h4>
          </div>
          <div className="row">
            <div className="col col-md-4 col-12 m-2">
              <Card>
                <Card.Body>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Korisničko ime:</span>
                    <span className="col overflow-auto">
                      {props.transaction?.username}
                    </span>
                  </div>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Opis:</span>
                    <span className="col overflow-auto">
                      {props.transaction?.description}
                    </span>
                  </div>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Total (KM):</span>
                    <span className="col overflow-auto">
                      {props.transaction?.amount?.$numberDecimal}
                    </span>
                  </div>
                  <div className="info-row row row-cols-auto">
                    <span className="info-row-name col">Datum:</span>
                    <span className="col overflow-auto">
                      {stringUtcToLocalDateTimeString(props.transaction?.date)}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col col-md-7 col-12 m-2">
              <Card>
                <Form
                  className="m-2 row row-cols-1 row-cols-xl-2"
                  onSubmit={submitTransaction}
                >
                  <Form.Group className="mb-3 col">
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
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    transaction: state.transactions[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchTransaction,
  updateTransaction,
})(EditTransaction);
