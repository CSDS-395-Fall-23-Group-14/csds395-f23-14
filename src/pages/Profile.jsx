import React, { useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
	TextField,
	Box,
	Grid,
	Alert
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from "@mui/icons-material/UploadFile";

import loginbg from '../images/loginbg.png';
import { AuthContext } from '../context/AuthContext';

/**
 * The Profile page for displaying and editing user data.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Profile() {
	const {
		reauthenticateGeneric,
		getUserProfile,
		updateUserProfile,
		getUserAvatar,
		updateUserAvatar,
		getUserDispName,
		updateUserDispName,
		updateUserPassword,
		currUser
	} = useContext(AuthContext);
	
	console.log(currUser);
	const isGoogleAuthenticated = currUser.providerData[0].providerId === 'google.com';
	
	const [ error, setError] = useState(null);
	const [ profile, setProfile] = useState(null); // May not be needed
	
	const [imageLoading, setImageLoading] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [avatar, setAvatar] = useState(getUserAvatar());
	const [dispName, setDispName] = useState(getUserDispName());
	
	const portfolio = [
		{ value: "1", label: 'Conservative' },
		{ value: "2", label: 'Moderate' },
		{ value: "3", label: 'Growth' },
	];

	
	useEffect(() => {
		setProfile(async () => await getUserProfile());
	}, [getUserProfile]);
	
	const refreshAvatar = (() => {
		setAvatar(getUserAvatar());
	});
	
  /**
	 * Handles the profile update
	 * Calls the updateUser and updatePassword function with user-provided info and password.
	 * Updates the user profile and adds user data to Firestore upon successful update
	 *
	 * @param {Event} event The form submission event.
	 */
	const handleProfileUpdate = async (event) => {
		event.preventDefault();
		setProfileLoading(true);
		const data = new FormData(event.currentTarget);
		
		const newPassword = data.get('new_password');
		const oldPassword = data.get('old_password');
		
		if (data.get('first_name') !== '' || data.get('last_name') !== '') {
			await updateUserDispName(data.get('first_name') + ' ' +  data.get('last_name'));
			setDispName(getUserDispName());
		}
		
		// handle user information update
		await updateUserProfile({
			job: data.get('job'),
			yearsInvesting: data.get('year_investing'),
			organization: data.get('organization'),
			portfolio: data.get('porfolio'),
		});
		
		// handle password update
		if (newPassword && !oldPassword)
			setError('Missing current password');
		
		if (newPassword && oldPassword ) {
			// Re-authenticate the user (password change requires recent sign in)
			await reauthenticateGeneric(oldPassword);
			
			try {
				await updateUserPassword(newPassword);
			} catch (error) {
				switch (error.code) {
					case 'auth/weak-password':
						setError('Password should be at least 6 characters'); break;
					case "auth/wrong-password":
						setError('Wrong current password'); break;	
					default:
						console.error(error);
				}
			}
		}
		setProfileLoading(false);
	}
	
	/**
	 * Handles the avatar update
	 * 
	 * @param {File} file The image upload event
	 */
	const uploadImage = async (file) => {
		setImageLoading(true);
		await updateUserAvatar(file);
		refreshAvatar();
		setImageLoading(false);
	}
	
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
					<Avatar
						alt="avatar"
						src={avatar}
						sx={{ width: 200, height: 200, marginBottom: 3 }}
					/>
					{
						isGoogleAuthenticated ? <></> : 
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<LoadingButton
								component="label"
								color="secondary"
								variant="outlined"
								startIcon={<CloudUploadIcon />}
								loading={imageLoading}
								sx={{ marginRight: "1rem" }}
							>
								Upload Image
								<input
									type="file"
									accept="image/*"
									hidden
									onChange={(event) => uploadImage(event.target.files[0])}
								/>
							</LoadingButton>
						</Box>
					}
					<h3>{dispName}</h3>
					<Box
						component="form"
						sx={{ alignItems:'center' }}
						onSubmit={(event) => handleProfileUpdate(event)}
					>
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<TextField
								margin='normal'
								label='First Name'
								name='first_name'
								fullWidth
								type='type'
							/>
							<TextField
								margin='normal'
								label='Last Name'
								name='last_name'
								fullWidth
								type='type'
							/>
						</Box>
						<TextField
							margin='normal'
							label='Email'
							name='email'
							type='text'
							disabled={true}
							fullWidth
						/>
						{error ? <Alert severity="error">{error}</Alert> : null}
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<TextField
								margin='normal'
								label='Old Password'
								name='old_password'
								type='password'
								fullWidth
							/>
							<TextField
								margin='normal'
								label='New Password'
								name='new_password'
								type='password'
								fullWidth
							/>
						</Box>
						<TextField
							margin='normal'
							label='Job'
							name='job'
							type='text'
							fullWidth
						/>
						<TextField
							margin='normal'
							label='Organization'
							name='organization'
							type='text'
							fullWidth
						/>
						<TextField
							margin='normal'
							name="year_investing"
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
						>
							{portfolio?.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
							</TextField>
						<LoadingButton
							type='submit'
							margin='normal'
							variant='contained'
							loading={profileLoading}
							sx={{ my: 2 }}
							fullWidth
						>
							Update Profile
						</LoadingButton>
					</Box>
				</Box>
			</Grid>
		</Grid>
  )
}

export default Profile;