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
        return {
          desc: data.notification,
          date: data.dateTime.date,
          time: data.dateTime.time,
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
