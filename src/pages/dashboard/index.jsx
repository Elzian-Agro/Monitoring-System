import './index.css';

import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';

import { useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from './slice/dashboardLayoutSlice';
import GetUserData from 'pages/utils/GetUserData';
import useAxios from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import Loader from './components/common/loader';

const getSidebarWidth = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'w-56 md:w-60 fixed';
    case 'onlyIcon':
      return 'w-30';
    default:
      return 'w-0';
  }
};

const getMainContentMargin = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'ml-56 md:ml-60';
    case 'onlyIcon':
      return 'md:ml-2';
    default:
      return 'flex-2';
  }
};

const Dashboard = ({ page }) => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentMode = useSelector(selectTheme);
  const { send } = useAxios();
  const userId = useSelector((state) => state.user._id);
  const [response, setresponse] = useState(null);
  const [loading, setloading] = useState(true);

  // Get UserData and  Notifications for the user and save it inside the reduxtoolkit.
  // Use the custom hook to get notifications and userData

  GetUserData();
  // GetNotifications();

  useEffect(() => {
    const fetchData = async () => {
      const res = await send({ endpoint: `notification/?userId=${userId}`, method: 'GET' });
      setresponse(res?.result);
      setloading(false);
    };
    if (userId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='flex relative dark:bg-main-dark-bg bg-gray-100'>
        <div className={`${sidebarWidth} z-20 md:z-0 dark:bg-secondary-dark-bg shadow-2xl dark:shadow-none bg-white`}>
          <Sidebar />
        </div>

        <div className={`${mainContentMargin} dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`}>
          <div className='z-10 bg-main-bg dark:bg-main-dark-bg w-full'>
            <Navbar notificationData={response} />
            {page}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
