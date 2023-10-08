import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import Navbar from '../components/navbar/navbar';

/**
 * The Tiles component for displaying and editing user data.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Tiles() {
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
    } catch (error) {
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
      <div>Tiles</div>
    </>)
}

export default Tiles;