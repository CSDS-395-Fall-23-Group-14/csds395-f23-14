import React, { createContext } from 'react';
import {
	collection,
	query,
	getDoc,
	getDocs,
	limit,
	setDoc,
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	where
} from "firebase/firestore";
import { db } from '../firebaseConfig';

/**
 * @typedef DataContext A context for managing queries and posts to the database.
 * @property {(uid: string, profile: object) => Promise<void>} setUserDoc Creates/updates the user document with the specified values.
 * @property {(uid: string) => Promise<object>} getUserDoc Returns the data in specified user's document.
 * @property {() => Promise<DocumentData[]>} get25Stocks Returns the first 25 stocks as an array.
 * @property {() => Promise<DocumentData[]>} get25Options Returns the first 25 options as an array.
 * @property {(uid: string, ids: string[]) => Promise<void>} addToShoppingCart Adds the specified option IDs to the user's shopping cart.
 * @property {(uid: string, ids: string[]) => Promise<void>} removeFromShoppingCart Removes the specified option IDs from the user's shopping cart
 * @property {(uid: string) => Promise<DocumentData[]>} getShoppingCart Returns the user's shopping chart.
 * @property {(ids: string[]) => Promise<DocumentData[]>} getOptions Returns the Options whose IDs are specified.
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
		const userDoc = doc(db, "users", uid);
		return await setDoc(userDoc, profile);
	}
	
	const getUserDoc = async (uid) => {
		const userDoc = doc(db, "users", uid);
		const res = await getDoc(userDoc);
		return res.data();
	}
	
	const get25Stocks = async () => {
		const q = query(collection(db, 'stocks'), limit(250));
		const snapshot = await getDocs(q);
		const data = snapshot.docs.map(stock => stock.data())
		let id = 0;
		data.forEach(element => {
			element.id = id++;
		});
		return data;
	}
	
	const get25Options = async () => {
		const q = query(collection(db, 'options'), limit(250));
		const snapshot = await getDocs(q);
		const data = snapshot.docs.map(option => option.data());
		let id = 0;
		data.forEach(element => {
			element.id = id++;
		});
		return data;
	}

	const updateStockShoppingCart = async (uid, ids) => {
		const userDoc = doc(db, "users", uid);
		return await updateDoc(userDoc, { shoppingCart: ids });
	}

	const addToShoppingCart = async (uid, ids) => {
		const userDoc = doc(db, "users", uid);
		return await updateDoc(userDoc, { shoppingCart: arrayUnion(...ids) });
	}
	
	const removeFromShoppingCart = async (uid, ids) => {
		const userDoc = doc(db, "users", uid);
		return await updateDoc(userDoc, { shoppingCart: arrayRemove(...ids) });
	}
	
	const getShoppingCart = async (uid) => {
		const userDoc = doc(db, "users", uid);
		const snapshot = await getDoc(userDoc);
		return snapshot.data().shoppingCart;
	}
	
	const getOptions = async (ids) => {
		const q = query(collection(db, "options"), where("optionid", 'in', ids));
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
				updateStockShoppingCart,
				addToShoppingCart,
				removeFromShoppingCart,
				getShoppingCart,
				getOptions,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export { DataContext };
export default DataContextProvider;