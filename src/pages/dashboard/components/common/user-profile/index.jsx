import React from 'react';
import { XCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { setProfileOpen } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import ThemeSettings from '../theme-settings';
import { userProfileData } from 'constant';

const UserProfile = () => {
  const dispatch = useDispatch();

  //Capitalize the text
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const userType = useSelector((state) => capitalize(state.user.userType));
  const organizationName = useSelector((state) => state.user.orgName);
  const profileImage = useSelector((state) => state.user.profileImage);

  const closeProfile = () => {
    dispatch(setProfileOpen(false));
  };

  const logout = () => {
    try {
      localStorage.removeItem('jwtAccessToken');
      localStorage.removeItem('jwtRefreshToken');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='nav-item absolute right-1 top-16 shadow-lg dark:bg-secondary-dark-bg p-6 md:p-8 rounded-lg w-72 md:w-96'>
      <div className='flex justify-between items-center'>
        <p className='font-semibold md:text-lg dark:text-white'>My Profile</p>
        <button onClick={closeProfile}>
          <XCircleIcon className='h-6 w-6 dark:text-white' />
        </button>
      </div>
      {/* I need to add link to this below div */}
      <NavLink to='/profile' className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <img className='rounded-full h-20 md:h-24 md:w-24' src={profileImage} alt='user-profile' />
        <div>
          <p className='font-semibold md:text-xl dark:text-white'>
            {firstName} {lastName}{' '}
          </p>
          <p className='text-gray-500 text-sm'> {userType} </p>
          <p className='text-gray-500 text-sm font-semibold'> {organizationName} </p>
        </div>
      </NavLink>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className='flex gap-5 border-b-1 border-color p-4 rounded-lg hover:bg-[#F7F7F7] dark:hover:bg-green-500 cursor-pointer'>
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
          className='flex mt-12 items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm md:text-base text-black dark:text-white dark:hover:text-black hover:bg-red-500 m-2 duration-300'
          onClick={logout}>
          <ArrowUpTrayIcon className='h-6 w-6 rotate-90' />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
