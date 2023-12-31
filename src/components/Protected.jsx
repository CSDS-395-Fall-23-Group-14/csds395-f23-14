import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * A component that provides protection for routes based on user authentication.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered if the user is authenticated.
 * @returns {React.ReactNode} The rendered React component.
 */
const Protected = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated())
    // Redirect to the login page if the user is not authenticated.
    return <Navigate to='/login' />;

  // Render the children if the user is authenticated.
  return children;
};

export default Protected;
