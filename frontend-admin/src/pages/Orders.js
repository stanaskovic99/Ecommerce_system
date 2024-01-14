import React from "react";
import { connect } from "react-redux";
import { fetchOrders, updateOrder } from "../actions/orders";
import { fetchStatuses } from "../actions/status ";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import TablePage from "./TablePage";

const Orders = (props) => {
  const fetchData = () => {
    props.fetchOrders();
    props.fetchStatuses();
  };

  const row = props.orders?.map((item) => {
    let pom = {
      _id: item._id,
      total: item.total.$numberDecimal,
      address: item.address,
      phone: item.phone,
      email: item.email,
      status: item.status,
      fullName: item.fullName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    pom.articles = "";

    item.articles.forEach((element) => {
      pom.articles += element.articleId + " (" + element.size + ") ";
    });

    return pom;
  });

  const cols = [
    { field: "_id", headerName: "Id", minWidth: 220, flex: 3 },
    { field: "fullName", headerName: "Korisnik", minWidth: 120, flex: 1 },
    { field: "total", headerName: "Total (KM)", minWidth: 95, flex: 1 },
    { field: "address", headerName: "Adresa", minWidth: 160, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 3,
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
    { field: "articles", headerName: "Artikli", minWidth: 140, flex: 1 },
    {
      field: "createdAt",
      headerName: "Kreiran",
      minWidth: 105,
      flex: 2,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.createdAt),
    },
  ];

  const onChangeStatusButtonClick = (data) => {
    props.updateOrder(data.id, data.status);
  };

  const onSeeButtonClick = (id) => {
    window.location.href = "/order/" + id;
  };

  return (
    <TablePage
      cols={cols}
      rows={row}
      pageSize={7}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showChangeStatusButton={true}
      showDeleteButton={false}
      onChangeStatusButtonClick={onChangeStatusButtonClick}
      onSeeButtonClick={onSeeButtonClick}
      statusOptions={props.statuses}
      menuAction={true}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    orders: Object.values(state.orders || {}),
    statuses: Object.values(state.statuses || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, {
  fetchOrders,
  updateOrder,
  fetchStatuses,
})(Orders);
