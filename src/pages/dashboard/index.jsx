import React from 'react';
import './index.css';

import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';

import { useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from './slice/dashboardLayoutSlice';
import { GetNotifications } from 'pages/utils/GetNotifications';

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

  // TODO: Get the userId from the server
  const userId = '6599ae73acebfda083c2f1b0';

  // Get Notifications for the user and save it inside the reduxtoolkit (allNotifications)
  GetNotifications(userId);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='flex relative dark:bg-main-dark-bg bg-gray-100'>
        <div className={`${sidebarWidth} z-20 md:z-0 dark:bg-secondary-dark-bg shadow-2xl dark:shadow-none bg-white`}>
          <Sidebar />
        </div>

        <div className={`${mainContentMargin} dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`}>
          <div className='z-10 bg-main-bg dark:bg-main-dark-bg w-full'>
            <Navbar />
          </div>
          {page}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
