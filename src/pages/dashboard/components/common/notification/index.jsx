import { XCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { setNotificationOpen, setAreNotificationsUnread } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  const allNotificationsRead = () => {
    dispatch(setAreNotificationsUnread(false));
  };

  return (
    <div className='nav-item absolute right-5 md:right-40 top-16 bg-gray-200 dark:bg-secondary-dark-bg p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold md:text-lg dark:text-white'>Notifications</p>
        </div>
        <div>
          <button className='pr-10' onClick={allNotificationsRead}>
            <EyeSlashIcon className='h-6 w-6 dark:text-white' />
          </button>
          <button onClick={closeNotification}>
            <XCircleIcon className='h-6 w-6 dark:text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
