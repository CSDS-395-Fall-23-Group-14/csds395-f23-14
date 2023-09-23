import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import logo from '../images/EZ$-logo-transparent.png';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';

function SignUp() {
	const { createUser, googleLogin, user } = useAuth();
	const [error, setError] = useState(null);
  const navigate = useNavigate()
	
	// If the user changes, redirect to /home
	useEffect(() => {
		if (user)
			navigate('/home');
	}, [navigate, user]);

	const handleGoogleSignup = async () => {
		try {
			await googleLogin();
		} catch (error) {
			console.log(error);
		}
	};
		
	const handleGenericSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		
		try {
			await createUser(data.get('email'), data.get('password'));
		} catch (error) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					setError('Email is already in use'); break;
				case 'auth/weak-password':
					setError('Password should be at least 6 characters'); break;
				case 'auth/missing-password':
					setError('Please input a password'); break;
				default:
					console.error(error);
			}
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
					backgroundImage: 'url(https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176795.jpg?w=1380&t=st=1695417440~exp=1695418040~hmac=615af3f9d6cc561880b6f6e980f966c00dd09fcc18fc66bd95e902006407ca96)',
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
					<h1>Sign Up</h1>
					<Box component='form'
						onSubmit={handleGenericSignup}
						sx={{alignItems:'center'}}
					>
						{error ? <Alert severity="error">{error}</Alert> : null}
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
							Sign Up
						</Button>
						
						<Link href='/login'>
							{"Already have an account? Log In"}
						</Link>
						
						<h3>or</h3>
						<Button
							onClick={handleGoogleSignup}
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
  )
}

export default SignUp;