import React, { useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Button from 'pages/auth/components/base/Button';
import TextBox from 'pages/auth/components/base/TextBox';
import ErrorMessage from 'pages/auth/components/base/ErrorMessage';
import PropTypes from 'prop-types';
import { isValidPassword, tokenise } from 'pages/auth/utils';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail } from '../slice/emailSlice';
import Redirect from 'pages/auth/components/base/Redirect';
import { useTranslation } from 'react-i18next';

function ResetPassword({ setPage }) {
  const [tempPass, setTempPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const email = useSelector((state) => state.email.value);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tempPass) {
      setError('Please enter the temporary password sent to your email');
      return 0;
    } else if (!isValidPassword(newPass)) {
      setError(
        'Password too weak. Should contain atleast 8 characters including upper and lower case letters + numbers + special chars.'
      );
      return 0;
    } else if (newPass !== confirmPass) {
      setError('Passwords do not match');
      return 0;
    }

    setIsLoading(true);

    const data = {
      email: email,
      temporaryPassword: tempPass,
      newPassword: newPass,
    };

    let token;

    try {
      token = await tokenise(data);
    } catch (error) {
      setError('An error occured! Please try agian');
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`, { token })
      .then(() => {
        setError(null);
        dispatch(updateEmail(null));
        setIsLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);

        switch (error.response?.data?.code) {
          case 13003:
            setError('Incorrect Temporary Password');
            break;

          case 13001:
            setBlocked(true);
            break;

          case 17002:
            setError('Time Out');
            break;

          case 17001:
            setError('Oops! an error occured. Please try again later');
            break;

          default:
            setError('Network error! Please try again later');
            break;
        }
      });
  };

  const handleGoBack = () => {
    dispatch(updateEmail(null));
    setPage('Login');
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/forget-password`, {
        email: email,
      })
      .then(() => {
        setTimer(60);
      })
      .catch((error) => {
        switch (error.response?.data?.code) {
          case 15001:
            setError('User Not Found!');
            break;

          case 13001:
            setError('User is blocked! Contact admin');
            break;

          case 17001:
            setError('Oops! an error occured. Please try again later');
            break;

          default:
            setError('Network error! Please try again later');
            break;
        }
      });
  };

  return (
    <div className='flex flex-col h-full w-full gap-5 md:gap-0 items-start'>
      <button onClick={handleGoBack} className='group w-[100px] flex items-center'>
        <ArrowLeftIcon className='w-[20px] group-hover:ml-[-20px] transition-all' />
        <p className='flex-1 font-zenkaku text-[12px]'>{t('Go Back')}</p>
      </button>

      {email && !success && !blocked && (
        <div className='flex-1 flex items-center flex-col lg:justify-center h-full w-full'>
          <h1 className='font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5 sm:leading-10'>
            {t('RESET PASSWORD')}
          </h1>
          <p className='font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10'>
            {t('TEMPORARY PASSWORD HAS BEEN SENT TO YOUR EMAIL')}
          </p>

          <form className='flex flex-col items-center p-2 xs:p-4 gap-4 w-full' onSubmit={handleSubmit}>
            <TextBox
              placeholder='Enter Temporary Password'
              label='Temporary Password'
              type='password'
              Icon={LockClosedIcon}
              value={tempPass}
              setValue={setTempPass}
            />

            <TextBox
              placeholder='Enter New Password'
              label='New Password'
              type='password'
              Icon={LockClosedIcon}
              value={newPass}
              setValue={setNewPass}
            />

            <TextBox
              placeholder='Enter New Password Again'
              label='Confirm Password'
              type='password'
              Icon={LockClosedIcon}
              value={confirmPass}
              setValue={setConfirmPass}
            />

            {error && <ErrorMessage message={error} />}

            <Button text={isLoading ? 'Loading...' : 'Continue'} disabled={isLoading} />
          </form>

          <div>
            {timer > 0 ? (
              <p className='font-zenkaku font-light text-[12px] text-center'>
                {t("Email Sent! Didn't Recieve? Resend Email in", { val: timer })}
              </p>
            ) : (
              <button onClick={handleResendEmail} className='text-blue-500 hover:text-blue-700 font-zenkaku'>
                {t('Resend Email')}
              </button>
            )}
          </div>
        </div>
      )}

      {!email && !success && !blocked && (
        <Redirect setPage={setPage} Icon={ExclamationTriangleIcon} message={'Unauthorized Access'} type={'warning'} />
      )}

      {success && !blocked && (
        <Redirect setPage={setPage} Icon={CheckCircleIcon} message={'Password Reset Successfully'} type={'success'} />
      )}

      {blocked && (
        <Redirect setPage={setPage} Icon={XCircleIcon} message={'User is blocked! Contact admin'} type={'warning'} />
      )}
    </div>
  );
}

ResetPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ResetPassword;
