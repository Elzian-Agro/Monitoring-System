import { setUserData } from 'pages/dashboard/slice/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAxios from 'hooks/useAxios';

const GetUserData = () => {
  const dispatch = useDispatch();
  const { send } = useAxios();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await send({ endpoint: 'user/profile', method: 'GET' });

      if (userData) {
        dispatch(setUserData(userData));
      }
    };
    getUserData();

    // eslint-disable-next-line
  }, []);
};

export default GetUserData;
