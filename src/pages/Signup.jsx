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
import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../src/firebaseConfig';

/**
 * The SignUp component for user registration.
 *
 * @component
 */
function SignUp() {
	const { createUser, googleLogin, user } = useAuth();
	const [error, setError] = useState(null);
	
	/**
	 * Handles Google signup button click event.
	 * Calls the Google login function and handles any errors.
	 *
	 * @async
	 * @function
	 */
	const handleGoogleSignup = async () => {
		try {
			await googleLogin();
		} catch (error) {
			console.log(error);
		}
	};
	
	/**
	 * Handles the generic signup form submission.
	 * Calls the createUser function with user-provided email and password.
	 * Updates the user profile and adds user data to Firestore upon successful signup.
	 * Sets the "error" state if signup fails.
	 *
	 * @async
	 * @function
	 * @param {Event} event - The form submission event.
	 */
	const handleGenericSignup = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		
		try {
			await createUser(data.get('email'), data.get('password'))
			.then((user) => {
				const displayName = user.user.email.split("@")[0];
				updateProfile(user.user, {
					displayName: displayName
				});
				addDoc(collection(db, "users"), {
					first_name: data.get('first_name'), last_name: data.get('last_name')
				})
			});
		
		} catch (error) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					setError('Email is already in use'); break;
				case 'auth/weak-password':
					setError('Password should be at least 6 characters'); break;
				case 'auth/missing-password':
					setError('Please enter a password'); break;
				default:
					console.error(error);
			}
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
					<h1>Sign Up</h1>
					<Box
						component='form'
						onSubmit={handleGenericSignup}
						sx={{ alignItems:'center' }}
					>
						{error ? <Alert severity="error">{error}</Alert> : null}
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<TextField
								margin='normal'
								label='First Name'
								name='first_name'
								type='first_name'
							/>
							<TextField
								margin='normal'
								label='Last Name'
								name='last_name'
								type='last_name'
							/>
						</Box>
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
							Sign Up
						</Button>
						
						{"Already have an account? "}
						<Link href='/login'>
							{"Log In"}
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