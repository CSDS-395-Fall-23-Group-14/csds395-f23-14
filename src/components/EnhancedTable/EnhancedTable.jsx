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
function EnhancedTable({ columns, rows, toolbar, loading, autoHeight }) {
  return (
    <DataGrid
      rows={rows ? rows : []}
      columns={columns ? columns : []}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 }
        }
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      slots={{ toolbar: toolbar ? GridToolbar : null }}
      HorizontalContentAlignment='Center'
      loading={loading}
      autoHeight={autoHeight}
    />
  );
}

export default EnhancedTable