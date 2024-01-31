import axios from 'axios';
import { setUserData } from 'pages/dashboard/slice/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const GetUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('jwtAccessToken');

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUserData(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, [dispatch]);
};

export default GetUserData;
