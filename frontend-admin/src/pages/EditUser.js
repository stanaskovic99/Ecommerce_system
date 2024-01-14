import { MailOutline, PermIdentity } from "@material-ui/icons";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import {
  addEmailToNewsletter,
  deleteNewsletterWithEmail,
  fetchNewsletterEmails,
} from "../actions/newsletters";
import { fetchUser, updateUser, deleteAccount } from "../actions/users";
import Menu from "../components/Menu";
import Popup from "../components/Popup";
import Modal from "react-bootstrap/Modal";

const EditUser = (props) => {
  const { id } = props.match.params;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    props.fetchUser(id);
    props.fetchNewsletterEmails();
    setShowPopover(true);
  }, []);

  const [showPopover, setShowPopover] = useState(false);

  const submitUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.onNewsletter, props.user?.onNewsletter);
    props.updateUser(formDataObj, props.user);
    setShowPopover(true);
    event.target.reset();
  };

  const showAdminStatus = () => {
    return props.user?.isAdmin ? "Da" : "Ne";
  };

  const showSubscribedToNewsletter = () => {
    return props.user?.onNewsletter ? "Da" : "Ne";
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="ms-2 mb-3 d-flex justify-content-between">
            <h4>Uređivanje Korisnika</h4>
            <Button className="btn-danger" onClick={() => setShowModal(true)}>
              Izbriši nalog
            </Button>
          </div>
          <div className="ms-1 row gx-5 w-100">
            <div className="col col-md-4 col-12 gx-0 ">
              <div className="row gx-0 w-100">
                <Card className="col-12 mt-2">
                  <Card.Body className="mx-1">
                    <Card.Title className="fs-3 mb-4">
                      {props.user?.fullName}
                    </Card.Title>
                    <Card.Subtitle className="my-3 text-light-grey">
                      Korisnički detalji
                    </Card.Subtitle>
                    <Card.Body className="p-1">
                      <div className="row h-100">
                        <div className="info-row col col-12">
                          <PermIdentity className="info-row-icon" />
                          <span className="info-row-text">
                            {props.user?.username}
                          </span>
                        </div>
                        <div className="info-row col col-12">
                          <AdminPanelSettingsIcon className="info-row-icon" />
                          <span className="info-row-text">
                            {showAdminStatus()}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Subtitle className="mb-3 mt-2 text-light-grey">
                      Kontakt
                    </Card.Subtitle>
                    <Card.Body className="p-1">
                      <div className="row h-100">
                        <div className="info-row col col-12 text-break">
                          <MailOutline className="info-row-icon" />
                          <span className="info-row-text">
                            {props.user?.email}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Subtitle className="mb-3 mt-2 text-light-grey">
                      <div className="d-inline">Pretplaćen/a newsletteru</div>
                      <div className="ms-2 d-inline fw-normal">
                        {showSubscribedToNewsletter()}
                      </div>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="col col-md-8 col-12 gx-0">
              <Card className="m-2 me-1">
                <Form
                  className="m-2 row row-cols-1 row-cols-xl-2"
                  onSubmit={submitUser}
                >
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Email</Form.Label>
                    <Form.Control
                      size="sm"
                      type="email"
                      placeholder="Unesi novi email"
                      name="email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Korisničko ime
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novo korisničko ime"
                      name="username"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">Ime</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novo ime"
                      name="firstName"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Prezime
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novo prezime"
                      name="lastName"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Admin prava
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Ne"
                        name="isAdmin"
                        className="me-4 pointer-hover"
                        value={false}
                      />
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Da"
                        name="isAdmin"
                        className="me-4 pointer-hover"
                        value={true}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Pretplaćen/a newsletteru
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Ne"
                        name="onNewsletter"
                        className="me-4 pointer-hover"
                        value={false}
                      />
                      <Form.Check
                        size="sm"
                        type="radio"
                        label="Da"
                        name="onNewsletter"
                        className="me-4 pointer-hover"
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
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje naloga</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Da li ste sigurni da želite da izbrišete nalog ?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Ne
          </Button>
          <Button variant="primary" onClick={() => props.deleteAccount()}>
            Da
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.id],
    email: state.newsletters,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  updateUser,
  addEmailToNewsletter,
  fetchNewsletterEmails,
  deleteNewsletterWithEmail,
  deleteAccount,
})(EditUser);
