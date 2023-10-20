import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import {
	TextField,
	Box,
	Grid,
	Alert,
	Avatar,
	MenuItem,
	IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CloudUpload, ArrowBack } from "@mui/icons-material";

import loginbg from '../images/loginbg.png';
import { AuthContext } from '../context/AuthContext';

/**
 * The Profile page for displaying and editing user data.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Profile() {
	const {
		isGoogleAuthenticated,
		reauthenticateGeneric,
		getUserProfile,
		updateUserProfile,
		getUserAvatar,
		updateUserAvatar,
		getUserDispName,
		updateUserDispName,
		updateUserPassword
	} = useContext(AuthContext);
	
	const navigate = useNavigate();
	
	const [error, setError] = useState(null);
	const [profile, setProfile] = useState({first_name: '', last_name: ''}); // May not be needed
	const [imageLoading, setImageLoading] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [dispName, setDispName] = useState(getUserDispName());
	
	const portfolio = [
		{ value: "1", label: 'Conservative' },
		{ value: "2", label: 'Moderate' },
		{ value: "3", label: 'Aggressive' },
	];
	
	useEffect(() => {
		console.log(profile);
		console.log("use effect");
		const refreshProfile = async () => {
			const prof = await getUserProfile();
			console.log(prof);
			setProfile(prof);
			console.log(profile);
			console.log(profile.first_name);
	    }
	    refreshProfile();
		// setProfile(async () => await getUserProfile());
	}, []);
	
	useEffect(() => {
		setAvatar(getUserAvatar());
	}, [getUserAvatar])
	
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
		const currentProfile = {
			job: data.get('job'),
			yearsInvesting: data.get('year_investing'),
			organization: data.get('organization'),
			portfolio: data.get('porfolio'),
		};
		
		if (data.get('first_name') !== '' || data.get('last_name') !== '') {
			currentProfile.first_name = data.get('first_name');
			currentProfile.last_name = data.get('last_name');
			await updateUserDispName(data.get('first_name') + ' ' +  data.get('last_name'));
			setDispName(getUserDispName());
		}
		
		
		// handle user information update
		await updateUserProfile(currentProfile);
		
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
	 * @param {File} file The image upload event
	 */
	const uploadImage = async (file) => {
		setImageLoading(true);
		await updateUserAvatar(file);
		setAvatar(getUserAvatar());
		setImageLoading(false);
	}
	
	return (

		<Grid
			container
			sx={{ height: '100vh' }}
		>
			<Grid
				item
				md='7'
				sx={{
					backgroundImage: `url(${loginbg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			/>
			<Grid
				item
				md='5'
			>
				<IconButton onClick={() => navigate('/')}>
					<ArrowBack sx={{ width: 35, height: 35 }}/>
				</IconButton>
				<Box
					sx={{
						m: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center'
					}}
				>
					<Avatar
						alt="avatar"
						src={avatar}
						sx={{ width: 150, height: 150 }}
					/>
					{
						isGoogleAuthenticated() ? null : 
						<Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
							<LoadingButton
								sx={{ marginRight: "1rem" }}
								component="label"
								color="secondary"
								variant="outlined"
								startIcon={<CloudUpload />}
								loading={imageLoading}
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
						<Box sx={{ '& > :not(style)': { width: '49.5%' } }}>
							<TextField
								sx={{ mr: '0.5%', my: '0.5%' }}
								margin='normal'
								label='First Name'
								name='first_name'
								fullWidth
								type='type'
								defaultValue="{profile.first_name}"
							/>
							<TextField
								sx={{ ml: '0.5%', my: '0.5%' }}
								margin='normal'
								label='Last Name'
								name='last_name'
								fullWidth
								type='type'
								defaultValue={profile.last_name}
							/>
						</Box>
						{
							isGoogleAuthenticated() ? null :
								<>
									<TextField
										sx={{ my: '0.5%' }}
										label='Email'
										name='email'
										type='text'
										defaultValue={profile.email}
										fullWidth
									/>
									{ error ? <Alert severity="error">{error}</Alert> : null }
									<Box sx={{ '& > :not(style)': { my: '0.5%', width: '49.5%' } }}>
										<TextField
											sx={{ mr: '0.5%'}}
											label='Old Password'
											name='old_password'
											type='password'
											fullWidth
										/>
										<TextField
											sx={{ ml: '0.5%'}}
											label='New Password'
											name='new_password'
											type='password'
											fullWidth
										/>
									</Box>
								</>
						}
						<TextField
							sx={{ my: '0.5%' }}
							label='Job'
							name='job'
							type='text'
							fullWidth
							defaultValue={profile.job}
						/>
						<TextField
							sx={{ my: '0.5%' }}
							label='Organization'
							name='organization'
							type='text'
							defaultValue={profile.organization}
							fullWidth
						/>
						<TextField
							sx={{ my: '0.5%' }}
							id="outlined-number"
							name="year_investing"
							label="Years of Investing"
							type="number"
							fullWidth
							defaultValue={profile.year_investing}
						/>
						<TextField
							sx={{ my: '0.5%' }}
							name="porfolio"
							label="Porfolio Strategy"
							fullWidth
							select
							defaultValue={profile.portfolio}
						>
							{
								portfolio?.map((option) =>
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								)
							}
							</TextField>
						<LoadingButton
							type='submit'
							margin='normal'
							variant='contained'
							loading={profileLoading}
							sx={{ my: '0.5%' }}
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