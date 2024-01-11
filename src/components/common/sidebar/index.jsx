import React from 'react';
import { ArrowUpTrayIcon, ArrowLeftCircleIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.png';

import { Link, NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, setActiveMenu } from '../../../pages/dashboard/slice/dashboardLayoutSlice';
import { sidebarLinks } from './sidebarConstants';

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);

  // This function for check if the active menu is 'open' if so will return true
  const isOpenMenu = () => activeMenu === 'open';

  const currentYear = new Date().getFullYear();

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white bg-green-500 text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-gray-100 m-2 hover:translate-x-2 duration-300';

  return (
    <div className="flex flex-col min-h-screen ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-2 ">
      <div className="flex justify-between items-center">
        <Link
          to="/dashboard"
          onClick={() => {
            dispatch(setActiveMenu(false));
          }}
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900 ">
          <img className="w-14" src={logo} alt="Elzian Agro logo" />
          {isOpenMenu() && <span>Elzian Agro</span>}
        </Link>
        {isOpenMenu() && (
          <button
            type="button"
            onClick={() => {
              dispatch(setActiveMenu('onlyIcon'));
            }}
            // style={{ color: currentColor }}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
            <ArrowLeftCircleIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      <div className="flex-grow sidebar-items mt-10">
        {sidebarLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <link.icon className="h-6 w-6" />
            {isOpenMenu() && link.text}
          </NavLink>
        ))}

        {/* Title Charts */}
        <div className="Title">
          <p className=" text-gray-400 m-3 mt-4 uppercase">Charts</p>
        </div>

        <NavLink to="/pie" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <ChartPieIcon className="h-6 w-6" />
          {isOpenMenu() && 'Pie'}
        </NavLink>

        {/* Logout */}
        <NavLink to="/" className="flex mt-8 items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-red-500 m-2 duration-300">
          <ArrowUpTrayIcon className="h-6 w-6 rotate-90" />
          {isOpenMenu() && 'Logout'}
        </NavLink>
      </div>
      {isOpenMenu() && (
        <footer className="text-gray-400 text-xs text-center mt-12">
          <p>Copyright {currentYear} Elzian Agro.</p>
          <p>All Rights Reserved</p>
        </footer>
      )}
    </div>
  );
};

export default Sidebar;
