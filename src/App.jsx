import './App.css';
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContextProvider from './context/AuthContext';
import DataContextProvider from './context/DataContext';
import Protected from './components/protected';

/* Pages */
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
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
              <Navigate to='/'/>
            }
          />
          
        </Routes>
      </AuthContextProvider>
    </DataContextProvider>
  );
}

export default App;