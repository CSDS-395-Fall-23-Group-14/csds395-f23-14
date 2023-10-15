
import React from "react";
import logo1 from "../../images/EZ$-logo-transparent.png";
import "./navbar.css";
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import {Box, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
	const navigate = useNavigate();
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
	
	return(
		<div className="wrapper">
			<div className="navbar-left">
				<div className="logo-wrapper">
					<img src={logo1} height={60} alt="logo"></img>
				</div>
			</div>
			<div className="navbar-center">
				<div className="search-wrapper">
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<TextField InputProps={{ sx: {borderRadius: 10, '&.Mui-focused fieldset': {borderColor: 'yellow'}}}} id="outlined-basic" size="small" label="Search" variant="outlined" />
					</Box>
				</div>
				<div className="tab-menu">
					<Box sx={{ width:'100%'}}>
						<TabContext>
							<Box sx={{border: 1, borderColor: 'divider', maxWidth: {sm: 600}}}>
								<Tabs variant="scrollable">
									<Tab label='Home' onClick={() => navigate('/')}/>
									<Tab label='Options' onClick={() => navigate('/optionscreener')}/>
									<Tab label='Tiles'onClick={() => navigate('/tiles')}/>
								</Tabs>
							</Box>
						</TabContext>
					</Box>
				</div>
			</div>
			<div className="navbar-right">
				<div className="user-icon">
					<IconButton onClick={() => navigate('/profile')}>
						<PersonIcon fontSize="large"/>
					</IconButton>
				</div>
				<Button
        	variant="outlined"
        	onClick={handleLogOut}>
        	Log Out
      	</Button>
			</div>
		</div>
	);
}