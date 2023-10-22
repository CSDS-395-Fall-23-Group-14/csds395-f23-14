import React from 'react';

import Navbar from '../components/NavBar/NavBar';
import HedgeFinderTile from '../components/HedgeFinderTile/HedgeFinderTile';

import {
  Box,
  Stack,
  Grid,
  Typography,
} from '@mui/material';
const images = require.context('../images/Hedge-Finder-Images', true);
const imageList = images.keys().map(image => images(image));
const names = [
  'Bear Spread', 'Bull Spread', 'Butterfly Spread', 'Condor Spread',
  'Long Call', 'Long Put', 'Risk Reversal', 'Short Call',
  'Short Put', 'Straddle', 'Strangle', 'Strip'
]

/**
 * The Tiles component for displaying and selecting hedge finder tiles.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Tiles() {
  
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{ borderBottom: 1, width: "100%", marginBottom: "4%" }}>
            <h1 className="screener-h1">Tiles</h1>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography
                gutterBottom
                variant='h4'
                component='div'
                textAlign='center'
              >
                Shopping Cart
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Grid container spacing={2}>
                {
                  imageList.map((e, i) =>
                    <Grid key={e} item xs={3}>
                      <HedgeFinderTile
                        name={names[i]}
                        src={e}
                      />
                    </Grid>
                  )
                }
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Tiles;