import axios from 'axios';

export const refreshTokenMiddleware = async () => {
  const refreshToken = localStorage.getItem('jwtRefreshToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken });
    localStorage.setItem('jwtAccessToken', response.data.accessToken);
    return true;
  } catch (error) {
    if (error.response.data.code === 13002) {
      return false;
    }
  }
};
