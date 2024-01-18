import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

import { setNotificationOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  return (
    <div className='nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-secondary-dark-bg p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold text-lg dark:text-white'>Notifications</p>
        </div>
        <button onClick={closeNotification}>
          <XCircleIcon className='h-6 w-6 dark:text-white' />
        </button>
      </div>
    </div>
  );
};

export default Notification;
