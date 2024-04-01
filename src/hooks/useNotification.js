import { setNotificationCount } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from 'hooks/useAxios';
import { useState, useEffect } from 'react';

const useNotification = () => {
  const { send } = useAxios();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user._id);
  const [notifications, setNotifications] = useState([]);

  const fetchNotificationsData = async () => {
    const res = await send({ endpoint: `notification/?userId=${userId}`, method: 'GET' });
    setNotifications(res?.result || []);
    dispatch(setNotificationCount(res?.result?.filter((data) => !data.readFlag).length || 0));
  };

  useEffect(() => {
    if (userId) {
      fetchNotificationsData();
    }
    // eslint-disable-next-line
  }, [userId]);
  return { notifications, setNotifications };
};

export default useNotification;