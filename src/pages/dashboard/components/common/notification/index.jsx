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
    dispatch(setAllNotifications(allNotifications.filter((_, i) => i !== index))); // Remove from the local List
    dispatch(setNotificationsCount(allNotifications.length - 1));

    try {
      // Delete from the database
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/notification/delete-notification`, {
        data: {
          userId: allNotifications[index].userId,
          notificationId: allNotifications[index].notificationId, //Later Change it to =  _id and remove this notificationId
        },
      });

      // Set Notification Count
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const readNotification = async (index) => {
    const userId = '6599ae73acebfda083c2f1b0';
    const notificationId = allNotifications[index].notificationId; //Later Change it to =  _id and remove this notificationId

    // belows is a  deep cloning bcs spread  operator's shallow copy not working as expected with object.
    const updatedNotifications = JSON.parse(JSON.stringify(allNotifications));
    updatedNotifications[index].read = true;
    dispatch(setAllNotifications(updatedNotifications));

    await axios.post(`${process.env.REACT_APP_BASE_URL}/notification/view-notification`, {
      userId,
      notificationId,
    });
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
