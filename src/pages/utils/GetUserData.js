import axios from 'axios';

const GetUserData = async () => {
  try {
    const token = localStorage.getItem('jwtAccessToken');

    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export default GetUserData;
