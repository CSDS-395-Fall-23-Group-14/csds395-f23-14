import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
	Button,
	TextField,
	Box,
	Grid,
} from '@mui/material';

import logo from '../images/EZ$-logo-transparent.png';
import loginbg from '../images/loginbg.png';
import { useAuth } from '../context/AuthContext';
import { useDB } from '../context/DataContext';

/**
 * The Profile component for displaying and editing user data.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Profile() {
  const { user } = useAuth();
  const { updateUserProfile, getUserProfile } = useDB();
	const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const porfolio = [
    { value: "1", label: 'Conservative' },
    { value: "2", label: 'Moderate' },
    { value: "3", label: 'Growth' },
  ];

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid)
        .then((data) => {
          setProfile(data)
        })
    }
  }, [user]);

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
    const p = {
      firstName: data.get('first_name'),
      lastName: data.get('last_name'),
      job: data.get('job'),
      organization: data.get('organization'),
      porfolio: data.get('porfolio'),
    }
		
		try {
			updateUserProfile(user.uid, p.firstName, p.lastName, p.job, p.organization, p.porfolio);
		} catch (error) {
			  console.error(error);
		}
	};

  return (
    user && profile ? 
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
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<TextField
								margin='normal'
								label='First Name'
								name='first_name'
								type='type'
                defaultValue={profile.first_name}
							/>
							<TextField
								margin='normal'
								label='Last Name'
								name='last_name'
								type='text'
                defaultValue={profile.last_name}
							/>
						</Box>
            <TextField
								margin='normal'
								label='Job'
								name='job'
								type='text'
                defaultValue={profile.job}
                fullWidth
						  />
            <TextField
              margin='normal'
              label='Organization'
              name='organization'
              type='text'
              defaultValue={profile.organization}
              fullWidth
            />
            <TextField
              margin='normal'
              name="year-investing"
              id="outlined-number"
              label="Years of Investing"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              name="porfolio"
              margin='normal'
              fullWidth
              select
              label="Porfolio"
              defaultValue={profile.porfolio}
              helperText="Please select your investment porfolio"
            >
              {porfolio.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
    : <></>
  )
}

export default Profile;