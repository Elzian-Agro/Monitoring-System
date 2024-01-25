import { XCircleIcon, EyeSlashIcon, BellSlashIcon, TrashIcon } from '@heroicons/react/24/outline';

import { setNotificationOpen, setAreNotificationsUnread } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const [allNotifications, setAllNotoficatins] = useState([
    { desc: 'This is the First Notification', date: '2024/01/01', time: '08:00 AM' },
    {
      desc: 'This is the Second Notification, its length is biiger than the first one.',
      date: '2024/01/02',
      time: '09:00 AM',
    },
  ]);

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  const allNotificationsRead = () => {
    dispatch(setAreNotificationsUnread(false));
  };

  const deleteNotification = (index) => {
    const updatedNotifications = [...allNotifications];
    updatedNotifications.splice(index, 1);
    setAllNotoficatins(updatedNotifications);
  };

  return (
    <div className='nav-item absolute right-5 md:right-40 top-16 bg-gray-200 dark:bg-secondary-dark-bg p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold md:text-lg dark:text-white'>Notifications</p>
        </div>
        <div>
          <button className='mr-10' onClick={allNotificationsRead}>
            <BellSlashIcon className='h-6 w-6 dark:text-white' />
          </button>
          <button onClick={closeNotification}>
            <XCircleIcon className='h-6 w-6 dark:text-white' />
          </button>
        </div>
      </div>

      <div className='Notifications mt-4'>
        {allNotifications.map((eachNotification, index) => (
          <div className='Each-Notifications mb-4' key={index}>
            <div className='flex justify-between'>
              {/* truncate Or line-clamp-2  - Choose later For now i have choose truncate*/}
              <p className='dark:text-white max-w-60 line-clamp-2'>{eachNotification.desc}</p>
              <div className='flex items-center'>
                <button className='mr-3'>
                  <EyeSlashIcon className='h-5 w-5 dark:text-white' />
                </button>
                <button onClick={() => deleteNotification(index)}>
                  <TrashIcon className='h-5 w-5 dark:text-white' />
                </button>
              </div>
            </div>
            <div className='Date and Time pt-1 flex justify-between text-gray-500 text-xs'>
              <p>{eachNotification.date}</p>
              <p>{eachNotification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
