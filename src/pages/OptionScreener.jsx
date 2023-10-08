import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import Navbar from '../components/navbar/navbar';

/**
 * Option Screener page that will allow users to choose options and integrate with finding hedges on Tiles
 *
 * @component
 */
function OptionScreener() {
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
    </>
  );
}

export default OptionScreener;