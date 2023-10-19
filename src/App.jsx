import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

/* Context */
import ThemeContextProvider from './context/ThemeContext';
import DataContextProvider from './context/DataContext';
import StorageContextProvider from './context/StorageContext';
import AuthContextProvider from './context/AuthContext';
import Protected from './components/Protected';

/* Pages */
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Options from './pages/Options';
import Tiles from './pages/Tiles';

/**
 * The App component for displaying the app.
 * 
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
function App() {
  return (
    <ThemeContextProvider>
      <StorageContextProvider>
        <DataContextProvider>
          <AuthContextProvider>
            <Routes>
              {/* Login Page */}
              <Route
                path='/login'
                element={<Login />}
              />
              
              {/* Registration Page */}
              <Route
                path='/signup'
                element={<Signup />}
              />
              
              {/* Profile Page - Password protected */}
              <Route
                path='/profile'
                element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              
              {/* OptionsScreener - Password protected */}
              <Route
                path='/optionscreener'
                element={
                  <Protected>
                    <Options />
                  </Protected>
                }
              />
              
              {/* Tiles - Password protected */}
              <Route
                path='/tiles'
                element={
                  <Protected>
                    <Tiles />
                  </Protected>
                }
              />
              
              {/* Home Page - Password protected */}
              <Route
                path='/'
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              />
              
              {/* Any other page redirects to the home page */}
              <Route
                path='*'
                element={
                  <Navigate to='/' />
                }
              />
              
            </Routes>
          </AuthContextProvider>
        </DataContextProvider>
      </StorageContextProvider>
    </ThemeContextProvider>
  );
}

export default App;