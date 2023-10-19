import React, { useContext } from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Tab,
	Tabs,
	Button,
	IconButton,
	TextField
} from '@mui/material';
import {
	Person,
	Brightness4,
	Brightness7
} from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';

import logo from "../../images/EZ$-logo-transparent.png";
import "./navbar.css";

import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
	const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
	const { setThemeMode, themeMode } = useContext(ThemeContext);
	
	return(
		<div className="wrapper">
			<div className="navbar-left">
				<div className="logo-wrapper"> 
					<img
						src={logo}
						height={60}
						alt="logo"
						style={{
							filter: themeMode === "dark" ? 'invert(1)' : ''
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
						onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
					>
						{themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</div>
				
				<div className="user-icon">
					<IconButton onClick={() => navigate('/profile')}>
						<Person fontSize="large"/>
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