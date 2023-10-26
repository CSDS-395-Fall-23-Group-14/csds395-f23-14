import React from 'react';
import OptionScreener from '../components/OptionScreener/OptionScreener';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 * @component
 */
function Options() {
  return (
    <>
      <div className='body'>
        <div className="screener-wrapper">
          <OptionScreener/>
        </div>
      </div>
    </>
  );
}

export default Options;