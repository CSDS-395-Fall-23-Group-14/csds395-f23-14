import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
	Button,
	TextField,
	Box,
	Grid,
	Alert
} from '@mui/material';

import logo from '../images/EZ$-logo-transparent.png';
import loginbg from '../images/loginbg.png';
import { useAuth } from '../context/AuthContext';

/**
 * The Profile component for displaying and editing user data.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Profile() {
  const { user } = useAuth();
	const [error, setError] = useState(null);
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
	const handleProfileUpdate = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const firstName = data.get('first_name');
		const lastName = data.get('last_name');
		
		try {
			//updateUser(firstName, lastName, email, password);
		} catch (error) {
			  console.error(error);
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
					<h1>Profile</h1>
					<Box
						component='form'
						onSubmit={handleProfileUpdate}
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
              disabled
							fullWidth
						/>
						<Button
							margin='normal'
							type='submit'
							variant='contained'
							sx={{ my: 2 }}
							fullWidth
						>
							Update Profile
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
  )
}

export default Profile;