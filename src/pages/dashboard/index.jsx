import React from 'react';
import './index.css';

import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';

import { useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from './slice/dashboardLayoutSlice';

const getSidebarWidth = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'w-64 md:w-60 fixed';
    case 'onlyIcon':
      return 'w-30';
    default:
      return 'w-0';
  }
};

const getMainContentMargin = (activeMenu) => {
  switch (activeMenu) {
    case 'open':
      return 'ml-64 md:ml-60';
    case 'onlyIcon':
      return 'md:ml-2';
    default:
      return 'flex-2';
  }
};

const Dashboard = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentMode = useSelector(selectTheme)

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg bg-gray-100">
        <div className={`${sidebarWidth} sidebar dark:bg-secondary-dark-bg bg-white`}>
          <Sidebar />
        </div>

        <div className={`${mainContentMargin} dark:bg-main-dark-bg bg-main-bg min-h-screen w-full`}>
          <div className="bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;