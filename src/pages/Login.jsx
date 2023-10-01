import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
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

/**
 * The Login component for user authentication.
 *
 * @component
 */
function Login() {
	const { genericLogin, googleLogin, user } = useAuth();
	const [isWrongPass, setIsWrongPass] = useState(false);
	
	/**
	 * Handles Google login button click event.
	 * Calls the Google login function and handles any errors.
	 *
	 * @async
	 * @function
	 */
	const handleGoogleLogin = async () => {
		try {
			await googleLogin();
		} catch (error) {
			console.log(error);
		}
	};
	
	
	/**
	 * Handles the generic login form submission.
	 * Calls the generic login function with user-provided email and password.
	 * Sets the "isWrongPass" state if login fails.
	 *
	 * @async
	 * @function
	 * @param {Event} event - The form submission event.
	 */
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
		user ? <Navigate to='/home'/> :
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
							label='Email Address'
							name='email'
							type='email'
							fullWidth
						/>
						<TextField
							margin='normal'
							label='Password'
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
						
						{"Don't have an account? "}
						<Link href='/signup'>
							{"Sign Up"}
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