import React from 'react';
import { ArrowUpTrayIcon, ArrowLeftCircleIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, setActiveMenu } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { sidebarLinks } from './sidebarConstants';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);
  const { t } = useTranslation();

  // This function for check if the active menu is 'open' if so will return true
  const isOpenMenu = () => activeMenu === 'open';

  const currentYear = new Date().getFullYear();

  const logout = () => {
    localStorage.removeItem('jwtAccessToken');
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white bg-green-500 text-sm m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-black dark:text-white dark:hover:text-black hover:bg-gray-100 m-2 hover:translate-x-2 duration-300';

  return (
    <div className='flex flex-col min-h-screen ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-2 '>
      <div className='flex justify-between items-center'>
        <Link
          to='/dashboard'
          onClick={() => {
            dispatch(setActiveMenu('close'));
          }}
          className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900 dark:text-green-600'>
          <img className='md:w-14 xxs:w-10' src={logo} alt='Elzian Agro logo' />
          {isOpenMenu() && <span className='text-base md:text-lg'>Elzian Agro</span>}
        </Link>
        {isOpenMenu() && (
          <button
            type='button'
            onClick={() => {
              dispatch(setActiveMenu('onlyIcon'));
            }}
            className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden group'>
            <ArrowLeftCircleIcon className='h-6 w-6 dark:text-white dark:group-hover:text-black' />
          </button>
        )}
      </div>
      <div className='flex-grow sidebar-items mt-10'>
        {sidebarLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <link.icon className='h-6 w-6' />
            {isOpenMenu() && link.text}
          </NavLink>
        ))}

        {/* Title Charts */}
        <div className='Title'>
          <p className=' text-gray-400 m-3 mt-4 uppercase'>Charts</p>
        </div>

        <NavLink to='/pie' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <ChartPieIcon className='h-6 w-6' />
          {isOpenMenu() && 'Pie'}
        </NavLink>

        {/* Logout */}
        <NavLink
          to='/'
          className='flex mt-8 items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-sm text-black dark:text-white hover:bg-red-500 m-2 duration-300'
          onClick={logout}>
          <ArrowUpTrayIcon className='h-6 w-6 rotate-90' />
          {isOpenMenu() && 'Logout'}
        </NavLink>
      </div>
      {isOpenMenu() && (
        <footer className='text-gray-400 text-xs text-center mt-12'>
          <p>{t('Copyright Elzian Agro. All Rights Reserved', { val: currentYear })}</p>
        </footer>
      )}
    </div>
  );
};

export default Sidebar;
