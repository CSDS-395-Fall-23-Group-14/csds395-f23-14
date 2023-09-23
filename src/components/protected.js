import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
  const { user } = useAuth();
  console.log('user: ', user);
  if (!user)
    return <Navigate to='/login' />;

  return children;
};

export default Protected;