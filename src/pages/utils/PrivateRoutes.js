import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import Loader from 'pages/dashboard/components/common/loader';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { send } = useAxios();

  useEffect(() => {
    const verifyUser = async () => {
      const response = await send({ endpoint: 'auth/verify', method: 'POST' });
      setIsAuthenticated(!!response);
      setLoading(false);
    };

    verifyUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    if (isAuthenticated) {
      return <Outlet />;
    } else {
      return <Navigate to='/login' />;
    }
  }
};

export default PrivateRoutes;
