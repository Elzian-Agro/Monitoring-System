import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const PrivateRoutes = () => {
  // TODO: Change the state to false once fix the bug
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { send } = useAxios();

  // TODO: need to fix = getting the verified from resposneData but not setting in the state immediately
  useEffect(() => {
    const verifyUser = async () => {
      const responseData = await send({ endpoint: 'user/verify', method: 'POST' });
      setIsAuthenticated(responseData?.verified);
      // console.log(responseData?.verified);
      // console.log(isAuthenticated);
    };

    verifyUser();
    // eslint-disable-next-line
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
