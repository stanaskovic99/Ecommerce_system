import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPaymentIntent } from "../actions/stripe";
import { fetchOrders } from "../actions/order";
import { fetchStatuses } from "../actions/status";
import { fetchArticles } from "../actions/article";
import CustomDataGrid from "../components/table/CustomDataGrid";
import Popup from "../components/Popup";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { changePassword } from "../actions/users";
import { addNewsletter } from "../actions/newsletter";
import { getSessionStorage } from "../utils/sessionStorage";
import { getLocalStorage } from "../utils/localStorage";
import { fetchUser, updateUser, deleteUser } from "../actions/users";

const Orders = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [display, setDisplay] = useState("table");
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  let user = getSessionStorage("user");
  if (!user) user = getLocalStorage("user");

  useEffect(() => {
    if (!user) window.location.href = "/";

    if (payment_intent) props.fetchPaymentIntent(payment_intent);
    props.fetchOrders();
    props.fetchStatuses();
    props.fetchArticles();

    props.fetchUser(user.id);
    setShowPopover(true);
  }, []);

  const rows = (props.orders || []).map((item) => {
    let pom = {
      _id: item._id,
      total: item.total.$numberDecimal,
      address: item.address,
      phone: item.phone,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    pom.articles = "";

    item.articles.forEach((element) => {
      pom.articles += element.articleId;

      if (element.size) pom.articles += " (" + element.size + "), ";
      else pom.articles += ", ";
    });
    return pom;
  });

  const cols = [
    {
      field: "articles",
      headerName: "Artikli",
      minWidth: 140,
      flex: 1,
      editable: false,
    },
    {
      field: "address",
      headerName: "Adresa",
      minWidth: 160,
      flex: 1,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Telefon",
      minWidth: 120,
      flex: 1,
      editable: false,
    },
    {
      field: "total",
      headerName: "Total (KM)",
      minWidth: 95,
      flex: 1,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Kreiran",
      minWidth: 105,
      flex: 2,
      editable: false,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Izmjenjen",
      minWidth: 105,
      flex: 2,
      editable: false,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.updatedAt),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 3,
      editable: false,
      renderCell: (params) => {
        const status = props.statuses.filter(
          (el) => el.name === params.row.status
        )[0];
        if (status != null) {
          return (
            <button
              className="widget-button"
              style={{ backgroundColor: status?.color }}
            >
              {status.name}
            </button>
          );
        }
        return <div></div>;
      },
    },
  ];

  const onChangePassSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.changePassword({ ...formDataObj, id: user.id }, false, false);
    setShowPopover(true);
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.updateUser(formDataObj, props.user);

    setShowPopover(true);
  };

  const showInfo = () => {
    if (display !== "userInfo") return;
    return <div>{!editMode ? showInfoUser() : showFormEditUser()}</div>;
  };

  const showInfoUser = () => {
    return (
      <div>
        <div className="d-flex justify-content-between mb-3">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setEditMode(true)}
          >
            Izmjeni
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setShowModal(true)}
          >
            Izbriši korisnički nalog
          </Button>
        </div>

        <Card className="shadow-sm">
          <Card.Body>
            <div className="row row-cols-1 row-cols-lg-2 gx-0 ">
              <div className="col">
                <div className="row row-cols-auto p-2">
                  <div className="col fw-bolder">Ime:</div>
                  <div className="col">{props.user.firstName}</div>
                </div>
              </div>
              <div className="col">
                <div className="row row-cols-auto p-2">
                  <div className="col fw-bolder">Prezime:</div>
                  <div className="col">{props.user.lastName}</div>
                </div>
              </div>
              <div className="col">
                <div className="row row-cols-auto p-2">
                  <div className="col fw-bolder">Email:</div>
                  <div className="col">{props.user.email}</div>
                </div>
              </div>
              <div className="col">
                <div className="row row-cols-auto p-2">
                  <div className="col fw-bolder">Korisničko ime:</div>
                  <div className="col">{props.user.username}</div>
                </div>
              </div>
              <div className="col">
                <div className="row row-cols-auto p-2">
                  <div className="col fw-bolder">
                    Predplaćena na newsletter:
                  </div>
                  {props.user.onNewsletter ? (
                    <div className="col">Da</div>
                  ) : (
                    <div className="col">Ne</div>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const showFormEditUser = () => {
    return (
      <div>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => setEditMode(false)}
          className="mb-3"
        >
          Izađi
        </Button>

        <Form onSubmit={onEditSubmit}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-sm-2  -success gx-0">
            <div className="col">
              <Form.Group className="p-1">
                <Form.Label className="fw-semibold">Ime</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder={props.user.firstName}
                  size="sm"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="p-1">
                <Form.Label className="fw-semibold">Prezime</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder={props.user.lastName}
                  size="sm"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="p-1">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={props.user.email}
                  size="sm"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="p-1">
                <Form.Label className="fw-semibold">Korisničko ime</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder={props.user.username}
                  size="sm"
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="p-1">
                <Form.Label className="fw-semibold">
                  Predplaćena na newsletter
                </Form.Label>
                <Form.Check
                  type="radio"
                  name="onNewsletter"
                  label="Da"
                  value={true}
                  size="sm"
                />
                <Form.Check
                  type="radio"
                  name="onNewsletter"
                  label="Ne"
                  value={false}
                  size="sm"
                />
              </Form.Group>
            </div>
          </div>
          <div className="row  -danger mx-0">
            <Button
              className="btn-sm button-form-size-ch mt-3"
              variant="outline-primary"
              type="submit"
            >
              Predaj
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div className="m-3 row" style={{ minHeight: "38.2vh" }}>
      <div className="col col-12 col-md-3">
        <div className="row row-cols-auto row-cols-md-1 justify-content-center">
          <div
            className=" -primary col m-1 rounded-3 btn btn-success"
            onClick={() => setDisplay("table")}
          >
            Narudžbe
          </div>
          <div
            className=" -primary col m-1 rounded-3 btn btn-success"
            onClick={() => setDisplay("userInfo")}
          >
            Korisničke informacije
          </div>
          <div
            className=" -primary col m-1 rounded-3 btn btn-success"
            onClick={() => setDisplay("changePassword")}
          >
            Izmjena lozinke
          </div>
        </div>
      </div>
      <div className="col col-12 col-md-9">
        <div className="mx-md-2 my-1">
          {display === "table" && (
            <CustomDataGrid
              cols={cols}
              rows={rows}
              errorFetching={props.errorFetching}
              height={props.height_79 == null ? 90 : 79}
            />
          )}
          {showInfo()}
          {display === "changePassword" && (
            <div>
              <Form onSubmit={onChangePassSubmit}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-0">
                  <div className="col">
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Stara lozinka
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="oldPassword"
                        placeholder="Unesi staru lozinku"
                        size="sm"
                      />
                    </Form.Group>
                  </div>
                  <div className="col mx-0  my-1">
                    <Form.Group>
                      <Form.Label className="fw-semibold">Lozinka</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        placeholder="Unesi novu lozinku"
                        size="sm"
                      />
                    </Form.Group>
                  </div>
                  <div className="col mx-0 my-1">
                    <Form.Group>
                      <Form.Label className="fw-semibold">
                        Potvrda Lozinke
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Unesi ponovo novu lozinku"
                        size="sm"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row mx-0">
                  <Button
                    className="btn-sm button-form-size-ch mt-3"
                    variant="outline-primary"
                    type="submit"
                  >
                    Predaj
                  </Button>
                </div>
              </Form>
            </div>
          )}
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
          <Button variant="primary" onClick={() => props.deleteUser()}>
            Da
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    statuses: state.status,
    orders: state.orders,
    errorFetching: state.message?.error,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchPaymentIntent,
  fetchOrders,
  fetchStatuses,
  fetchArticles,
  changePassword,
  fetchUser,
  updateUser,
  deleteUser,
  addNewsletter,
})(Orders);
