import { ConstructionOutlined } from "@mui/icons-material";
import React from "react";
import { connect } from "react-redux";
import { deleteUser, fetchUsers, updateUser } from "../actions/users";
import { stringUtcToLocalDateTimeString } from "../utils/helper";
import TablePage from "./TablePage";

const Users = (props) => {
  const fetchData = () => {
    props.fetchUsers();
  };

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    { field: "firstName", headerName: "Ime", minWidth: 130, flex: 2 },
    { field: "lastName", headerName: "Prezime", minWidth: 130, flex: 3 },
    { field: "email", headerName: "Email", minWidth: 260, flex: 4 },
    { field: "username", headerName: "Korisničko ime", minWidth: 150, flex: 1 },
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
    {
      field: "isAdmin",
      headerName: "Admin",
      minWidth: 70,
      flex: 1.5,
      type: "boolean",
    },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteUser(id);
  };

  const onAdminButtonClick = (formData) => {
    console.log(formData);
    props.updateUser(formData, { _id: formData.id });
  };

  return (
    <TablePage
      cols={cols}
      rows={props.users}
      pageSize={15}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-user"
      addNewRowButtonName="Kreiraj korisnika"
      showAdminButton={true}
      onAdminButtonClick={onAdminButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const makeStateToProps = (state) => {
  return {
    users: Object.values(state.users || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(makeStateToProps, {
  fetchUsers,
  updateUser,
  deleteUser,
})(Users);
