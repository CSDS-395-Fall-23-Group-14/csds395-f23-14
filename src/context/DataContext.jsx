import React, { createContext, useContext } from 'react';
import { addDoc, collection } from "firebase/firestore";
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
	const addUser = (firstName, lastName) =>
			addDoc(collection(db, "users"), {
				first_name: firstName,
				last_name: lastName
			});

	return (
		<DataContext.Provider value={{
			addUser
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