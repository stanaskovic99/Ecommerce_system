import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orders";
import Popup from "../components/Popup";
import { fetchStatuses } from "../actions/status ";
import { stringUtcToLocalDateTimeString } from "../utils/helper";

const Widget = (props) => {
  useEffect(() => {
    props.fetchOrders();
    props.fetchStatuses();
    setShowPopover(true);
  }, []);

  const [showPopover, setShowPopover] = useState(false);

  const showStatus = (item) => {
    const status = props.statuses?.filter((el) => el.name === item.status)[0];
    if (status != null) {
      return (
        <button
          className="widget-button"
          style={{ backgroundColor: status?.color }}
        >
          {item.status}
        </button>
      );
    }
  };

  return (
    <div className="widget m-3">
      <div className="m-3" style={{ overflowX: "scroll" }}>
        <h3 className="fs-5 mb-3">Zadnje narudžbe</h3>
        <Table striped>
          <thead>
            <tr>
              <th className="font-size-19">Kupac</th>
              <th className="font-size-19">Datum</th>
              <th className="font-size-19">Iznos</th>
              <th className="font-size-19">Stanje</th>
            </tr>
          </thead>
          <tbody>
            {(props.orders || []).map((item) => {
              return (
                <tr key={item._id}>
                  <td className="more-bold ">
                    <div className="inside">{item?.fullName}</div>
                  </td>
                  <td>
                    <div className="inside">
                      {stringUtcToLocalDateTimeString(item?.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="inside">
                      {item?.total?.$numberDecimal} KM
                    </div>
                  </td>
                  <td>{showStatus(item)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: Object.values(state.orders || {}).filter(
      (value, index) => index > Object.values(state.orders || {}).length - 6
    ),
    statuses: Object.values(state.statuses || {}),
  };
};

export default connect(mapStateToProps, { fetchOrders, fetchStatuses })(Widget);
