import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStartReasons,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomTableToolbar from "./CustomTableToolbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { Dropdown, Stack } from "react-bootstrap";
import SettingsIcon from "@mui/icons-material/Settings";
import { CustomNoRowsOverlay } from "./CustomNoRowLook";

const CustomDataGrid = ({
  cols = [],
  rows = [],
  height = 90,
  editRowUrl,
  showEditButton = false,
  showEditRowButtonWithUrl = false,
  showAdminButton = false,
  showDeleteButton = true,
  showChangeStatusButton = false,
  onAdminButtonClick,
  onDeleteButtonClick,
  onSaveButtonClick,
  onChangeStatusButtonClick,
  statusOptions,
  errorFetching,
  menuAction,
  pageSize,
  onSeeButtonClick,
}) => {
  const columns = cols.map((item) => {
    const col = {
      field: item.field,
      headerName: item.headerName,
      minWidth: item.minWidth,
      flex: item.flex,
      type: item.type,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => {
        return (
          <div className="text-white text-uppercase fw-bold">
            {params.colDef.headerName}
          </div>
        );
      },
    };
    if (item.renderCell) {
      col.renderCell = item.renderCell;
    }
    if (item.type) {
      col.type = item.type;
    }
    if (item.editable) {
      col.editable = item.editable;
    }
    if (item.renderEditCell) {
      col.renderEditCell = item.renderEditCell;
    }

    return col;
  });

  const handleSave = (params) => {
    params.api?.stopRowEditMode({ id: params.id });
    onSaveButtonClick(params.row);
  };
  const handleCancel = (params) => {
    params.api?.stopRowEditMode({ id: params.id, ignoreModifications: true });
  };
  const handleEdit = (params) => {
    params.api?.startRowEditMode({ id: params.id });
  };
  const handleEditUrl = (params) => {
    window.location.href = `${editRowUrl}/${params.id}`;
  };
  const handleAdmin = (params) => {
    const isAdmin = !params.row?.isAdmin;
    const stringIsAdmin = isAdmin ? "true" : "false";
    onAdminButtonClick({ id: params.id, isAdmin: stringIsAdmin });
  };
  const handleDelete = (params) => {
    onDeleteButtonClick(params.id);
  };
  const handleChangeStatus = (params, option) => {
    onChangeStatusButtonClick({ id: params.id, status: option._id });
  };
  const handleSee = (params) => {
    onSeeButtonClick(params.id);
  };

  const renderDropdown = (params) => {
    return statusOptions?.map((option) => {
      return (
        <Dropdown.Item
          key={option._id}
          onClick={(p) => handleChangeStatus(params, option)}
        >
          {option.name}
        </Dropdown.Item>
      );
    });
  };

  const renderMenu = (params) => {
    let options = statusOptions?.map((option) => {
      return (
        <GridActionsCellItem
          label={option.name}
          onClick={(p) => {
            handleChangeStatus(params, option);
          }}
          showInMenu
        />
      );
    });
    options.push(
      <GridActionsCellItem
        icon={<VisibilityIcon />}
        label="Više detalja"
        onClick={(p) => {
          handleSee(params);
        }}
      />
    );
    return options;
  };

  if (menuAction) {
    columns.push({
      field: "action",
      type: "actions",
      headerName: "Akcije",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      editable: true,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => {
        return (
          <div className="text-white text-uppercase fw-bold">
            {params.colDef.headerName}
          </div>
        );
      },
      getActions: (params) => renderMenu(params),
    });
  } else {
    columns.push({
      field: "action",
      type: "actions",
      headerName: "Akcije",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      editable: true,
      align: "center",
      headerAlign: "center",
      renderEditCell: (params) => {
        return (
          <div>
            <CheckIcon
              className="action-button-save"
              onClick={(p) => handleSave(params)}
            />
            <CancelIcon
              className="action-button-cancel"
              onClick={(p) => handleCancel(params)}
            />
          </div>
        );
      },
      renderHeader: (params) => {
        return (
          <div className="text-white text-uppercase fw-bold">
            {params.colDef.headerName}
          </div>
        );
      },
      renderCell: (params) => {
        return (
          <div>
            {showEditButton && (
              <EditIcon
                className="action-button-edit"
                onClick={(p) => handleEdit(params)}
              />
            )}
            {showEditRowButtonWithUrl && (
              <EditIcon
                className="action-button-edit"
                onClick={(p) => handleEditUrl(params)}
              />
            )}
            {showAdminButton && (
              <AdminPanelSettingsIcon
                className={`action-button-admin color-${params.row.isAdmin}`}
                onClick={(p) => handleAdmin(params)}
              />
            )}
            {showDeleteButton && (
              <DeleteIcon
                className="action-button-delete"
                onClick={(p) => handleDelete(params)}
              />
            )}
            {showChangeStatusButton && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary mb-1 shadow-none dropdown-height"
                  size="sm"
                >
                  <SettingsIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  {renderDropdown(params)}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        );
      },
    });
  }

  return (
    <div>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        autoHeight
        loading={errorFetching != null && rows.length == 0}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
        onRowEditStart={(params, event) => {
          if (
            params.reason === GridRowEditStartReasons.cellDoubleClick ||
            params.reason === GridRowEditStartReasons.deleteKeyDown ||
            params.reason === GridRowEditStartReasons.enterKeyDown ||
            params.reason === GridRowEditStartReasons.printableKeyDown
          ) {
            event.defaultMuiPrevented = true;
          }
        }}
        isRowSelectable={() => false}
        onRowEditStop={(params, event) => {
          if (
            params.reason === GridRowEditStopReasons.enterKeyDown ||
            params.reason === GridRowEditStopReasons.escapeKeyDown ||
            params.reason === GridRowEditStopReasons.rowFocusOut ||
            params.reason === GridRowEditStopReasons.shiftTabKeyDown ||
            params.reason === GridRowEditStopReasons.tabKeyDown
          ) {
            event.defaultMuiPrevented = true;
          }
        }}
        sx={{
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: "3px",
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "10px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "17px",
          },
        }}
        getRowHeight={() => "auto"}
        getRowId={(row) => {
          return row?._id;
        }}
        localeText={{
          toolbarDensity: "Gustina kolona",
          toolbarDensityLabel: "Gustina kolona",
          toolbarDensityCompact: "Velika",
          toolbarDensityStandard: "Srednja",
          toolbarDensityComfortable: "Mala",

          toolbarExportCSV: "Skini kao CSV",
          toolbarExportPrint: "Štampaj",

          toolbarQuickFilterPlaceholder: "Potraži...",
          toolbarQuickFilterLabel: "Potraži",
          toolbarQuickFilterDeleteIconLabel: "Resetuj",

          toolbarColumns: "Kolone",
          toolbarColumnsLabel: "Odaberi kolone",
          columnsPanelTextFieldLabel: "Potraži kolonu",
          columnsPanelTextFieldPlaceholder: "Naslov kolone",
          columnsPanelDragIconLabel: "Reorganizuj kolone",
          columnsPanelShowAllButton: "Prikaži sve",
          columnsPanelHideAllButton: "Sakrij sve",

          toolbarFilters: "Filteri",
          toolbarFiltersTooltipHide: "Sakriji filere",
          toolbarFiltersTooltipShow: "Prikaži filtere",
          toolbarFiltersTooltipActive: (count) =>
            count > 1 ? `${count} aktivnih filtera` : `${count} aktivan filter`,
          filterPanelAddFilter: "Dodaj filter",
          filterPanelDeleteIconLabel: "Skini",
          filterPanelOperators: "Operatori",
          filterPanelColumns: "Kolone",
          filterPanelInputLabel: "Vrijednost",
          filterPanelInputPlaceholder: "Filtriraj vrijednost",

          filterOperatorContains: "sadrži",
          filterOperatorEquals: "jednak je",
          filterOperatorStartsWith: "počinje sa",
          filterOperatorEndsWith: "završava sa",
          filterOperatorIsEmpty: "je prazan",
          filterOperatorIsNotEmpty: "nije prazan",
          filterOperatorIsAnyOf: "je jedan od",

          columnMenuLabel: "Meni",
          columnMenuShowColumns: "Prikaži kolone",
          columnMenuFilter: "Filtriraj",
          columnMenuHideColumn: "Sakrij",
          columnMenuUnsort: "Prekini sortiranje",
          columnMenuSortAsc: "Rastuće sortiranje",
          columnMenuSortDesc: "Opadajuće sortiranje",

          footerRowSelected: (count) =>
            count > 1
              ? `${count.toLocaleString()} reda izabrana`
              : `${count.toLocaleString()} red izabran`,

          footerTotalRows: "Ukupan broj redova:",
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} od ${totalCount.toLocaleString()}`,

          checkboxSelectionHeaderName: "Izaberi",
          checkboxSelectionSelectAllRows: "Izaberi sve redove",
          checkboxSelectionUnselectAllRows: "Povrati sve redove",
          checkboxSelectionSelectRow: "Izaberi red",
          checkboxSelectionUnselectRow: "Povrati red",

          booleanCellTrueLabel: "Da",
          booleanCellFalseLabel: "Ne",
        }}
        components={{
          Toolbar: CustomTableToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
          NoResultsOverlay: CustomNoRowsOverlay,
        }}
        className="ms-3 me-1 my-1 data-grid-details "
      />
    </div>
  );
};

export default CustomDataGrid;
