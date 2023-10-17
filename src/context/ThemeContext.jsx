import React, { useState, useEffect, createContext, useContext } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context for managing theme
const ThemeContext = createContext();

/**
 * A provider component for managing the theme of the app.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the theme provider.
 * @returns {JSX.Element} The rendered React component.
 */
function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState(createTheme({ palette: { mode: localStorage.getItem('theme') }}));
  const setThemeMode = (customMode) => setTheme(createTheme({ palette: { mode: customMode }}));
  const getThemeMode = () => theme.palette.mode;
  
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme)
      setThemeMode(localTheme);
  }, [])
  
  useEffect(() => {
    localStorage.setItem('theme', theme.palette.mode)
  }, [theme])
  
  return (
		<ThemeContext.Provider
      value={{
        setThemeMode,
        getThemeMode
		  }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

/**
 * A hook for accessing theme related functions.
 *
 * @returns {object} An object containing theme related functions.
 * @property {function} getThemeMode - Function to get the theme mode of the app.
 * @property {function} setThemeMode - Function to set the theme mode of the app.
 */
const useTheme = () => {
	return useContext(ThemeContext);
};

export { useTheme };
export default ThemeContextProvider;