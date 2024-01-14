import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInfo, updateInfo } from "../actions/info";
import Menu from "../components/Menu";
import Popup from "../components/Popup";

const InfoShop = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    props.fetchInfo("62d50f87caf72949e6a207ae");
    setShowPopover(true);
  }, []);

  const submitCategory = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    if (formDataObj.clearLinks) {
      formDataObj.instagram = "";
      formDataObj.twitter = "";
      formDataObj.pinterest = "";
      formDataObj.facebook = "";
    }
    props.updateInfo(
      "62d50f87caf72949e6a207ae",
      formDataObj.address,
      formDataObj.moNumbers,
      formDataObj.email,
      formDataObj.workingHours,
      formDataObj.instagram,
      formDataObj.twitter,
      formDataObj.pinterest,
      formDataObj.facebook,
      formDataObj.delivery,
      formDataObj.clearLinks
    );

    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="ms-2 mb-3">
            <h4>Informacije radnje</h4>
          </div>
          <div className="ms-2 mb-3">
            Novi red u poljima adresa, radno vrijeme i brojevi telefona se
            upisuje sa karakterom &lt;br&#47;&gt;
          </div>
          <div className="ms-1 row gx-5 w-100">
            <div className="col col-md-5 col-12 gx-0">
              <div className="row gx-0 w-100">
                <Card className="col-12 mt-2">
                  <Card.Body className="mx-1">
                    <div>
                      <span className="info-row-name">Adresa:</span>
                      <span className="overflow-auto">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: props.info?.address,
                          }}
                        ></p>
                      </span>
                    </div>
                    <div>
                      <span className="info-row-name">Brojevi telefona:</span>
                      <span className="overflow-auto">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: props.info.moNumbers,
                          }}
                        ></p>
                      </span>
                    </div>
                    <div>
                      <span className="info-row-name">Email:</span>
                      <span className="overflow-auto">
                        <p>{props.info?.email}</p>
                      </span>
                    </div>
                    <div>
                      <span className="info-row-name">Radno vrijeme:</span>
                      <span className="overflow-auto">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: props.info.workingHours,
                          }}
                        ></p>
                      </span>
                    </div>
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Cijena dostave:</span>
                      <span className="col overflow-auto">
                        {props.info?.delivery?.$numberDecimal}
                      </span>
                    </div>
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Instagram link:</span>
                      <span className="col overflow-auto">
                        <Link
                          to={props.info?.instagram || "/"}
                          className="mb-3 col text-end  text-decoration-none"
                        >
                          {props.info?.instagram}
                        </Link>
                      </span>
                    </div>
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Twitter link:</span>
                      <span className="col overflow-auto">
                        <Link
                          to={props.info?.twitter || "/"}
                          className="mb-3 col text-end  text-decoration-none"
                        >
                          {props.info?.twitter}
                        </Link>
                      </span>
                    </div>
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Pinterest link:</span>
                      <span className="col overflow-auto">
                        <Link
                          to={props.info?.pinterest || "/"}
                          className="mb-3 col text-end  text-decoration-none"
                        >
                          {props.info?.pinterest}
                        </Link>
                      </span>
                    </div>
                    <div className="info-row row row-cols-auto">
                      <span className="info-row-name col">Facebook link:</span>
                      <span className="col overflow-auto">
                        <Link
                          to={props.info?.facebook || "/"}
                          className="mb-3 col text-end  text-decoration-none"
                        >
                          {props.info?.facebook}
                        </Link>
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="col col-md-7 col-12 gx-0">
              <Card className="m-2 me-1">
                <Form className="m-2" onSubmit={submitCategory}>
                  <div className="row row-cols-1 row-cols-xl-2">
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Adresa
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        as="textarea"
                        placeholder="Unesi novu adresu"
                        name="address"
                        className="desc-area-info"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Brojevi telefona
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        as="textarea"
                        placeholder="Unesi nove brojeve telefona"
                        name="moNumbers"
                        className="desc-area-info"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Radno vrijeme
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        as="textarea"
                        placeholder="Unesi novo radno vrijeme"
                        name="workingHours"
                        className="desc-area-info"
                      />
                    </Form.Group>
                  </div>
                  <div className="row row-cols-1 row-cols-xl-2">
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Email
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="email"
                        placeholder="Unesi novi email"
                        name="email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col">
                      <Form.Label className="form-input-title">
                        Cijena dostave
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Unesi novu cijenu dostave"
                        name="delivery"
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Instagram
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi link instagrama"
                      name="instagram"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Twitter
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi link twittera"
                      name="twitter"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Pinterest
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi link pinterest"
                      name="pinterest"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Label className="form-input-title">
                      Facebook
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Unesi novi link facebook"
                      name="facebook"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col">
                    <Form.Check
                      size="sm"
                      type="checkbox"
                      label="Izbriši sve linkove"
                      name="clearLinks"
                      value={true}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="button-form-size-info mt-2 mb-0 align-self-end"
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

const mapStateToProps = (state) => {
  return {
    info: state.info,
  };
};

export default connect(mapStateToProps, { fetchInfo, updateInfo })(InfoShop);
