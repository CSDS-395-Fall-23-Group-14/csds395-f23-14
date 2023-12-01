import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Button,
	IconButton,
	TextField,
	Avatar,
	Badge,
	Modal,
	Typography
} from '@mui/material';
import {
	Brightness4,
	Brightness7,
	ShoppingCartOutlined
} from '@mui/icons-material';

import logo from "../../images/EZ$-logo-navbar.png";
import "./navbar.css";

import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

import EnhancedTable from '../EnhancedTable/EnhancedTable';

function NavBar() {
	const navigate = useNavigate();
  	const { logOut, getUserAvatar } = useContext(AuthContext);
	const { setThemeMode, themeMode } = useContext(ThemeContext);
	const [avatar, setAvatar] = useState(null);
	
	const [shoppingCartOpen, setShoppingCartOpen] = useState(false);
	
	useEffect(() => {
		setAvatar(getUserAvatar());
	}, [getUserAvatar])
	
	return(
		<div className="wrapper">
			<div className="navbar-left">
				<div className="logo-wrapper"> 
					<img
						src={logo}
						height={80}
						alt="logo"
						style={{ filter: themeMode === "dark" ? 'invert(1)' : '' }}
					/>
				</div>
			</div>
			<div className="navbar-center">
				<div className="search-wrapper">
					<Box sx={{ display: 'flex', alignItems: 'flex-end', pr: '1rem' }}>
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
				<div>
					<Box sx={{ width:'100%', border: 1, borderColor: 'divider', maxWidth: {sm: 600}}}>
						<Button label='Home' size='large' onClick={() => navigate('/')}>Stocks</Button>
						<Button label='Options' size='large' onClick={() => navigate('/options')}>Options</Button>
						<Button label='Tiles'size='large' onClick={() => navigate('/tiles')}>Tiles</Button>
						<Button label='UserManual'size='large' onClick={() => navigate('/usermanual')}>User Manual</Button>
					</Box>
				</div>
			</div>
			<div className="navbar-right">
				<div className="cart-button" sx={{ pl: '1rem' }}>
					<IconButton onClick={() => setShoppingCartOpen(true)}>
  					<Badge badgeContent={1} color="secondary">
							<ShoppingCartOutlined sx={{ width: 35, height: 35 }} />
  					</Badge>
					</IconButton>
				</div>
				<div className="theme-button" sx={{ pl: '1rem' }}>
					<IconButton onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}>
						{
							themeMode === 'dark' ?
							<Brightness7 sx={{ width: 35, height: 35 }} /> :
							<Brightness4 sx={{ width: 35, height: 35 }} />
						}
					</IconButton>
				</div>
				<div className="user-icon" sx={{ pl: '1rem' }}>
					<IconButton onClick={() => navigate('/profile')}>
						<Avatar
							alt="avatar"
							src={avatar}
							sx={{ width: 35, height: 35 }}
						/>
					</IconButton>
				</div>
				<div className="logout-button" sx={{ pl: '1rem' }}>
					<Button
						variant="outlined"
						onClick={() => logOut()}
					>
						Log Out
					</Button>
				</div>
			</div>
			<Modal
				open={shoppingCartOpen}
				onClose={() => setShoppingCartOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4
					}}
					textAlign='center'
				>
					<Typography variant="h5" component="h2" gutterBottom>
						Shopping Cart
					</Typography>
					<EnhancedTable
						autoHeight
						loading={true}
					/>
				</Box>
			</Modal>
		</div>
	);
}

export default NavBar;
