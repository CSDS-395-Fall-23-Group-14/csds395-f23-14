import React, { createContext } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import { storage } from '../firebaseConfig';

/**
 * @typedef StorageContext A context for managing file storage.
 * @property {(file: any, uid: any) => Promise<string>} uploadAvatar Updates the current user's avatar in storage.
 */

/**
 * @type {import("react").Context<StorageContext>} 
 */
const StorageContext = createContext();

/**
 * A provider component for managing file storage.
 * @component
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the authentication provider.
 * @returns {JSX.Element} The rendered React component.
 */
function StorageContextProvider({ children }) {
	const uploadAvatar = async (file, uid) => {
		const storageRef = ref(storage, `/${uid}${file.name}`);
		const metadata = { contentType: 'image/*' };
		
		await uploadBytes(storageRef, file, metadata);
		const url = await getDownloadURL(ref(storage, `/${uid}${file.name}`));
		return url;
	}

	return (
		<StorageContext.Provider
			value={{
				uploadAvatar
			}}
		>
			{children}
		</StorageContext.Provider>
	);
}

export { StorageContext };
export default StorageContextProvider;