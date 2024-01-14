import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  deleteNewsletterWithId,
  fetchNewsletterEmails,
  updateNewsletter,
} from "../actions/newsletters";
import TablePage from "./TablePage";

const Newsletter = (props) => {
  const fetchData = () => {
    props.fetchNewsletterEmails();
  };

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 230, flex: 3 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 270,
      flex: 3,
      editable: true,
    },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteNewsletterWithId(id);
  };

  const onSaveButtonClick = (formData) => {
    props.updateNewsletter(formData._id, formData.email);
  };

  return (
    <TablePage
      cols={cols}
      rows={props.emails}
      pageSize={15}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-email"
      addNewRowButtonName="Dodaj email"
      showEditButton={true}
      onDeleteButtonClick={onDeleteButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    emails: state.emails,
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, {
  fetchNewsletterEmails,
  deleteNewsletterWithId,
  updateNewsletter,
})(Newsletter);
