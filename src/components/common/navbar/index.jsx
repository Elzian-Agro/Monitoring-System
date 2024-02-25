import { Bars3Icon, ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveMenu,
  selectActiveMenu,
  setProfileOpen,
  selectProfileOpen,
  setNotificationOpen,
  selectNotificationOpen,
} from 'pages/dashboard/slice/dashboardLayoutSlice';
import UserProfile from 'pages/dashboard/components/common/profile';
import Notification from 'pages/dashboard/components/common/notification';
import ThemeSettings from 'pages/dashboard/components/common/theme-settings';
import { menuMode } from 'constant';
import avatar from 'assets/images/avatar.png';
import LanguageSelector from '../language-selector';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';

const Navbar = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const isProfileOpen = useSelector(selectProfileOpen);
  const isNotificationOpen = useSelector(selectNotificationOpen);
  const userId = useSelector((state) => state.user._id);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const dispatch = useDispatch();
  const { send } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const res = await send({ endpoint: `notification/?userId=${userId}`, method: 'GET' });
      setNotificationsCount(res?.result?.filter((data) => !data.readFlag).length || 0);
    };
    if (userId) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [userId]);

  //Get user details through redux toolkit
  const userName = useSelector((state) => state.user.firstName);
  const profileImage = useSelector((state) => state.user.profileImage);

  // Function to handle the click on the profile button
  const handleProfileClick = () => {
    dispatch(setProfileOpen(!isProfileOpen));
    dispatch(setNotificationOpen(false)); // Close notification when profile is opened
  };

  // Function to handle the click on the notification button
  const handleNotificationClick = () => {
    dispatch(setNotificationOpen(!isNotificationOpen));
    dispatch(setProfileOpen(false)); // Close profile when notification is opened
  };

  const toggleActiveMenu = () => {
    let nextActiveMenu;

    if (activeMenu === menuMode.open) {
      nextActiveMenu = menuMode.partiallyOpen;
    } else if (activeMenu === menuMode.partiallyOpen) {
      nextActiveMenu = menuMode.close;
    } else {
      nextActiveMenu = menuMode.open;
    }

    dispatch(setActiveMenu(nextActiveMenu));
  };

  return (
    <div className='flex justify-between xs:pl-2 pt-2 pb-2 pr-2 md:mr-6 relative'>
      <button
        type='button'
        className='relative text-xl rounded-full p-3  dark:text-white hover:bg-light-gray dark:hover:text-black'
        onClick={toggleActiveMenu}>
        <Bars3Icon className='h-6 w-6 cursor-pointer' />
      </button>

      <div className='flex'>
        <div className='hidden md:flex gap-2'>
          <ThemeSettings />
          <LanguageSelector />
        </div>
        <button
          type='button'
          className='relative text-xl rounded-full p-3 hover:bg-light-gray dark:text-white dark:hover:text-black'
          onClick={handleNotificationClick}>
          {notificationsCount > 0 && (
            <span
              style={{ background: notificationsCount > 0 ? 'red' : '' }}
              className='absolute inline-flex rounded-full right-1 top-1'>
              <span className='text-xs font-semibold text-white px-1'>{notificationsCount}</span>
            </span>
          )}
          <BellIcon className='h-6 w-6 text-14' />
        </button>
        <div
          className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={handleProfileClick}>
          <img
            className='rounded-full w-8 h-8'
            src={`${profileImage || avatar}?timestamp=${new Date().getTime()}`}
            alt='user-profile'
          />
          <p className='xxs:hidden sm:block'>
            <span className='text-gray-400 text-14 hidden md:inline-block'>Hi,</span>
            <span className='text-gray-400 font-bold ml-1 text-14'>
              <span className='md:hidden'>{userName.charAt(0)}</span>
              <span className='hidden md:inline'>{userName}</span>
            </span>
          </p>
          <ChevronDownIcon className='h-6 w-6 text-14 text-gray-400' />
        </div>
        {isProfileOpen && <UserProfile />}
        {isNotificationOpen && <Notification setNotificationsCount={setNotificationsCount} />}
      </div>
    </div>
  );
};

export default Navbar;
