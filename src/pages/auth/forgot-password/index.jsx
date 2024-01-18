import React, { useState } from 'react';
import { ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Button from 'pages/auth/components/base/Button';
import TextBox from 'pages/auth/components/base/TextBox';
import ErrorMessage from 'pages/auth/components/base/ErrorMessage';
import { isValidEmail, identifyError } from 'pages/auth/utils';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../slice/emailSlice';
import { useTranslation } from 'react-i18next';

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please Enter a Valid Email Address!');
      return;
    }

    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/forget-password`, {
        email: email,
      })
      .then(() => {
        setError(null);
        dispatch(updateEmail(email));
        setIsLoading(false);
        setPage('ResetPassword');
      })
      .catch((error) => {
        setIsLoading(false);
        setError(identifyError(error.response?.data?.code));
      });
  };

  return (
    <div className='flex flex-col h-full w-full gap-5 md:gap-0 items-start'>
      <button onClick={() => setPage('Login')} className='group w-[150px] flex items-center'>
        <ArrowLeftIcon className='w-[20px] group-hover:ml-[-20px] transition-all' />
        <p className='flex-1 font-zenkaku text-[12px]'>{t('Go Back')}</p>
      </button>

      <div className='flex-1 flex items-center flex-col lg:justify-center h-full w-full'>
        <h1 className='font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5 sm:leading-10'>
          {t('FORGOT PASSWORD?')}
        </h1>
        <p className='font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10'>
          {t('ENTER YOUR EMAIL FOR THE VERIFICATION PROCESS')}
        </p>

        <form className='flex flex-col items-center p-2 xs:p-4 gap-4 w-full' onSubmit={handleSubmit}>
          <TextBox
            placeholder='Enter your email'
            label='Email Address'
            type='text'
            Icon={EnvelopeIcon}
            value={email}
            setValue={setEmail}
          />

          {error && <ErrorMessage message={error} />}

          <Button text={isLoading ? 'Loading...' : 'Continue'} disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ForgotPassword;
