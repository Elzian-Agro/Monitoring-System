import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = { token: true }; // Move this to Redux store.
  return auth.token ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
