import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

	const genericLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

	const googleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const logOut = () => signOut(auth)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ createUser, genericLogin, googleLogin, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};


const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
export default AuthContextProvider;