import { useState, useEffect } from 'react';
import axios from 'axios';
import { identifyError } from 'pages/auth/utils';

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({ url, method, data: body, headers });
        console.log(res);
        setResponse(res.data);
      } catch (error) {
        setError({
          code: error.response?.data?.code,
          message: identifyError(error.response?.data?.code),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]);

  return { response, error, loading };
};

export default useAxios;
