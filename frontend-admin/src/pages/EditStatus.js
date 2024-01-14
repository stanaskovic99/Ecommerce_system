import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import { fetchStatus, updateStatus } from "../actions/status ";

const EditStatus = (props) => {
  const { id } = props.match.params;
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    props.fetchStatus(id);
  }, []);

  const submitStatus = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.updateStatus(id, formDataObj.name, formDataObj.color);
    setShowPopover(true);
    event.target.reset();
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid">
          <div className="mb-3">
            <h4>Uređivanje Statusa</h4>
          </div>
          <div className="row">
            <Card className="col col-md-4 col-12 m-2">
              <Card.Body>
                <div className="info-row row row-cols-auto">
                  <span className="info-row-name col">Naziv:</span>
                  <span className="col overflow-auto">
                    {props.status?.name}
                  </span>
                </div>
                <div className="info-row row row-cols-auto">
                  <span className="info-row-name col">Boja:</span>
                  <span
                    style={{
                      height: "20px",
                      width: "20px",
                      border: "1px solid black",
                      borderRadius: "3px",
                      marginLeft: "10px",
                      backgroundColor: `${props.status?.color}`,
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
            <Card className="col col-md-7 col-12 m-2">
              <Form
                className="m-2 row row-cols-1 row-cols-xl-2"
                onSubmit={submitStatus}
              >
                <Form.Group className="mb-3 col">
                  <Form.Label className="form-input-title">Naziv</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Unesi novi naziv"
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
                  className="button-form-size align-self-end"
                >
                  Predaj
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.statuses[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStatus, updateStatus })(
  EditStatus
);
