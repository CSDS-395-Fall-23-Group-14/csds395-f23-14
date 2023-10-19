import React, { createContext } from 'react';
import { collection, query, getDoc, getDocs, limit, setDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig';

/**
 * @typedef DataContext A context for managing queries and posts to the database.
 * @property {(uid: string, profile: object) => Promise<void>} setUserDoc Creates/updates the user document with the specified values.
 * @property {(uid: string) => Promise<object>} getUserDoc Returns the data in specified user's document.
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

	// /**
	//  * Gets all stocks from db
	//  * *******************
	//  * We shouldn't really use this bc 50,000 doc read limit per day.
	//  * Only about 25 calls of this function allowed per day
	//  * ************************************************
	//  * 
	//  * Returns an array with the data
	//  */
	// const getAllStocks = async () => {
	// 	const snapshot = await getDocs(collection(db, 'stocks'));
	// 	return snapshot.docs.map(stock => stock.data());
	// }

	// /**
	//  * Gets all stocks from db
	//  * *******************
	//  * We shouldn't really use this bc 50,000 doc read limit per day.
	//  * Only about 25 calls of this function allowed per day
	//  * This one is less risky than the stocks getAll
	//  * ************************************************
	//  * 
	//  * Returns an array with the data
	//  */
	// const getAllOptions = async () => {
	// 	const snapshot = await getDocs(collection(db, 'options'));
	// 	return snapshot.docs.map(option => option.data());
	// }

	// /**
	//  * Fetches first 25 stocks from the db
	//  * @returns the first 25 stocks as an array
	//  */
	// const get25Stocks = async () => {
	// 	const q = query(collection(db, 'stocks'), limit(25));
	// 	const snapshot = await getDocs(q);
	// 	return snapshot.docs.map(stock => stock.data());
	// }

	// /**
	//  * Fetches the first 25 options from the db
	//  * @returns the first 25 options as an array
	//  */
	// const get25Options = async () => {
	// 	const q = query(collection(db, 'options'), limit(25));
	// 	const snapshot = await getDocs(q);
	// 	return snapshot.docs.map(option => option.data());
	// }

	return (
		<DataContext.Provider
			value={{
				setUserDoc,
				getUserDoc,
				// get25Stocks,
				// get25Options,
				// getAllOptions,
				// getAllStocks,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

function createData(name, ticker, marketValue, weight, notationalValue, sector) {
    return {
        name,
        ticker,
        marketValue,
        weight,
        notationalValue,
        sector
    };
}

function GetStocks() {
	const { get25Stocks } = useContext();
	const [item, setItem] = React.useState([]);

	React.useEffect(() => {
		const result = async () => {
			const stocks = await get25Stocks();
			const len = stocks.length;
			var rows = [len];
			for (let i = 0; i < len; i++) {
				rows[i] = createData(stocks[i].companyname, stocks[i].ticker, stocks[i].marketvalue, stocks[i].weight, stocks[i].notionalvalue, stocks[i].sector);
			}
			setItem(rows);
		};

		result();
	}, []);

	return item;
}

export { DataContext };
export default DataContextProvider;