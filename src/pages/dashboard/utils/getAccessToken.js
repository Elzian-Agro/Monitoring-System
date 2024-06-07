import axios from 'axios';

export const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('jwtRefreshToken');

  if (!refreshToken) return;

  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
      refreshToken: refreshToken,
    });

    localStorage.setItem('jwtAccessToken', response.data.accessToken);
  } catch (error) {
    throw error;
  }
};
