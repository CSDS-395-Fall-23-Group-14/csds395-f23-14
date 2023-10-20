import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Tab,
	Tabs,
	Button,
	IconButton,
	TextField,
	Avatar,
} from '@mui/material';
import {
	Brightness4,
	Brightness7,
} from '@mui/icons-material';
import { TabContext } from '@mui/lab';

import logo from "../../images/EZ$-logo-transparent.png";
import "./navbar.css";

import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

function NavBar() {
	const navigate = useNavigate();
  const { logOut, getUserAvatar } = useContext(AuthContext);
	const { setThemeMode, themeMode } = useContext(ThemeContext);
	const [avatar, setAvatar] = useState(null);
	
	useEffect(() => {
		setAvatar(getUserAvatar());
	}, [getUserAvatar])
	
	return(
		<div className="wrapper">
			<div className="navbar-left">
				<div className="logo-wrapper"> 
					<img
						src={logo}
						height={120}
						alt="logo"
						style={{ filter: themeMode === "dark" ? 'invert(1)' : '' }}
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
					<IconButton onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
						{
							themeMode === 'dark' ?
							<Brightness7 sx={{ width: 35, height: 35 }} /> :
							<Brightness4 sx={{ width: 35, height: 35 }} />
						}
					</IconButton>
				</div>
				<div className="user-icon">
					<IconButton onClick={() => navigate('/profile')}>
						<Avatar
							alt="avatar"
							src={avatar}
							sx={{ width: 35, height: 35 }}
						/>
					</IconButton>
				</div>
				<div className="logout-button">
					<Button
						variant="outlined"
						onClick={() => logOut()}
					>
						Log Out
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
