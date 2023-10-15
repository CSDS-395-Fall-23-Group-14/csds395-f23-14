import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import {
	Button,
	TextField,
	Box,
	Grid,
	Alert,
	Input
} from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import loginbg from '../images/loginbg.png';
import { useAuth } from '../context/AuthContext';
import { useDB } from '../context/DataContext';

import { UploadButton } from "@bytescale/upload-widget-react";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * The Profile component for displaying and editing user data.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function Profile() {
    const { user, updateUserPassword } = useAuth();
	const [ error, setError] = useState(null);
    const { updateUserProfile, getUserProfile, updateUserProfileAvatar } = useDB();
    const [ profile, setProfile] = useState(null);
    const porfolio = [
		{ value: "1", label: 'Conservative' },
		{ value: "2", label: 'Moderate' },
		{ value: "3", label: 'Growth' },
    ];

	const storage = getStorage();
	const [selectedImage, setSelectedImage] = useState(null);

	const options = {
        apiKey: "public_FW25biM4EW93zG9nPRPXmV67qZaX",
        maxFileCount: 1,
		path: {
			folderPath: "/avatar",
		},
    };

	useEffect(() => {
		if (user) {
		getUserProfile(user.uid)
			.then((data) => {
			setProfile(data)
			})
		}
	}, [user, profile]);

  /**
	 * Handles the profile update
	 * Calls the updateUser and updatePassword function with user-provided info and password.
	 * Updates the user profile and adds user data to Firestore upon successful update
	 *
	 * @async
	 * @function
	 * @param {Event} event - The form submission event.
	 */
	const handleProfileUpdate = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		
		const newPassword = data.get('new_password');
		const oldPassword = data.get('old_password');

		const p = {
			firstName: data.get('first_name'),
			lastName: data.get('last_name'),
			job: data.get('job'),
			yearInvesting: data.get('year_investing'),
			organization: data.get('organization'),
			porfolio: data.get('porfolio'),
		}

		// handle user information update
		updateUserProfile(user.uid, p.firstName, p.lastName, p.job, p.yearInvesting, p.organization, p.porfolio);


		// handle password update
		if (!newPassword && oldPassword) {
				setError('Missing new password');
		}
		if (!oldPassword && newPassword ) {
			setError('Missing current password');
		}

		if (newPassword && oldPassword ) {
			const credential = EmailAuthProvider.credential(user.email, oldPassword);
	
			// reaunthenticate the user first as password change requires recent sign in
			reauthenticateWithCredential(user, credential)
				.then((response) => {
					console.log(response);
					updateUserPassword(user, newPassword);
				}).catch((error) => {
					switch (error.code) {
						case 'auth/weak-password':
							setError('Password should be at least 6 characters'); break;
						case "auth/wrong-password":
							setError('Wrong current password'); break;	
						default:
							console.error(error);
					}
				});
			}
			
		}

	const onImageUploadComplete = async (event) => {
		const file = event.target.files[0];

		const storageRef = ref(storage, `/${user.uid}${file.name}`);
		const metadata = {
			contentType: 'image/*',
		};
		await uploadBytes(storageRef, file, metadata)
			.then((snapshot) => {
				console.log('Uploaded a blob or file!');
			})

			await getDownloadURL(ref(storage, `/${user.uid}${file.name}`))
					.then((url) => {
						console.log(url);
						updateUserProfileAvatar(user.uid, url);
			});
		
		
	}

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
					
					<Avatar
						alt="avatar"
						src={profile.avatar}
						sx={{ width: 200, height: 200, marginBottom: 3 }}
					/>
					<Input
						type="file"
						fullWidth
						onChange={onImageUploadComplete}
					/>
					<Box
						component='form'
						onSubmit={handleProfileUpdate}
						sx={{ alignItems:'center' }}
					>
						<TextField
							margin='normal'
							label='First Name'
							name='first_name'
							fullWidth
							type='type'
							defaultValue={profile.first_name}
						/>
						<TextField
							fullWidth
							margin='normal'
							label='Last Name'
							name='last_name'
							type='text'
							defaultValue={profile.last_name}
						/>
						<TextField
							margin='normal'
							label='Email'
							name='email'
							type='text'
							disabled
							fullWidth
							defaultValue={user.email}
						/>
						{error ? <Alert severity="error">{error}</Alert> : null}
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
						name="year_investing"
						id="outlined-number"
						label="Years of Investing"
						type="number"
						defaultValue={profile.yearInvesting}
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