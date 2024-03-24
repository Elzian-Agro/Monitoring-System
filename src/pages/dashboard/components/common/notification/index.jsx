import { XCircleIcon, EyeIcon, EyeSlashIcon, BellSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import { setNotificationOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ClickOutsideHandler from 'pages/utils/ClickOutsideHandler';

const Notification = ({ notificationsData, setNotificationsCount }) => {
  const [notifications, setNotifications] = useState(notificationsData || []);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { send } = useAxios();

  const calculateUnreadNotificationsCount = (notifications) => {
    return notifications.filter((notification) => !notification.readFlag).length;
  };

  const readAllNotifications = async () => {
    await send({
      endpoint: 'notification/readByUserId',
      method: 'PUT',
    });

    // Update the local list to mark all notifications as read.
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      readFlag: true,
    }));

    setNotifications(updatedNotifications);

    // Set Notification Count
    setNotificationsCount(0);
  };

  const deleteNotification = async (index) => {
    await send({
      endpoint: 'notification',
      method: 'DELETE',
      body: {
        notificationId: notifications[index]._id,
      },
    });

    // Remove from the local list.
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);

    // Count the number of objects where readFlag is true from the updatedNotifications
    setNotificationsCount(calculateUnreadNotificationsCount(updatedNotifications));
  };

  const readNotification = async (index) => {
    const notificationId = notifications[index]._id;

    // Change the flage to true on local list.
    // Deep cloning because the spread operator's shallow copy may not work as expected with nested objects.
    const updatedNotifications = JSON.parse(JSON.stringify(notifications));
    updatedNotifications[index].readFlag = true;
    setNotifications(updatedNotifications);

    //Change the flage to true on database
    await send({
      endpoint: 'notification/readByNotificationId',
      method: 'PUT',
      body: {
        notificationId,
      },
    });

    // Count the number of objects where readFlag is true from the updatedNotifications
    setNotificationsCount(calculateUnreadNotificationsCount(updatedNotifications));
  };

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  return (
    <ClickOutsideHandler callback={closeNotification}>
      {(ref) => (
        <div
          ref={ref}
          className='nav-item z-[999] absolute right-5 md:right-40 top-16 shadow-lg bg-white dark:bg-secondary-dark-bg p-6 rounded-lg w-72 md:w-[22rem]'>
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
            {notifications.map((eachNotification, index) => (
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
      )}
    </ClickOutsideHandler>
  );
};

Notification.propTypes = {
  notificationsData: PropTypes.array.isRequired,
  setNotificationsCount: PropTypes.func.isRequired,
};

export default Notification;
