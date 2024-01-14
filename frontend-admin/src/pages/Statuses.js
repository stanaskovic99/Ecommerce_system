import React from "react";
import { connect } from "react-redux";
import { deleteStatus, fetchStatuses } from "../actions/status ";
import TablePage from "./TablePage";

const Statuses = (props) => {
  const fetchData = () => {
    props.fetchStatuses();
  };

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    {
      field: "name",
      headerName: "Naziv",
      minWidth: 130,
      flex: 2,
      editable: true,
    },
    {
      field: "color",
      headerName: "Boja",
      minWidth: 130,
      flex: 2,
      editable: true,
      renderCell: (params) => {
        return (
          <div
            className="widget-button"
            style={{ backgroundColor: `${params.row.color}` }}
          >
            {params.row.color}
          </div>
        );
      },
    },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteStatus(id);
  };

  return (
    <TablePage
      cols={cols}
      rows={props.statuses}
      pageSize={12}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-status"
      addNewRowButtonName="Dodaj status"
      showEditRowButtonWithUrl={true}
      editRowUrl="/edit-status"
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    statuses: Object.values(state.statuses || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, { fetchStatuses, deleteStatus })(
  Statuses
);
