import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography
} from '@mui/material';

import { ThemeContext } from '../../context/ThemeContext';

function HedgeFinderTile({ name, src }) {
  const { themeMode } = useContext(ThemeContext);
  
  return (
    <Card>
      <CardActionArea >
        <CardMedia
          component="img"
          height='110'
          image={src}
          alt={name}
          style={{ filter: themeMode === "dark" ? 'invert(1)' : '' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            textAlign='center'
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default HedgeFinderTile;