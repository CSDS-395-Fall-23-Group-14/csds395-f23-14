import React from 'react';

import NavBar from '../components/NavBar/NavBar';
import OptionScreener from '../components/OptionScreener/OptionScreener';

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
        <OptionScreener/>
      </div>
    </>
  );
}

export default Options;