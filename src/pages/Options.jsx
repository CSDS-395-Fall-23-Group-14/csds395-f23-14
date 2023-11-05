import React from 'react';
import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import { DataContext } from '../context/DataContext';

import NavBar from '../components/NavBar/NavBar';
import EnhancedTable from '../components/EnhancedTable/EnhancedTable';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 * @component
 */
function Options() {
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
    
  const fields = [
    'dateScraped', 'ticker', 'ask', 'bid', 'change', 'percentchange',
    'openinterest', 'intradayprice', 'position', 'strike', 'volume', 'expiration',
  ];
  
  const headerNames = [
    'Date Scraped', 'Ticker', 'Ask', 'Bid', 'Change', 'Percent Change',
    'Open Interst', 'Intra Day Price', 'Position', 'Strike', 'Volume', 'Expiration',
  ];
  
  const widths = [
    0.5, 0.4, 0.5, 0.4, 0.5, 0.7,
    0.5, 0.7, 0.5, 0.3, 0.5, 0.5,
  ]
  
  const aligns = [
    'left', 'center', 'center', 'center', 'center', 'center',
    'center', 'center', 'center', 'center', 'center', 'center', 'center'
  ]
  
  const types = [
    'string', 'string', 'string', 'number', 'number', 'number',
    'number', 'number', 'number','string', 'number', 'number', 'string'
  ]
  
  const columns = fields.map((_, i) => ({
    field: fields[i],
    headerName: headerNames[i],
    flex: widths[i],
    align: aligns[i],
    headerAlign: aligns[i],
    type: types[i]
  }));
  
  return (
    <>
      <div className='header'>
        <NavBar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1, px: "40px"}}>
            <h1 className="screener-h1">Option Screener</h1>
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

export default Options;