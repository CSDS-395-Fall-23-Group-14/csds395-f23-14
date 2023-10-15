import { useTheme } from '@mui/material/styles';

import React from 'react';
import Navbar from '../components/navbar/navbar';
import StockScreener from '../components/stock-screener/stock-screener';

/**
 * The Home component representing the main page of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Home() {
  const theme = useTheme();
  
  return (
    <>
      <div
        className='header'
        style={{
          backgroundColor: theme.palette.background.default
        }}
      >
        <Navbar />
      </div>
      <div
        className='body'
        style={{
          backgroundColor: theme.palette.background.default
        }}
      >
        <StockScreener/>
      </div>
    </>
  );
}

export default Home;