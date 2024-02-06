import { useState } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getNewAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('jwtRefreshToken');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken });
      localStorage.setItem('jwtAccessToken', response.data.accessToken);
      return true;
    } catch (error) {
      setError({
        code: error.response?.data?.code,
        message: identifyError(error.response?.data?.code),
      });
      dispatch(showErrorModal(identifyError(error.response?.data?.code)));

      localStorage.removeItem('jwtAccessToken');
      localStorage.removeItem('jwtRefreshToken');
      navigate('/', { replace: true });
      return false;
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
      setError(null);
      return res.data;
    } catch (err) {
      setResponse(null);
      if (err.response?.data?.code === 13004) {
        if (await getNewAccessToken()) {
          return send({
            endpoint,
            method,
            body,
            requestHeaders,
          });
        }
      } else {
        setError({
          code: err.response?.data?.code,
          message: identifyError(err.response?.data?.code),
        });
        dispatch(showErrorModal(identifyError(err.response?.data?.code)));
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, send };
};

export default useAxios;
