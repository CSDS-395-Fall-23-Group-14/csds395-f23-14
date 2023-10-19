import React from 'react'
import Navbar from '../components/navbar/navbar';

/**
 * The Tiles component for displaying and editing user data.
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
      <div>Tiles</div>
    </>
  );
}

export default Tiles;