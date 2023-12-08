import React, { useState, useEffect, useContext, Children } from 'react';
import { DataContext } from '../context/DataContext';

import Navbar from '../components/NavBar/NavBar';
import HedgeFinderTile from '../components/HedgeFinderTile/HedgeFinderTile';
import { AuthContext } from '../context/AuthContext';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts/LineChart';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HedgeGraph from '../components/HedgeGraph/HedgeGraph.jsx';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
const images = require.context('../images/Hedge-Finder-Images', true);
const imageList = images.keys().map(image => images(image));
const names = [
  'Bear Spread', 'Bull Spread', 'Straddle', 'Strangle', 'Strip', 'Strap'
]


/**
 * The Tiles component for displaying and selecting hedge finder tiles.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Tiles() {
  const [rows, setRows] = useState([]);
  const { getUserShoppingCart } = useContext(AuthContext);
  

  const [selectionModel, setSelectionModel] = useState([]);
  const [previousSelection, setPreviousSelection] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({}); // use this for fetching graphs
  const [possibleTypes, setPossibleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

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
  
  const columns = fields.map((_, i) => ({
    field: fields[i],
    headerName: headerNames[i],
    flex: widths[i],
    align: aligns[i],
    headerAlign: aligns[i],
    type: types[i]
  }));


  useEffect(() => {
      setRows(rows);
      getUserShoppingCart()
      .then((d) => {
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
   // console.log(newSelectionSet);
   // console.log("?????????????/")
  //  console.log(newSelectionSet[0]);
    setPreviousSelection(newSelectionSet);
    const newSelectedRow = rows.filter((row) => row.id === newSelectionSet[0]);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(newSelectedRow[0]);
    setSelectedRowData(newSelectedRow[0]);
    setPossibleTypes(getPossibleTypes(newSelectedRow[0]));
    console.log(possibleTypes);
	}
  
  //console.log(selectedRowData.bear.axes.x);

  const { get25Options } = useContext(DataContext);

  const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const optionData = await get25Options();
      setData(optionData);
      setIsLoading(false);
  };
  fetchData();
}, [get25Options]);

  function getCartSize() {
    if (selectedRowData == undefined) {
      return 0;
    }
    else {
      return selectedRowData;
    }
  }

  function getX() {
    if (getCartSize() === 0) {
      return [1,2];
    }
    else {
      return selectedRowData.bear.axes.x;
    }
  }

  function getPossibleTypes(option) {
    let res = [];
    if (option) {
    if (option.hasOwnProperty("bull")) {
      res.push("bull");
    }
    if (option.bear) {
      res.push("bear")
    }
    if (option.straddle) {
      res.push("straddle")
    }
    if (option.strangle) {
      res.push("strangle")
    }
    if (option.strip) {
      res.push("strip");
    }
    if (option.strap) {
      res.push("strap")
    }
  }
    return res;
  }

  function getType() {

  }

  const handleSelectChange = (e) => {
     const value = e.target.value;
    setSelectedType(value);
    console.log(selectedType);
  
};
  
  return (
    <>
    <div>
    </div>
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
                  loading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={6}>
                  {
                    imageList.map((e, i) =>
                      <Grid key={e} item xs={3}>
                        <HedgeFinderTile
                          name={names[i]}
                          src={e}>
                        </HedgeFinderTile>
                      </Grid>
                    )
                  }
                </Grid> 
              <HedgeGraph option={selectedRowData} type={selectedType}>

              </HedgeGraph>
              <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
           value={selectedType}
          // label="Age"
           onChange={handleSelectChange}
        >
          {
            possibleTypes.map((pt) => {
             return (<MenuItem value={pt}>{pt}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Tiles;