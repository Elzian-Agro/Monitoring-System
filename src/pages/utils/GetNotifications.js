import { setAllNotifications, setNotificationsCount } from 'pages/dashboard/slice/notificationSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from 'hooks/useAxios';

const GetNotifications = () => {
  const dispatch = useDispatch();
  const { send } = useAxios();
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await send({ endpoint: `notification/?userId=${userId}`, method: 'GET' });
      const datas = res?.result;

      // Count the number of objects where readFlag is true
      const readNotificationsCount = datas?.filter((data) => !data.readFlag).length;
      dispatch(setNotificationsCount(readNotificationsCount));

      const notifications = datas?.map((data) => {
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
    };

    if (userId) {
      getNotifications();
    }
    // eslint-disable-next-line
  }, [userId]);
};

export default GetNotifications;
