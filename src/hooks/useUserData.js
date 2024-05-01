import useAxios from './useAxios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from 'pages/dashboard/slice/userSlice';

const useUserData = () => {
  const dispatch = useDispatch();
  const { send, loading } = useAxios();
  const [fetch, setUserFetch] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await send({ endpoint: 'user/profile', method: 'GET' });
      dispatch(setUserData(userData));
    };

    if (fetch) {
      fetchUserData();
      setUserFetch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  return { isLoading: loading, setUserFetch };
};

export default useUserData;
