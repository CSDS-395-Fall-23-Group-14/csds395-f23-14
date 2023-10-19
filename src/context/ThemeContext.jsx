import React, { useState, useEffect, createContext } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * @typedef ThemeContext A context for managing theme.
 * @property {(customMode: import('@mui/material').PaletteMode) => void} setThemeMode
 * @property {() => import('@mui/material').PaletteMode} getThemeMode
 */

/**
 * @type {import("react").Context<ThemeContext>}
 */
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
	const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode')); // will be null at first, then 'dark'
  const theme = createTheme({ palette: { mode: themeMode ? themeMode !== 'null' ? themeMode : 'dark' : 'dark' } });
  
  useEffect(() => {
    localStorage.setItem('themeMode', theme.palette.mode);
  });
  
  return (
		<ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode
		  }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemeContextProvider;