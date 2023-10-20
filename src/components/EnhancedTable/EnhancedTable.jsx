import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import './enhancedtable.css';

/**
 * A table component that displays sortable data, with selectable rows, using MUI.
 * @component
 * @param {object} props The props for the table.
 * @param {Array} props.columns The header cells for the table.
 * @param {Array} props.data The data to be processed and displayed in the table.
 * @returns {JSX.Element} The rendered React component.
 */
function EnhancedTable({ columns, rows }) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      slots={{
        toolbar: GridToolbar,
      }}
      HorizontalContentAlignment='Center'
    />
  );
}

export default EnhancedTable