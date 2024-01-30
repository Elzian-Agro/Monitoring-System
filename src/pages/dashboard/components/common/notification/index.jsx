import { XCircleIcon, EyeIcon, EyeSlashIcon, BellSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { setNotificationOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import {
  selectAllNotifications,
  setAllNotifications,
  setNotificationsCount,
} from 'pages/dashboard/slice/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const allNotifications = useSelector(selectAllNotifications);
  const token = localStorage.getItem('jwtAccessToken');

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  const readAllNotifications = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/notification/readByUserId`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local list to mark all notifications as read.
      const updatedNotifications = allNotifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      dispatch(setAllNotifications(updatedNotifications));

      // Set Notification Count
      dispatch(setNotificationsCount(null));
    } catch (error) {
      console.error('Error marking all notifications as read', error);
    }
  };

  const deleteNotification = async (index) => {
    // Delete from the database
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/notification/`, {
        data: {
          notificationId: allNotifications[index].notificationId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from the local list.
      const updatedNotifications = allNotifications.filter((_, i) => i !== index);
      dispatch(setAllNotifications(updatedNotifications));

      // Set Notification Count based on updatedNotifications
      const readNotificationsCount = updatedNotifications.filter((data) => !data.read).length;
      dispatch(setNotificationsCount(readNotificationsCount));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const readNotification = async (index) => {
    const notificationId = allNotifications[index].notificationId;

    // Change the flage to true on local list.
    // Deep cloning because the spread operator's shallow copy may not work as expected with nested objects.
    const updatedNotifications = JSON.parse(JSON.stringify(allNotifications));
    updatedNotifications[index].read = true;
    dispatch(setAllNotifications(updatedNotifications));

    //Change the flage to true on database
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/notification/readByNotificationId`,
        {
          notificationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }

    // Count the number of objects where readFlag is true from the updatedNotifications
    const readNotificationsCount = updatedNotifications.filter((data) => !data.read).length;
    dispatch(setNotificationsCount(readNotificationsCount));
  };

  return (
    <div className='nav-item absolute right-5 md:right-40 top-16 shadow-lg dark:bg-secondary-dark-bg p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold md:text-lg dark:text-white'>Notifications</p>
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
          <div className='Each-Notifications mb-4' key={index}>
            <div
              className={`${
                eachNotification.read ? 'text-gray-400 dark:text-gray-500' : 'dark:text-white'
              } flex justify-between`}>
              <p className='max-w-60 line-clamp-2'>{eachNotification.desc}</p>
              <div className='flex items-center'>
                <button className='mr-3'>
                  {eachNotification.read ? (
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
