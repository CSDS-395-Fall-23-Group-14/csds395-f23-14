import React from 'react';
import { useTheme } from '@mui/material/styles';

import NavBar from '../components/NavBar/NavBar';
import OptionScreener from '../components/OptionScreener/OptionScreener';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 *
 * @component
 */
function Options() {
  const theme = useTheme();
  
  return (
    <>
      <div
        className='header'
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <NavBar />
      </div>
      <div
        className='body'
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <OptionScreener/>
      </div>
    </>
  );
}

export default Options;