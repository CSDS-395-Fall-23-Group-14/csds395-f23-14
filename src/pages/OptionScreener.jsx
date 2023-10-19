import React from 'react';
import { useTheme } from '@mui/material/styles';

import Navbar from '../components/navbar/navbar';
import OptionScreener from '../components/option-screener/option-screener';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 *
 * @component
 */
function OptionScreenerPage() {
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
        <OptionScreener/>
      </div>
    </>
  );
}

export default OptionScreenerPage;