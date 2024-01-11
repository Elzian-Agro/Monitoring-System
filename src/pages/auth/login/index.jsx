import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Button from 'pages/auth/components/base/Button';
import TextBox from 'pages/auth/components/base/TextBox';
import ErrorMessage from 'pages/auth/components/base/ErrorMessage';
import { isValidEmail, encryptData } from 'pages/auth/utils';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = 'http://localhost:5000';
  const { t } = useTranslation();

  // Retrieve remembered credentials from localStorage
  useEffect(() => {
    if (localStorage.getItem('rememberedEmail') && localStorage.getItem('rememberedPassword')) {
      setEmail(localStorage.getItem('rememberedEmail'));
      setPassword(localStorage.getItem('rememberedPassword'));
      setRemember(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email) {
      setError('emptyEmail');
      return;
    } else if (!isValidEmail(email)) {
      setError('emailRegexFailed');
      return;
    } else if (!password) {
      setError('emptyPassword');
      return;
    }

    setError(null);
    setLoading(true);

    const userCredintials = {
      email: email,
    };

    try {
      userCredintials.password = await encryptData(password);
    } catch {
      setError('encryptionFailed');
      return;
    }

    axios
      .post(`${baseURL}/auth/login`, userCredintials)
      .then((response) => {
        // Save the token in localStorage
        localStorage.setItem('jwtToken', response.data.refreshToken);

        // Save or remove the username and password from local storage
        if (remember) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }

        setLoading(false);
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        switch (error.response?.status) {
          case 401:
            setError('invalidCredentials');
            break;

          case 500:
            setError('serverError');
            break;

          default:
            setError('networkError');
            break;
        }
      });
  };

  return (
    <div className='flex-1 flex items-center flex-col lg:justify-center h-full w-full gap-2 xxs:gap-0'>
      <h1 className='font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5 sm:leading-10'>
        {t('LOG IN')}
      </h1>
      <p className='font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10'>
        {t('LOG IN TO YOUR DASHBOARD')}
      </p>

      <form className='flex flex-col items-center p-2 xs:p-4 gap-4 w-full' onSubmit={handleLogin}>
        <TextBox
          placeholder='Enter your email'
          label='Email Address'
          type='text'
          Icon={EnvelopeIcon}
          value={email}
          setValue={setEmail}
        />

        <TextBox
          placeholder='Enter your password'
          label='Password'
          type='password'
          Icon={LockClosedIcon}
          value={password}
          setValue={setPassword}
        />

        <div className='w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex justify-normal font-zenkaku font-light text-[12px] sm:text-[16px]'>
          <div className='flex-1 flex gap-2 content-center'>
            <input
              type='checkbox'
              id='checkbox'
              checked={remember}
              onChange={() => setRemember(!remember)}
              className='accent-[#0B8021]'
            />
            <label htmlFor='checkbox'>{t('Remember me')}</label>
          </div>

          <button className='hover:text-[#0B8021] transition-all' onClick={() => setPage('ForgotPassword')}>
            {t('Forgot Password?')}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <Button text={loading ? 'Logging in...' : 'Login'} disabled={loading} />
      </form>
    </div>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login;
