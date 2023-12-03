import React, { useState, useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { AuthContext } from '../../context/AuthContext';
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
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const {
    //updateUserStockShoppingCart,
    removeFromUserShoppingCart,
    getUserShoppingCart
  } = useContext(AuthContext);

  const handleCartChange = async (ids) => {
    setRowSelectionModel(ids);
    //updateUserStockShoppingCart(ids);
    console.log(ids);
  }

  
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
      onRowSelectionModelChange={(ids) => handleCartChange(ids)}
      rowSelectionModel={rowSelectionModel}
      slots={{ toolbar: toolbar ? GridToolbar : null }}
      HorizontalContentAlignment='Center'
      loading={loading}
      autoHeight={autoHeight}
    />
  );
}

export default EnhancedTable