import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomTableToolbar from "./CustomTableToolbar";
import { CustomNoRowsOverlay } from "./CustomNoRowLook";
import { green, red } from "@material-ui/core/colors";

const CustomDataGrid = ({ cols = [], rows = [], errorFetching }) => {
  const columns = cols.map((item) => {
    const col = {
      field: item.field,
      headerName: item.headerName,
      minWidth: item.minWidth,
      flex: item.flex,
      type: item.type,
      align: "center",
      headerAlign: "center",
      editable: false,
      renderHeader: (params) => {
        return (
          <div className="text-uppercase fw-bold">
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

    return col;
  });

  return (
    <div>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        pageSize={12}
        autoHeight
        loading={errorFetching != null && rows.length == 0}
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
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
          "& .super-app.negative": {
            backgroundColor: "rgba(157, 255, 118, 0.49)",
            color: "#1a3e72",
            fontWeight: "600",
          },
          "& .super-app.positive": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
            fontWeight: "600",
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
        className="ms-3 me-1 my-1 data-grid-details"
      />
    </div>
  );
};

export default CustomDataGrid;
