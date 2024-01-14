import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";

function CustomTableToolbar() {
  return (
    <GridToolbarContainer className="toolbar-table">
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <div className="h-2">
        <GridToolbarQuickFilter />
      </div>
    </GridToolbarContainer>
  );
}

export default CustomTableToolbar;
