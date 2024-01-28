import { XCircleIcon, EyeSlashIcon, BellSlashIcon, TrashIcon } from '@heroicons/react/24/outline';
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

  const closeNotification = () => {
    dispatch(setNotificationOpen(false));
  };

  const allNotificationsRead = () => {
    //Need to complete this function
  };

  const deleteNotification = async (index) => {
    const token = localStorage.getItem('jwtAccessToken');

    try {
      // Delete from the database
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/notification/delete-notification`, {
        data: {
          notificationId: allNotifications[index].notificationId, // Later Change it to = _id and remove this notificationId
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from the local list
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
    const notificationId = allNotifications[index].notificationId; // Later Change it to = _id and remove this notificationId

    // Change the flage to true on local copy
    // Deep cloning because the spread operator's shallow copy may not work as expected with nested objects.
    const updatedNotifications = JSON.parse(JSON.stringify(allNotifications));
    updatedNotifications[index].read = true;
    dispatch(setAllNotifications(updatedNotifications));

    const token = localStorage.getItem('jwtAccessToken');

    //Change the flage to true on database
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/notification/view-notification`,
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
            <div
              className={`${eachNotification.read ? 'line-through' : ''} flex justify-between dark:decoration-white`}>
              {/* truncate Or line-clamp-2  - Choose later For now i have choosen truncate*/}
              <p className='dark:text-white max-w-60 line-clamp-2'>{eachNotification.desc}</p>
              <div className='flex items-center'>
                <button className='mr-3'>
                  <EyeSlashIcon onClick={() => readNotification(index)} className='h-5 w-5 dark:text-white' />
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
