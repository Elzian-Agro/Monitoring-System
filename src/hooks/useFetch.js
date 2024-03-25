import { useEffect, useState } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';

const useAxios = ({ endpoint, method, call = 0, requestBody = {}, dependency = [] }) => {
  const [trigger, setTrigger] = useState(call);
  const [body, setBody] = useState(requestBody);
  const [token, setToken] = useState(localStorage.getItem('jwtAccessToken'));
  const [respond, setResponse] = useState(null);
  const [error, setError] = useState(null); //if already handled you don't need to retun
  const [loader, setLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getNewAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
        refreshToken: localStorage.getItem('jwtRefreshToken'),
      });
      localStorage.setItem('jwtAccessToken', response.data.accessToken);
      setToken(response.data.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const recall = () => {
    setTrigger((prev) => prev + 1);
  };

  async function f_call() {
    setAttempt((prev) => prev + 1);
    setLoading(true);
    try {
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
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
    } catch (err) {
      let error = err;
      setResponse(null);
      if (error.response?.data?.code === 13004 && attempt <= 1) {
        try {
          await getNewAccessToken();
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (trigger > 0) {
      f_call();
    }
  }, [...dependency, token, trigger]);

  return { respond, error, loader, recall, setBody };
};

export default useAxios;
