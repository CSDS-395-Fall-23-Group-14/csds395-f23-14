import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	updateProfile,
	updatePassword,
	EmailAuthProvider,
	reauthenticateWithCredential,
	reauthenticateWithPopup,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

import { DataContext } from './DataContext';
import { StorageContext } from './StorageContext';

/**
 * @typedef AuthContext A context for managing authentication.
 * @property {() => boolean} isAuthenticated Returns whether a user is authenticated or not.
 * @property {() => boolean} isGoogleAuthenticated Returns whether a user is authenticated with Google.
 * @property {(firstName: any, lastName: any, email: any, password: any) => Promise<UserCredential>} genericSignup Creates a new user account with the provided email and password.
 * @property {(email: string, password: string) => Promise<import('firebase/auth').UserCredential>} genericLogin Logs in a user with the provided email and password.
 * @property {() => Promise<UserCredential>} googleLogin Logs in a user with Google authentication.
 * @property {(password: string) => Promise<UserCredential>} reauthenticateGeneric Re-authenticates a user signed in with username and email.
 * @property {() => Promise<UserCredential>} reauthenticateGoogle Re-authenticates a user signed in with Google.
 * @property {() => Promise<void>} logOut Logs out the currently authenticated user.
 * @property {() => Promise<object>} getUserProfile Gets the profile of the currently authenticated user
 * @property {(profile: object) => Promise<void>} updateUserProfile Updates the profile of the currently authenticated user.
 * @property {() => string | null} getUserAvatar Gets the user's avatar image file url.
 * @property {(file: File) => Promise<void>} updateUserAvatar Updates the avatar of the currently authenticated user.
 * @property {() => string | null} getUserDispName Gets the user's display name.
 * @property {(name: string) => Promise<void>} updateUserDispName Updates the display name of the currently authenticated user.
 * @property {(password: string) => Promise<void>} updateUserPassword Updates the password of the currently authenticated user.
 * @property {null | import('firebase/auth').User } currUser The current user account.
 */

/**
 * @type {import("react").Context<AuthContext>}
 */
const AuthContext = createContext();

/**
 * A provider component for managing user authentication.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the authentication provider.
 * @returns {JSX.Element} The rendered React component.
 */
function AuthContextProvider({ children }) {
	const [currUser, setCurrUser] = useState(auth.currentUser);
	const { uploadAvatar } = useContext(StorageContext);
	const { setUserDoc, getUserDoc } = useContext(DataContext);
	
	useEffect(() => {
		// Grab user cred data from localStorage to avoid waiting for the server
		setCurrUser(JSON.parse(localStorage.getItem("user")));
		// console.log(currUser?.providerData[0])
		
		// Update the user whenever the authentication state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrUser(user);
			localStorage.setItem('user', JSON.stringify(user));
		});
		return () => unsubscribe();
	}, []);
	
	const isAuthenticated = () => currUser !== null
	
	const isGoogleAuthenticated = () => isAuthenticated() && currUser.providerData.some((provider) => provider.providerId === 'google.com');
	
	const genericSignup = async (firstName, lastName, email, password) => {
		try {
			const userCred = await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(userCred.user, { displayName: firstName + ' ' +  lastName });
			await setUserDoc(userCred.user.uid, {
				first_name: firstName,
				last_name: lastName
			});
			return userCred;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
	
	const genericLogin = async (email, password) => {
		const userCred = await signInWithEmailAndPassword(auth, email, password);
		return userCred;
	}
	
	const googleLogin = async () => {
		const provider = new GoogleAuthProvider();
		const userCred = await signInWithPopup(auth, provider);
		
		// Add user to the database if it isn't already there
		const userDoc = await getUserDoc(userCred.user.uid);
		if (!userDoc)
			await setUserDoc(userCred.user.uid, {});
		
		return userCred;
	}
	
	const reauthenticateGeneric = async (password) => {
		const authCred = EmailAuthProvider.credential(currUser.email, password);
		const userCred = await reauthenticateWithCredential(currUser, authCred);
		return userCred;
	}
	
	const reauthenticateGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const userCred = await reauthenticateWithPopup(currUser, auth, provider);
		return userCred;
	}
	
	const logOut = async () => {
		return await signOut(auth);
	}
	
	const getUserProfile = async () => {
		const userDoc = await getUserDoc(currUser.uid);
		return userDoc;
	}
	
	const updateUserProfile = async (profile) => {
		return await setUserDoc(currUser.uid, profile);
	}
	
	const getUserAvatar = () => {
		return currUser.photoURL;
	}
	
	const updateUserAvatar = async (file) => {
		const url = await uploadAvatar(file, currUser.uid);
		return await updateProfile(currUser, { photoURL: url });
	}
	
	const getUserDispName = () => {
		return currUser.displayName;
	}
	
	const updateUserDispName = async (name) => {
		return await updateProfile(currUser, {displayName: name});
	}
	
	const updateUserPassword = async (password) => {
		return await updatePassword(currUser, password);
	}
	
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isGoogleAuthenticated,
				genericSignup,
				genericLogin,
				googleLogin,
				reauthenticateGeneric,
				reauthenticateGoogle,
				logOut,
				getUserProfile,
				updateUserProfile,
				getUserAvatar,
				updateUserAvatar,
				getUserDispName,
				updateUserDispName,
				updateUserPassword,
				currUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
export default AuthContextProvider;