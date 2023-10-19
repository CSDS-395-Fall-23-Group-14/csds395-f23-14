import React, { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';

import NavBar from '../components/NavBar/NavBar';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';
import BarChart from '../components/BarChart/BarChart';

import { useTheme } from '@mui/material/styles';
import { DataContext } from '../context/DataContext';

/**
 * The Home component representing the main page of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Home() {
  const theme = useTheme();
  
	const { get25Stocks } = useContext(DataContext);
	
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Potential for a loading animation
	
	useEffect(() => {
		const fetchData = async () => setData(await get25Stocks());
		fetchData();
		setIsLoading(false);
	}, [get25Stocks]);
  
	const fields = [
		'datescraped', 'ticker', 'companyname', 'currentprice', 'shares',
    'marketvalue', 'notionalvalue', 'assetclass', 'sector', 'weight',
	];
	
	const headerNames = [
		'Date Scraped', 'Ticker', 'Company Name', 'Current Price', 'Shares',
		'Market Value', 'Notional Value', 'Asset Class', 'Sector', 'Weight',
	];
	
	const columns = fields.map((_, i) => ({
			field: fields[i],
			headerName: headerNames[i]
		})
  );
  
  return (
    <>
      <div
        className='header'
        style={{
          backgroundColor: theme.palette.background.default
        }}
      >
        <NavBar />
      </div>
      <div
        className='body'
        style={{
          backgroundColor: theme.palette.background.default
        }}
      >
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1, width: "100%", marginBottom: "4%"}} >
            <h1 className="screener-h1">Stock Screener</h1>
          </Box>
          <div className='barCharts'>
            <BarChart
              data={data}
              width={450}
              height={300}
              property='currentprice'
            />
            <BarChart
              data={data}
              width={450}
              height={300}
              property='shares'
            />
            <BarChart
              data={data}
              width={450}
              height={300}
              property='marketvalue'
            />
          </div>
          <EnhancedTable columns={columns} rows={data} />
        </div>
      </div>
    </>
  );
}

export default Home;