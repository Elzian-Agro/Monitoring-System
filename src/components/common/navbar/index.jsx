import React, { useState } from 'react';
import { Bars3Icon, ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import avatar from '../../../assets/images/avatar.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu, selectActiveMenu } from '../../../pages/dashboard/slice/dashboardLayoutSlice';
import UserProfile from 'pages/dashboard/components/common/user-profile';
import Notification from 'pages/dashboard/components/common/notification-set';
import ThemeSettings from 'pages/dashboard/components/common/theme-settings';

const Navbar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [isNotificationOpen, setisNotificationOpen] = useState(false);
  const userName = 'Michael';

  // Function to handle the click on the profile button
  const handleProfileClick = () => {
    setisProfileOpen(!isProfileOpen);
    setisNotificationOpen(false); // Close notification when profile is opened
  };

  // Function to handle the click on the notification button
  const handleNotificationClick = () => {
    setisNotificationOpen(!isNotificationOpen);
    setisProfileOpen(false); // Close profile when notification is opened
  };

  const toggleActiveMenu = () => {
    let newActiveMenu;

    if (activeMenu === 'open') {
      newActiveMenu = 'onlyIcon';
    } else if (activeMenu === 'onlyIcon') {
      newActiveMenu = 'close';
    } else {
      newActiveMenu = 'open';
    }

    dispatch(setActiveMenu(newActiveMenu));
  };

  return (
    <div className="flex justify-between p-2 md:mr-6 relative">
      <button type="button" className="relative text-xl rounded-full p-3 hover:bg-light-gray" onClick={toggleActiveMenu}>
        <Bars3Icon className="h-6 w-6 cursor-pointer" />
      </button>

      <div className="flex">
        <ThemeSettings />
        <button type="button" className="relative text-xl rounded-full p-3 hover:bg-light-gray" onClick={handleNotificationClick}>
          <span style={{ background: 'red' }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
          <BellIcon className="h-6 w-6 text-14 " />
        </button>
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={handleProfileClick}>
          <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
          <p>
            <span className="text-gray-400 text-14 hidden md:inline-block">Hi,</span>
            <span className="text-gray-400 font-bold ml-1 text-14">
              <span class="md:hidden">{userName.charAt(0)}</span>
              <span class="hidden md:inline">{userName}</span>
            </span>
          </p>
          <ChevronDownIcon className="h-6 w-6 text-14 text-gray-400" />
        </div>
        {isProfileOpen && <UserProfile />}
        {isNotificationOpen && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
