import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
	
	/**
	 * Creates a new user account with the provided email and password.
	 *
	 * @param {string} email - The user's email address.
	 * @param {string} password - The user's password.
	 * @returns {Promise} A promise that resolves when the user account is created.
	 */
	const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
	
	/**
	 * Logs in a user with the provided email and password.
	 *
	 * @param {string} email - The user's email address.
	 * @param {string} password - The user's password.
	 * @returns {Promise} A promise that resolves when the user is successfully logged in.
	 */
	const genericLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
	
	/**
	 * Logs in a user using Google authentication.
	 */
	const googleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};
	
	/**
	 * Logs out the currently authenticated user.
	 */
	const logOut = () => signOut(auth);
	
	/**
	 * Updates the profile of the currently authenticated user.
	 * 
	 * @param {object} profile - The profile's `displayName` and `photoURL` to update.
	 * @param {string} profile.displayName
	 * @param {string} profile.photoURL
	 */
	const updateUserProfile = (profile) => updateProfile(user, profile);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {console.log(currentUser); setUser(currentUser)});
		return () => unsubscribe();
	}, []);
	
	return (
		<AuthContext.Provider value={{
			createUser, genericLogin, googleLogin, logOut, updateUserProfile, user
		}}>
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
 * @property {object} user - The current authenticated user object.
 */
const useAuth = () => {
	return useContext(AuthContext);
};

export { useAuth };
export default AuthContextProvider;