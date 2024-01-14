import React from "react";
import { connect } from "react-redux";
import { deleteCategory, fetchCategories } from "../actions/category";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import TablePage from "./TablePage";

const Category = (props) => {
  const fetchData = () => {
    props.fetchCategories();
  };

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    { field: "name", headerName: "Ime", minWidth: 90, flex: 2 },
    {
      field: "createdAt",
      headerName: "Kreiran",
      minWidth: 140,
      flex: 2,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Izmjenjen",
      minWidth: 140,
      flex: 2,
      renderCell: (params) =>
        stringUtcToLocalDateTimeString(params.row.updatedAt),
    },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteCategory(id);
  };

  return (
    <TablePage
      cols={cols}
      rows={props.categories}
      pageSize={15}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-category"
      addNewRowButtonName="Dodaj kategoriju"
      showEditRowButtonWithUrl={true}
      editRowUrl="/edit-category"
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, { fetchCategories, deleteCategory })(
  Category
);
