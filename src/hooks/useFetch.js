import { useEffect, useState } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';
import { getNewAccessToken } from 'pages/dashboard/utils/getAccessToken';

const useFetch = ({ endpoint, method, call = 0, requestBody = {}, dependency = [] }) => {
  const [trigger, setTrigger] = useState(call);
  const [body, setBody] = useState(requestBody);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); //if already handled you don't need to retun
  const [isLoading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recall = () => {
    setTrigger((prev) => prev + 1);
  };

  async function callAPI() {
    setAttempt((prev) => prev + 1);
    setLoading(true);
    try {
      const headers = {
        ...{ Authorization: `Bearer ${localStorage.getItem('jwtAccessToken')}` },
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
          return callAPI();
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
      callAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency, trigger]);

  return { response, error, isLoading, recall, setBody };
};

export default useFetch;
