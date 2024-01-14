import React from "react";
import { connect } from "react-redux";
import { deleteAd, fetchAds } from "../actions/ads";
import TablePage from "./TablePage";

const Ads = (props) => {
  const fetchData = () => {
    props.fetchAds();
  };

  const cols = [
    // { field: "_id", headerName: "Id", minWidth: 210, flex: 3 },
    { field: "title", headerName: "Natpis", minWidth: 210, flex: 1 },
    { field: "description", headerName: "Opis", minWidth: 250, flex: 4 },
  ];

  const onDeleteButtonClick = (id) => {
    props.deleteAd(id);
  };

  return (
    <TablePage
      cols={cols}
      rows={props.ads}
      pageSize={10}
      errorFetching={props.errorFetching}
      fetchData={fetchData}
      showNewRowButton={true}
      newRowUrl="/new-ad"
      addNewRowButtonName="Kreiraj reklamu"
      showEditRowButtonWithUrl={true}
      editRowUrl="/edit-ad"
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    ads: Object.values(state.ads || {}),
    errorFetching: state.message?.error,
  };
};

export default connect(mapStateToProps, { fetchAds, deleteAd })(Ads);
