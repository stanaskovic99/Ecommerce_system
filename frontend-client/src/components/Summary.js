import React from "react";

const Summary = ({ price, delivery }) => {
  return (
    <div className="summary_container">
      <h1 className="summary_header">NARUDŽBA</h1>
      <div className="d-flex justify-content-between">
        <p>Cijena</p>
        <p>{price} KM</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Dostava</p>
        <p>{delivery} KM</p>
      </div>
      <div className="d-flex justify-content-between last">
        <p>Ukupno</p>
        <p>{parseInt(price, 10) + parseInt(delivery, 10)} KM</p>
      </div>
      <button
        className="btn btn-outline-success text-align-center w-100  last"
        onClick={() => {
          window.location.href = "/authentication?ongoingOrder=true";
        }}
      >
        SLJEDEĆI KORAK
      </button>
    </div>
  );
};

export default Summary;
