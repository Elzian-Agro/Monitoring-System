import { useState } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getNewAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('jwtRefreshToken');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken });
      localStorage.setItem('jwtAccessToken', response.data.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const send = async ({ endpoint, method, body = null, requestHeaders = null }) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('jwtAccessToken');
      const headers = {
        ...requestHeaders,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      const res = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
        method,
        data: body,
        headers,
      });

      setResponse(res.data);
    } catch (err) {
      setResponse(null);
      if (err.response?.data?.code === 13004) {
        try {
          await getNewAccessToken();
          return send({
            endpoint,
            method,
            body,
            requestHeaders,
          });
        } catch (refreshError) {
          dispatch(showErrorModal(identifyError(refreshError.response?.data?.code)));
        }
      } else {
        dispatch(showErrorModal(identifyError(err.response?.data?.code)));
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, send };
};

export default useAxios;
