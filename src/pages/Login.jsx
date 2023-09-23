import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	TextField,
	Link,
	Box,
	Grid,
	Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import logo from '../images/EZ$-logo-transparent.png';
import loginbg from '../images/loginbg.png';
import { useAuth } from '../context/AuthContext';

function Login() {
	const { genericLogin, googleLogin, user } = useAuth();
	const [isWrongPass, setIsWrongPass] = useState(false);
	const navigate = useNavigate();
	
	// If the user changes, redirect to /home
	useEffect(() => {
		if (user)
			navigate('/home');
	}, [navigate, user]);
	
	const handleGoogleLogin = async () => {
		try {
			await googleLogin();
		} catch (error) {
			console.log(error);
		}
	};
	
	const handleGenericLogin = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		
		try {
			await genericLogin(data.get('email'), data.get('password'));
		} catch (error) {
			setIsWrongPass(true);
		}
	};
	
	return (
		<Grid
			container
			sx={{ height: '100vh' }}
		>
			<Grid
				item md={7}
				sx={{
					backgroundImage: `url(${loginbg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>
			<Grid item md={5}>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center'
					}}
				>
					<img src={logo} height={200} alt='logo' />
					<h1>Log In</h1>
					<Box
						component='form'
						onSubmit={handleGenericLogin}
						sx={{alignItems:'center'}}
					>
						{isWrongPass ? <Alert severity="error">Username or password was incorrect</Alert> : null}
						<TextField
							margin='normal'
							label='Email Address - cwru395@gmail.com'
							name='email'
							type='email'
							fullWidth
							autoFocus
						/>
						<TextField
							margin='normal'
							label='Password - ezmoney'
							name='password'
							type='password'
							fullWidth
						/>
						<Button
							margin='normal'
							type='submit'
							variant='contained'
							sx={{ my: 2 }}
							fullWidth
						>
							Log in
						</Button>
						
						<Link href='/signup'>
							{"Don't have an account? Sign Up"}
						</Link>
						
						<h3 align-self='centered'>or</h3>
						<Button
							sx={{ px: 10 }}
							onClick={handleGoogleLogin}
							variant='outlined'
							startIcon={<GoogleIcon />}
							fullWidth
						>
							Sign in with Google
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
  );
}

export default Login;