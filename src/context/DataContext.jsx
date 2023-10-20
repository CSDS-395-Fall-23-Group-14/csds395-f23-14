import React, { createContext } from 'react';
import { collection, query, getDoc, getDocs, limit, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';

/**
 * @typedef DataContext A context for managing queries and posts to the database.
 * @property {(uid: string, profile: object) => Promise<void>} setUserDoc Creates/updates the user document with the specified values.
 * @property {(uid: string) => Promise<object>} getUserDoc Returns the data in specified user's document.
 * @property {() => Promise<DocumentData[]>} get25Stocks Returns the first 25 stocks as an array.
 * @property {() => Promise<DocumentData[]>} get25Options Returns the first 25 options as an array.
 */

/**
 * @type {import("react").Context<DataContext>}
 */
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
	
	const setUserDoc = async (uid, profile) => {
		console.log(uid, profile);
		const userDoc = doc(db, "users", uid);
		return await setDoc(userDoc, profile);
	}
	
	const getUserDoc = async (uid) => {
		const userDoc = doc(db, "users", uid);
		const res = await getDoc(userDoc);
		return res.data();
	}
	
	const get25Stocks = async () => {
		const q = query(collection(db, 'stocks'), limit(25));
		const snapshot = await getDocs(q);
		const data = snapshot.docs.map(stock => stock.data())
		let id = 0;
		data.forEach(element => {
			element.id = id++;
		});
		return data;
	}
	
	const get25Options = async () => {
		const q = query(collection(db, 'options'), limit(25));
		const snapshot = await getDocs(q);
		const data = snapshot.docs.map(option => option.data());
		let id = 0;
		data.forEach(element => {
			element.id = id++;
		});
		return data;
	}

	return (
		<DataContext.Provider
			value={{
				setUserDoc,
				getUserDoc,
				get25Stocks,
				get25Options,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export { DataContext };
export default DataContextProvider;