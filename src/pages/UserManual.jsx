import React from 'react'

import Navbar from '../components/NavBar/NavBar';

import {
  Box
} from '@mui/material';

function UserManual() {
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{borderBottom: 1, px: "40px"}}>
            <h1 className="screener-h1">User Manual</h1>
          </Box>
          <Box
            sx={{borderTop: 1, py: "1%", px: "40px"}}
          >
            This is the user manual!
          </Box>
        </div>
      </div>
    </>
  )
}

export default UserManual