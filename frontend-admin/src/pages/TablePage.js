import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomDataGrid from "../components/CustomDataGrid";
import Menu from "../components/Menu";
import Popup from "../components/Popup";

const TablePage = (props) => {
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    props.fetchData();
    setShowPopover(true);
  }, []);

  const onDeleteButtonClick = (id) => {
    props.onDeleteButtonClick(id);
    setShowPopover(true);
  };

  const onAdminButtonClick = (formData) => {
    props.onAdminButtonClick(formData);
    setShowPopover(true);
  };

  return (
    <div className="container-fluid gx-0 h-100">
      <Menu />
      <div className="main position-absolute">
        <div>
          {props.showNewRowButton && (
            <Link to={props.newRowUrl}>
              <Button className="button-create-user m-3 mb-0">
                {props.addNewRowButtonName}
              </Button>
            </Link>
          )}
          {props.showDescription && props.description()}
          {!props.showNewRowButton && !props.showDeleteButton && (
            <div style={{ height: "10px" }}></div>
          )}
          <CustomDataGrid
            cols={props.cols}
            rows={props.rows}
            pageSize={props.pageSize}
            errorFetching={props.errorFetching}
            showAdminButton={
              props.showAdminButton == null ? false : props.showAdminButton
            }
            onAdminButtonClick={onAdminButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            editRowUrl={props.editRowUrl == null ? false : props.editRowUrl}
            showEditRowButtonWithUrl={
              props.showEditRowButtonWithUrl == null
                ? false
                : props.showEditRowButtonWithUrl
            }
            showEditButton={
              props.showEditButton == null ? false : props.showEditButton
            }
            showChangeStatusButton={
              props.showChangeStatusButton == null
                ? false
                : props.showChangeStatusButton
            }
            showDeleteButton={
              props.showDeleteButton == null ? true : props.showDeleteButton
            }
            onChangeStatusButtonClick={props.onChangeStatusButtonClick}
            onSaveButtonClick={props.onSaveButtonClick}
            onSeeButtonClick={props.onSeeButtonClick}
            statusOptions={props.statusOptions}
            height={props.height_79 == null ? 90 : 79}
            menuAction={props.menuAction}
          />
        </div>
      </div>
      <Popup showPopover={showPopover} setShowPopover={setShowPopover} />
    </div>
  );
};

export default TablePage;
