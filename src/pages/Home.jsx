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
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <StockScreener/>
      </div>
    </>
  );
}

export default Home;