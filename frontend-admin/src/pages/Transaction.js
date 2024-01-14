import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { deleteTransaction, fetchTransactions } from "../actions/transactions";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import TablePage from "./TablePage";

const Transaction = (props) => {
  const fetchData = () => {
    props.fetchTransactions();
  };

  const rows = props.transactions?.map((item) => {
    const pom = {
      _id: item._id,
      username: item.username,
      description: item.description,
      amount: item.amount.$numberDecimal,
      date: item.date,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    return pom;
  });

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    {
      field: "username",
      headerName: "Korisničko ime",
      minWidth: 150,
      flex: 2,
    },
    { field: "description", headerName: "Opis", minWidth: 210, flex: 3 },
    {
      field: "amount",
      headerName: "Total (KM)",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const color = params.row.amount < 0 ? "danger" : "success";
        return (
          <div className={`px-3 py-1 text-bg-${color} bg-gradient rounded`}>
            {params.row.amount}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Datum",
      minWidth: 140,
      flex: 2,
      renderCell: (params) => stringUtcToLocalDateTimeString(params.row.date),
    },
    {
      field: "updatedAt",
      headerName: "Izmjenjen",
      minWidth: 140,
      flex: 3,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.updatedAt),
    },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteTransaction(id);
  };

  return (
    <TablePage
      cols={cols}
      rows={rows}
      pageSize={12}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-transaction"
      addNewRowButtonName="Dodaj transakciju"
      showEditRowButtonWithUrl={true}
      editRowUrl="/edit-transaction"
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: Object.values(state.transactions || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  deleteTransaction,
})(Transaction);
