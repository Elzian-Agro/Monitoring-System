import React, { useEffect } from 'react';
import './index.css';

import Navbar from 'components/common/navbar';
import Sidebar from 'components/common/sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, selectTheme } from './slice/dashboardLayoutSlice';
import { setAllNotifications } from './slice/notificationSlice';
import axios from 'axios';

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

const Dashboard = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);
  const sidebarWidth = getSidebarWidth(activeMenu);
  const mainContentMargin = getMainContentMargin(activeMenu);
  const currentMode = useSelector(selectTheme);

  //Get Notifications for the user
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/notification/fetch-notification`, {
        userId: '6599ae73acebfda083c2f1b0',
      })
      .then((response) => {
        const datas = response.data.result;

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

          // Forming the date-only and timeonly  string
          const dateOnly = `${year}-${month}-${day}`;
          const timeOnly = `${hours}-${minutes} ${ampm}`;

          return {
            desc: data.notification,
            date: dateOnly,
            time: timeOnly,
            read: false,
          };
        });
        dispatch(setAllNotifications(notifications));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
