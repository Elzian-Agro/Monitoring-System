import React from 'react';
import { ChatBubbleBottomCenterIcon, XCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import avatar from 'assets/images/avatar.png';
import { setProfileOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch } from 'react-redux';
import ThemeSettings from '../theme-settings';

const UserProfile = () => {
  const dispatch = useDispatch();

  const closeProfile = () => {
    dispatch(setProfileOpen(false));
  };

  const userProfileData = [
    {
      icon: <ChatBubbleBottomCenterIcon className='h-6 w-6' />,
      title: 'My Profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
  ];

  return (
    <div className='nav-item absolute right-1 top-16 bg-white dark:bg-secondary-dark-bg p-6 md:p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg dark:text-white'>User Profile</p>
        <button onClick={closeProfile}>
          <XCircleIcon className='h-6 w-6 dark:text-white' />
        </button>
      </div>
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <img className='rounded-full h-20 md:h-24 w-24' src={avatar} alt='user-profile' />
        <div>
          {/* TODO: Replace hard coded data with API data  */}
          <p className='font-semibold text-xl dark:text-white'> Michael Roberts </p>
          <p className='text-gray-500 text-sm'> Administrator </p>
          <p className='text-gray-500 text-sm font-semibold'> ElzianAgro.com </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className='flex gap-5 border-b-1 border-color p-4 hover:bg-[#F7F7F7] dark:hover:bg-green-400 cursor-pointer'>
            <button
              type='button'
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=' text-xl rounded-lg p-3 hover:bg-light-gray'>
              {item.icon}
            </button>

            <div>
              <p className='font-semibold dark:text-white'>{item.title}</p>
              <p className='text-gray-500 text-sm '> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex md:hidden p-4 h-20 mt-6'>
        <ThemeSettings />
      </div>
      <div className='mt-5'>
        <NavLink
          to='/'
          className='flex mt-12 items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:text-white dark:hover:text-black hover:bg-red-500 m-2 duration-300'>
          <ArrowUpTrayIcon className='h-6 w-6 rotate-90' />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
