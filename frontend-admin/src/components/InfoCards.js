import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { fetchOrderStatistics } from "../actions/orders";
import { fetchTransactionStatistics } from "../actions/transactions";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const InfoCards = (props) => {
  useEffect(() => {
    props.fetchTransactionStatistics();
  }, []);

  const showStatus = (value) => {
    if (value == null || value === 0) {
      return;
    }

    value = value.toFixed(2);

    if (value > 0) {
      return (
        <div className="fs-5">
          +{value}%
          <ArrowUpward className="arrow-icon" />
        </div>
      );
    }

    return (
      <div className="fs-5">
        {value}%
        <ArrowDownward className="arrow-icon negative" />
      </div>
    );
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between m-3">
      <Card className="card me-sm-1 mb-2 mb-sm-0 me-md-3 me-lg-5">
        <Card.Body>
          <Card.Title className="fs-5">Dobit</Card.Title>
          <div className="card-text-money">
            <div className="d-flex-inline me-3 ">
              {props.transactionStatistics?.stateCurrentMonth?.$numberDecimal ||
                0}
              <div className="d-inline mb-2 "> KM</div>
            </div>
            {showStatus(props.transactionStatistics?.statePercentToLastMonth)}
          </div>
          <Card.Subtitle className="my-2 text-muted">
            Poredeći prošlim mjesecom
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Card className="card me-sm-1 mb-2 mb-sm-0 me-md-3 me-lg-5">
        <Card.Body>
          <Card.Title className="fs-5">Prihod</Card.Title>
          <div className="card-text-money">
            <div className="me-3">
              {props.transactionStatistics?.incomeCurrentMonth
                ?.$numberDecimal || 0}
              <div className="d-inline mb-2"> KM</div>
            </div>
            {showStatus(props.transactionStatistics?.incomePercentToLastMonth)}
          </div>
          <Card.Subtitle className="my-2 text-muted">
            Poredeći prošlim mjesecom
          </Card.Subtitle>
        </Card.Body>
      </Card>
      <Card className="card ">
        <Card.Body>
          <Card.Title className="fs-5">Rashod</Card.Title>
          <div className="card-text-money">
            <div className="me-3">
              {props.transactionStatistics?.costCurrentMonth || 0}
              <div className="d-inline mb-2"> KM</div>
            </div>
            {showStatus(props.transactionStatistics?.costPercentToLastMonth)}
          </div>
          <Card.Subtitle className="my-2 text-muted">
            Poredeći prošlim mjesecom
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactionStatistics: state.statistics.transaction,
  };
};

export default connect(mapStateToProps, {
  fetchTransactionStatistics,
})(InfoCards);
