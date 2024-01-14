import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import Menu from "../components/Menu";
import { fetchOrder } from "../actions/orders";
import { stringUtcToLocalDateTimeString } from "../utils/helper";

const Order = (props) => {
  const { id } = props.match.params;
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    props.fetchOrder(id);
  }, []);

  const mapArticles = (articles) => {
    let text = "";
    const help = Object.values(articles || {});
    help.forEach((element) => {
      text += element.articleId + " (" + element.size + "), ";
    });

    return text;
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div className="m-3 container-fluid container-create">
          <div className="mb-3">
            <h4>Narudžba</h4>
          </div>
          <Card>
            <Card.Body>
              <div className="row row-cols-auto h-100 ">
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Id:</span>
                  <span className="col overflow-auto">{props.order?._id}</span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Ime i prezime:</span>
                  <span className="col overflow-auto">
                    {props.order?.fullName}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Total (KM):</span>
                  <span className="col overflow-auto">
                    {props.order?.total?.$numberDecimal}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Adresa:</span>
                  <span className="col overflow-auto">
                    {props.order?.address}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Email:</span>
                  <span className="col overflow-auto">
                    {props.order?.email}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Telefon:</span>
                  <span className="col overflow-auto">
                    {props.order?.phone}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Status:</span>
                  <span className="col overflow-auto">
                    {props.order?.status}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Artikli:</span>
                  <span className="col overflow-auto">
                    {mapArticles(props.order?.articles)}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Datum kreiranja:</span>
                  <span className="col overflow-auto">
                    {stringUtcToLocalDateTimeString(props.order?.createdAt)}
                  </span>
                </div>
                <div className="info-row row row-cols-auto col-sm-6 col-12">
                  <span className="info-row-name col">Datum ažuriranja:</span>
                  <span className="col overflow-auto">
                    {stringUtcToLocalDateTimeString(props.order?.updatedAt)}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.orders[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchOrder,
})(Order);
