import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import Navbar from '../components/navbar/navbar';
import OptionScreener from '../components/option-screener/option-screener';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 *
 * @component
 */
function OptionScreenerPage() {
  const { logOut } = useAuth();
  
  /**
   * Handles the logout button click event.
   * Calls the logout function and handles any errors.
   *
   * @async
   * @function
   */
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch(error) {
      console.error(error);
    }
  }
  
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleLogOut}>
        Log Out
      </Button>
      
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