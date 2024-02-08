import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check if the token is present in localStorage
  const isAuthenticated = !!localStorage.getItem('jwtAccessToken');

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
