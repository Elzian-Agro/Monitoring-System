import axios from 'axios';
import { setAllNotifications, setNotificationsCount } from 'pages/dashboard/slice/notificationSlice';
import { useDispatch } from 'react-redux';

export const GetNotifications = async () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('jwtAccessToken');

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/notification/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const datas = response.data.result;
    console.log(datas);

    // Count the number of objects where readFlag is true
    const readNotificationsCount = datas.filter((data) => !data.readFlag).length;
    dispatch(setNotificationsCount(readNotificationsCount));

    const notifications = datas.map((data) => {
      // get the Date from the timestampString
      const timestampString = data.dateTime;
      const timestamp = new Date(timestampString);

      // Extracting date components
      const year = timestamp.getUTCFullYear();
      const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = timestamp.getUTCDate().toString().padStart(2, '0');

      // Extracting time components
      let hours = timestamp.getUTCHours().toString().padStart(2, '0');
      const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');
      // Determining AM/PM
      const ampm = hours >= 12 ? 'PM' : 'AM';
      // Converting to 12-hour format
      hours = hours % 12 || 12;

      // Forming the date-only and time-only string
      const dateOnly = `${year}-${month}-${day}`;
      const timeOnly = `${hours}-${minutes} ${ampm}`;

      return {
        desc: data.notification,
        date: dateOnly,
        time: timeOnly,
        read: data.readFlag,
        notificationId: data._id,
      };
    });

    dispatch(setAllNotifications(notifications));
  } catch (error) {
    console.log(error);
  }
};
