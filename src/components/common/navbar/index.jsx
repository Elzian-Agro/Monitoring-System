import { Bars3Icon, ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveMenu,
  selectActiveMenu,
  setProfileOpen,
  selectProfileOpen,
  setNotificationOpen,
  selectNotificationOpen,
  selectNotificationCount,
} from 'pages/dashboard/slice/dashboardLayoutSlice';
import UserProfile from 'pages/dashboard/components/common/profile';
import Notification from 'pages/dashboard/components/common/notification';
import ThemeSettings from 'pages/dashboard/components/common/theme-settings';
import { menuMode } from 'constant';
import avatar from 'assets/images/avatar.png';
import LanguageSelector from '../language-selector';
import PropTypes from 'prop-types';

const Navbar = ({ mainContentMargin }) => {
  const activeMenu = useSelector(selectActiveMenu);
  const isProfileOpen = useSelector(selectProfileOpen);
  const isNotificationOpen = useSelector(selectNotificationOpen);
  const notificationsCount = useSelector(selectNotificationCount);

  const dispatch = useDispatch();
  const currentMenuMode = useSelector(selectActiveMenu);

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
    <div
      className={`fixed top-0 left-0 right-0 z-20 bg-main-bg dark:bg-main-dark-bg flex p-2 ${
        currentMenuMode === 'open' ? 'justify-end sm:justify-between' : 'justify-between'
      }`}>
      <button
        type='button'
        className={`relative dark:text-white hover:bg-light-gray dark:hover:text-black text-xl rounded-full p-3 ${mainContentMargin} ${
          currentMenuMode === 'open' && 'hidden sm:block'
        } ${currentMenuMode === 'onlyIcon' && 'ml-20'}`}
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
        {isNotificationOpen && <Notification />}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  mainContentMargin: PropTypes.string.isRequired,
};

export default Navbar;
