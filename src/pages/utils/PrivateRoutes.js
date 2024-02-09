import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { send } = useAxios();

  useEffect(() => {
    const verifyUser = async () => {
      const response = await send({ endpoint: 'user/verify', method: 'POST' });
      setIsAuthenticated(response);
    };

    verifyUser();
    // eslint-disable-next-line
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
