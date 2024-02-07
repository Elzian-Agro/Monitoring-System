import { setUserData } from 'pages/dashboard/slice/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAxios from 'hooks/useAxios';

const GetUserData = () => {
  const dispatch = useDispatch();
  const { response, send } = useAxios();

  useEffect(() => {
    const getUserData = async () => {
       await send({ endpoint: 'user/profile', method: 'GET' });
    };

    getUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (response) {
      dispatch(setUserData(response));
    }
  }, [dispatch, response]);
};

export default GetUserData;
