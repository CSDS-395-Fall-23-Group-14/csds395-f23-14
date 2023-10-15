import React from 'react';
import Navbar from '../components/navbar/navbar';
import OptionScreener from '../components/option-screener/option-screener';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 *
 * @component
 */
function OptionScreenerPage() {
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <OptionScreener/>
      </div>
    </>
  );
}

export default OptionScreenerPage;