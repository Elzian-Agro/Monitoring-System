import { XCircleIcon, EyeIcon, EyeSlashIcon, BellSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setNotificationOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notificationData, setNotificationCount }) => {
  const dispatch = useDispatch();
  const [allNotifications, setAllNotifications] = useState(notificationData);
  const { t } = useTranslation();
  const { send } = useAxios();

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  const calculateUnreadNotificationsCount = (notifications) => {
    return notifications.filter((notification) => !notification.readFlag).length;
  };

  const readAllNotifications = async () => {
    await send({
      endpoint: 'notification/readByUserId',
      method: 'PUT',
    });

    // Update the local list to mark all notifications as read.
    const updatedNotifications = allNotifications.map((notification) => ({
      ...notification,
      readFlag: true,
    }));
    setAllNotifications(updatedNotifications);

    // Set Notification Count
    setNotificationCount(0);
  };

  const deleteNotification = async (index) => {
    // Delete from the database
    await send({
      endpoint: 'notification',
      method: 'DELETE',
      body: {
        notificationId: allNotifications[index]._id,
      },
    });

    // Remove from the local list.
    const updatedNotifications = allNotifications.filter((_, i) => i !== index);
    setAllNotifications(updatedNotifications);

    // Count the number of objects where readFlag is true from the updatedNotifications
    setNotificationCount(calculateUnreadNotificationsCount(updatedNotifications));
  };

  const readNotification = async (index) => {
    const notificationId = allNotifications[index]._id;

    // Change the flage to true on local list.
    // Deep cloning because the spread operator's shallow copy may not work as expected with nested objects.
    const updatedNotifications = JSON.parse(JSON.stringify(allNotifications));
    updatedNotifications[index].readFlag = true;
    setAllNotifications(updatedNotifications);

    //Change the flage to true on database
    await send({
      endpoint: 'notification/readByNotificationId',
      method: 'PUT',
      body: {
        notificationId,
      },
    });

    // Count the number of objects where readFlag is true from the updatedNotifications
    setNotificationCount(calculateUnreadNotificationsCount(updatedNotifications));
  };

  return (
    <div className='nav-item z-[999] absolute right-5 md:right-40 top-16 shadow-lg bg-white dark:bg-secondary-dark-bg p-6 rounded-lg w-72 md:w-[22rem]'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold md:text-lg dark:text-white'>{t('Notifications')}</p>
        </div>
        <div>
          <button className='mr-10' onClick={readAllNotifications}>
            <BellSlashIcon className='h-6 w-6 dark:text-white' />
          </button>
          <button onClick={closeNotification}>
            <XCircleIcon className='h-6 w-6 dark:text-white' />
          </button>
        </div>
      </div>

      <div className='Notifications mt-4'>
        {allNotifications.map((eachNotification, index) => (
          <div className='Each-Notifications mb-4' key={eachNotification._id}>
            <div
              className={`${
                eachNotification.readFlag ? 'text-gray-400 dark:text-gray-500' : 'dark:text-white'
              } flex justify-between`}>
              <p className='max-w-60 line-clamp-2'>{eachNotification.notification}</p>
              <div className='flex items-center'>
                <button className='mr-3'>
                  {eachNotification.readFlag ? (
                    <EyeSlashIcon className='h-5 w-5' />
                  ) : (
                    <EyeIcon onClick={() => readNotification(index)} className='h-5 w-5' />
                  )}
                </button>
                <button onClick={() => deleteNotification(index)}>
                  <TrashIcon className='h-5 w-5' />
                </button>
              </div>
            </div>
            <div className='Date and Time pt-1 flex justify-between text-gray-400 dark:text-gray-500 text-xs '>
              <p>{eachNotification.dateTime.date}</p>
              <p>{eachNotification.dateTime.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Notification.propTypes = {
  notificationData: PropTypes.array.isRequired,
  setNotificationCount: PropTypes.func.isRequired,
};

export default Notification;
