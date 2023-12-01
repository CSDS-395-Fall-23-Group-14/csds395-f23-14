import React, { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';

import NavBar from '../components/NavBar/NavBar';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import EnhancedBarChart from '../components/EnhancedBarChart/EnhancedBarChart';

import { DataContext } from '../context/DataContext';
import {
  Skeleton,
  TextField,
  MenuItem
} from '@mui/material';

/**
 * The Home component representing the main page of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Home() {
	const { get25Stocks } = useContext(DataContext);
	
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
  const [barChartProperty, setBarChartProperty] = useState('currentprice');
	
	useEffect(() => {
		const fetchData = async () => {
      const stockData = await get25Stocks();
      setData(stockData);
      setIsLoading(false);
    };
		fetchData();
	}, [get25Stocks]);
  
	const fields = [
		'datescraped', 'ticker', 'companyname', 'currentprice', 'assetclass', 'sector',
	];
	
	const headerNames = [
		'Date Scraped', 'Ticker', 'Company Name', 'Current Price', 'Asset Class', 'Weight', 'Sector',
	];
  
  const widths = [
    0.5, 0.3, 1, 0.5, 0.5, 0.9,
  ]
  
  const aligns = [
    'left', 'center', 'center', 'center', 'center', 'left',
  ]
  
  const types = [
    'string', 'string', 'string', 'number', 'string', 'string',
  ]
	
	const columns = fields.map((_, i) => ({
			field: fields[i],
			headerName: headerNames[i],
      flex: widths[i],
      align: aligns[i],
      headerAlign: aligns[i],
      type: types[i]
		})
  );
  
  return (
    <>
      <div className='header'>
        <NavBar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1, px: "40px"}}>
            <h1 className="screener-h1">Stock Screener</h1>
          </Box>
          <Box
            className='barCharts'
            m='auto'
            sx={{py: "1%"}}
            width={1200}
          >
            {isLoading ?
              <Skeleton
                variant="rounded"
                width={1200}
                height={300}
              /> :
              <EnhancedBarChart
                data={data}
                property={barChartProperty}
                width={1200}
                height={300}
              />
            }
            <TextField
              sx={{ my: '0.5%' }}
              fullWidth
              select
              defaultValue={columns[3]['field']}
              onChange={(e) => setBarChartProperty(e.target.value)}
            >
              {
                columns.filter((_, i) => types[i] === 'number').map((e) =>
                  <MenuItem
                    key={e.field}
                    value={e.field}
                  >
                    {e.headerName}
                  </MenuItem>
                )
              }
            </TextField>
          </Box>
          <Box
            sx={{borderTop: 1, py: "1%", px: "40px"}}
          >
            <EnhancedTable
              columns={columns}
              rows={data}
              loading={isLoading}
              toolbar
            />
          </Box>
        </div>
      </div>
    </>
  );
}

export default Home;