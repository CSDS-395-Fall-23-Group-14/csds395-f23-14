import React from 'react';

import NavBar from '../components/NavBar/NavBar';
import OptionScreener from '../components/OptionScreener/OptionScreener';

import {
  Box,
} from '@mui/material';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 * @component
 */
function Options() {
  return (
    <>
      <div className='header'>
        <NavBar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1}}>
            <h1 className="screener-h1">Options Screener</h1>
          </Box>
          <OptionScreener/>
        </div>
      </div>
    </>
  );
}

export default Options;