import React, { createContext, useContext } from 'react';
import { addDoc, collection, query, getDoc, getDocs, limit, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

// Create a context for managing queries and posts to the database.
const DataContext = createContext();

/**
 * A provider component for managing queries and posts to the database.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the authentication provider.
 * @returns {JSX.Element} The rendered React component.
 */
function DataContextProvider({ children }) {
	/**
	 * Posts a new document to the 'users' collection with the specified `firstname` and `lastname`
	 * 
	 * @param {String} firstName The first name of the user.
	 * @param {String} lastName The last name of the user.
	 * @returns {Promise} A promise that resolves when the document is posted.
	 */
	const addUser = (uid, firstName, lastName) =>
			setDoc(doc(db, "users", uid), {
				first_name: firstName,
				last_name: lastName
			  });

    const updateUserProfile = (uid, firstName, lastName, job, yearInvesting, organization, porfolio) =>
			updateDoc(doc(db, "users", uid), {
				first_name: firstName,
				last_name: lastName,
				job: job,
				yearInvesting: yearInvesting,
				organization: organization,
				porfolio: porfolio,
			});

	const updateUserProfileAvatar = (uid, avatar) =>
			updateDoc(doc(db, "users", uid), {
				avatar: avatar
			});

	/**
	 * Gets all stocks from db
	 * *******************
	 * We shouldn't really use this bc 50,000 doc read limit per day.
	 * Only about 25 calls of this function allowed per day
	 * ************************************************
	 * 
	 * Returns an array with the data
	 */
	const getAllStocks = async () => {
		const snapshot = await getDocs(collection(db, 'stocks'));
		return snapshot.docs.map(stock => stock.data());
	}

	/**
	 * Gets all stocks from db
	 * *******************
	 * We shouldn't really use this bc 50,000 doc read limit per day.
	 * Only about 25 calls of this function allowed per day
	 * This one is less risky than the stocks getAll
	 * ************************************************
	 * 
	 * Returns an array with the data
	 */
	const getAllOptions = async () => {
		const snapshot = await getDocs(collection(db, 'options'));
		return snapshot.docs.map(option => option.data());
	}

	/**
	 * Fetches first 25 stocks from the db
	 * @returns the first 25 stocks as an array
	 */
	const get25Stocks = async () => {
		const q = query(collection(db, 'stocks'), limit(25));
		const snapshot = await getDocs(q);
		return snapshot.docs.map(stock => stock.data());
	}

	/**
	 * Fetches the first 25 options from the db
	 * @returns the first 25 options as an array
	 */
	const get25Options = async () => {
		const q = query(collection(db, 'options'), limit(25));
		const snapshot = await getDocs(q);
		return snapshot.docs.map(option => option.data());
	}

	const getUserProfile = (uid) => {
		return getDoc(doc(db, "users", uid)).then((res) => res.data());
	}

	return (
		<DataContext.Provider value={{
			addUser, get25Stocks, get25Options, getAllOptions, getAllStocks, updateUserProfile, getUserProfile, updateUserProfileAvatar
		}}>
			{children}
		</DataContext.Provider>
	);

}

/**
 * A hook for accessing database related functions.
 *
 * @returns {object} An object containing database related functions.
 * @property {function} addUser - Function to add a new user document.
 */
const useDB = () => {
	return useContext(DataContext);
};

export { useDB };
export default DataContextProvider;