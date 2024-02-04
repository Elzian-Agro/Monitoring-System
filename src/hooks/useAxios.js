import { useState, useEffect } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';

const useAxios = ({ endpoint, method, body = null, requestHeaders = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem('jwtAccessToken');
      const headers = {
        ...requestHeaders,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      try {
        const res = await axios({ url: `${process.env.REACT_APP_BASE_URL}/${endpoint}`, method, data: body, headers });
        setResponse(res.data);
        setError(null);
        setAttemptCount(0);
      } catch (error) {
        if (error.response?.data?.code === 13004 && attemptCount < 1) {
          // Try to refresh the token once
          try {
            await getNewAccessToken();
            setAttemptCount(attemptCount + 1);
          } catch (error) {
            setError({
              code: error.response?.data?.code,
              message: identifyError(error.response?.data?.code),
            });
          }
        } else {
          setError({
            code: error.response?.data?.code,
            message: identifyError(error.response?.data?.code),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body, requestHeaders, attemptCount]);

  return { response, error, loading };
};

const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('jwtRefreshToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken });
    localStorage.setItem('jwtAccessToken', response.data.accessToken);
    return true;
  } catch (error) {
    throw error;
  }
};

export default useAxios;
