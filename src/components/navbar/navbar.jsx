import React from "react";
import logo from "../../images/EZ$-logo-transparent.png";
import "./navbar.css";
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import {Box, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar() {
	const navigate = useNavigate();
  const { logOut } = useAuth();
	const { setThemeMode, getThemeMode } = useTheme()
	
	return(
		<div className="wrapper">
			<div className="navbar-left">
				<div className="logo-wrapper"> 
					<img
						src={logo}
						height={60}
						alt="logo"
						style={{
							filter: getThemeMode() === "dark" ? 'invert(1)' : ''
						}}
					/>
				</div>
			</div>
			<div className="navbar-center">
				<div className="search-wrapper">
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<TextField
							InputProps={{
								sx: {
									borderRadius: 10,
									'&.Mui-focused fieldset': {borderColor: 'yellow'}
								}
							}}
							id="outlined-basic"
							size="small"
							label="Search"
							variant="outlined"
						/>
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
				<div className="theme-button">
					<IconButton
						sx={{ ml: 1 }}
						onClick={() => setThemeMode(getThemeMode() === 'dark' ? 'light' : 'dark')}
					>
						{getThemeMode() === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</div>
				
				<div className="user-icon">
					<IconButton onClick={() => navigate('/profile')}>
						<PersonIcon fontSize="large"/>
					</IconButton>
				</div>
				
				<div className="logout-button">
					<Button
						variant="outlined"
						onClick={() => logOut()}>
						Log Out
					</Button>
				</div>
			</div>
		</div>
	);
}