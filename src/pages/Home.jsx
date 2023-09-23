import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';
import Navbar from '../components/navbar/navbar';
import StockScreener from '../components/stock-screener/stock-screener';

function Home() {
  const { logOut } = useAuth();
  
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
        <StockScreener/>
      </div>
    </>
  );
}

export default Home;