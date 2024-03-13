import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPassword from 'pages/auth/reset-password';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ResetForm = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/profile');
  };

  const redirect = (_) => {
    navigate('/profile');
  };

  return (
    <div className='mt-3 mx-6'>
      <div className='flex flex-col p-8 pb-10 gap-4 h-screen mb-10 shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
        <div>
          <button
            className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
            onClick={onClose}>
            <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
          </button>
        </div>
        <div className='mt-10 justify-center items-center'>
          <ResetPassword setPage={redirect} showGoBackBtn={false} />
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
