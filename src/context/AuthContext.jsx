import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	updateProfile,
	updatePassword
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useDB } from './DataContext';

// Create a context for managing authentication.
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
	const [user, setUser] = useState(null);
	const { addUser, getUser, updateUserProfileAvatar } = useDB();
	
	/**
	 * Creates a new user account with the provided email and password.
	 *
	 * @param {string} email - The user's email address.
	 * @param {string} password - The user's password.
	 * @returns {Promise} A promise that resolves when the user account is created.
	 */
	const createUser = async (firstName, lastName, email, password) =>
		await createUserWithEmailAndPassword(auth, email, password)
			.then((user) => {
				updateProfile(user.user, { displayName: email.split("@")[0] });
				addUser(user.user.uid, firstName, lastName);
			});

	const updateUserPassword = async (user, password) => await updatePassword(user, password);

	/**
	 * Logs in a user with the provided email and password.
	 *
	 * @param {string} email - The user's email address.
	 * @param {string} password - The user's password.
	 * @returns {Promise} A promise that resolves when the user is successfully logged in.
	 */
	const genericLogin = async (email, password) => await signInWithEmailAndPassword(auth, email, password);
	
	/**
	 * Logs in a user using Google authentication.
	 */
	const googleLogin = async () => {
		console.log('loggin in with google')
		const provider = new GoogleAuthProvider();
		const userCred = await signInWithPopup(auth, provider)
		const userDoc = await getUser(userCred.user.uid)
		if (!userDoc.exists()) {
			addUser(userCred.user.uid, userCred.user.displayName, "");
			updateUserProfileAvatar(userCred.user.uid, userCred.user.photoURL);
		}
			
		return userCred
	};
	
	/**
	 * Logs out the currently authenticated user.
	 */
	const logOut = async () => await signOut(auth);
	
	/**
	 * Updates the profile of the currently authenticated user.
	 * 
	 * @param {object} profile - The profile's `displayName` and `photoURL` to update.
	 * @param {string} profile.displayName
	 * @param {string} profile.photoURL
	 */
	const updateUserProfile = async (profile) => await updateProfile(user, profile);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
		return () => unsubscribe();
	}, []);
	
	return (
		<AuthContext.Provider
			value={{
				createUser,
				genericLogin,
				googleLogin,
				logOut,
				updateUserProfile,
				updateUserPassword,
				user
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};


/**
 * A hook for accessing authentication-related functions and the current user.
 *
 * @returns {object} An object containing authentication functions and the current user.
 * @property {function} createUser - Function to create a new user account.
 * @property {function} genericLogin - Function to log in a user with email and password.
 * @property {function} googleLogin - Function to log in a user with Google authentication.
 * @property {function} logOut - Function to log out the current user.
 * @property {function} updateUserProfile - Function to update the current user's profile.
 * @property {function} updateUserProfile - Function to update the current user's profile.
 * @property {object} user - The current authenticated user object.
 */
const useAuth = () => {
	return useContext(AuthContext);
};

export { useAuth };
export default AuthContextProvider;