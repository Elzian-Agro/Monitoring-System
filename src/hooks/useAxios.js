import { useState } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // TODO: use name as isLoading
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(0);

  const getNewAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('jwtRefreshToken'),
      });
      localStorage.setItem('jwtAccessToken', response.data.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const send = async ({ endpoint, method, body = null, requestHeaders = null }) => {
    setAttempt((prev) => prev + 1);
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
      setError(null);
      setAttempt(0);
      return res.data;
    } catch (err) {
      let error = err;
      setResponse(null);
      if (error.response?.data?.code === 13004 && attempt <= 1) {
        try {
          await getNewAccessToken();
          return send({
            endpoint,
            method,
            body,
            requestHeaders,
          });
        } catch (refreshError) {
          error = refreshError;

          localStorage.removeItem('jwtAccessToken');
          localStorage.removeItem('jwtRefreshToken');
          navigate('/', { replace: true });
        }
      }

      setError({
        code: error.response?.data?.code,
        message: identifyError(error.response?.data?.code),
      });

      dispatch(showErrorModal(identifyError(error.response?.data?.code)));

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, send };
};

export default useAxios;
