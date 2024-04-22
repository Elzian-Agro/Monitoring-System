import axios from 'axios';

export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
      refreshToken: localStorage.getItem('jwtRefreshToken'),
    });
    localStorage.setItem('jwtAccessToken', response.data.accessToken);
  } catch (error) {
    throw error;
  }
};
