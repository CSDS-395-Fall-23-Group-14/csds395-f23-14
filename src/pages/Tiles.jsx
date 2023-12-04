import React, { useState, useEffect, useContext } from 'react';

import Navbar from '../components/navbar/NavBar';
import HedgeFinderTile from '../components/HedgeFinderTile/HedgeFinderTile';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import { AuthContext } from '../context/AuthContext';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
const images = require.context('../images/Hedge-Finder-Images', true);
const imageList = images.keys().map(image => images(image));
const names = [
  'Bear Spread', 'Bull Spread', 'Butterfly Spread', 'Condor Spread',
  'Long Call', 'Long Put', 'Risk Reversal', 'Short Call',
  'Short Put', 'Straddle', 'Strangle', 'Strip'
]


/**
 * The Tiles component for displaying and selecting hedge finder tiles.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Tiles() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { getUserShoppingCart } = useContext(AuthContext);
  

  const fields = [
    'ticker', 'ask', 'bid', 'position', 'strike', 'volume'
  ];
  
  const headerNames = [
    'Ticker', 'Ask', 'Bid', 'Position', 'Strike', 'Volume'
  ];
  
  const widths = [
    0.5, 0.5, 0.5, 0.5, 0.5, 0.5
  ]
  
  const aligns = [
    'center', 'center', 'center', 'center', 'center', 'center'
  ]
  
  const types = [
    'string','number', 'number', 'string', 'number', 'number'
  ]

  const [selectionModel, setSelectionModel] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({}); // use this for fetching graphs
  
  const columns = fields.map((_, i) => ({
    field: fields[i],
    headerName: headerNames[i],
    flex: widths[i],
    align: aligns[i],
    headerAlign: aligns[i],
    type: types[i]
  }));

  useEffect(() => {
		getUserShoppingCart()
		.then((d) => {
			console.log(d);
			if (d){
			setRows(d);
			}
		})
	}, [getUserShoppingCart]);

  const handleCartChange = async (newSelection) => {
		setSelectionModel(newSelection);
    setPreviousSelection(newSelection);
		const newSelectionSet = newSelection.filter((element) => !previousSelection.includes(element));
    setSelectionModel(newSelectionSet);
    console.log(newSelectionSet);
    console.log(newSelectionSet[0]);
    setPreviousSelection(newSelectionSet);
    const newSelectedRow = rows.filter((row) => row.id === newSelectionSet[0]);
    console.log(newSelectedRow[0]);
    setSelectedRowData(newSelectedRow[0]);
	}
  
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1, px: "40px"}}>
            <h1 className="screener-h1">Tiles</h1>
          </Box>
          <Box
            sx={{borderTop: 1, py: "1%", px: "40px"}}
          >
            <Grid
              container
              spacing={2} 
              sx={{py: "1%"}}
            >
              <Grid item xs={5}>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  textAlign='center'
                >
                  Shopping Cart
                </Typography>
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
                  rowSelectionModel={selectionModel}
                  HorizontalContentAlignment='Center'
                    />
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={2}>
                  {
                    imageList.map((e, i) =>
                      <Grid key={e} item xs={3}>
                        <HedgeFinderTile
                          name={names[i]}
                          src={e}
                        />
                      </Grid>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Tiles;