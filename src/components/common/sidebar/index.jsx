import React from "react";
import { ArrowUpTrayIcon, XMarkIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import logo from "assets/images/logo.png"

import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {selectActiveMenu, setActiveMenu} from "../../../pages/dashboard/slice/appSlice";
import { sidebarLinks } from "./sidebarConstants";

const Sidebar = () => {
  
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white bg-green-500 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-gray-100 m-2 hover:translate-x-2 duration-300";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-2 ">
    
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
          
            <Link
              to="/dashboard"
              onClick={() => {
                dispatch(setActiveMenu(false));
              }}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900 "
            >
              <img className="w-20" src={logo} alt="Elzian Agro logo"/>
              <span>Elzian Agro</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                dispatch(setActiveMenu(!activeMenu));
              }}
              // style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <XMarkIcon className="h-6 w-6"/>
            </button>
          </div>
          <div className="sidebar-items mt-10">
          {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {}}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                <link.icon className="h-6 w-6" />
                {link.text}
              </NavLink>
            ))}

            {/* Title Charts */}
            <div className="Title">
              <p className=" text-gray-400 m-3 mt-4 uppercase">Charts</p>
            </div>

            <NavLink
              to="/pie"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
            <ChartPieIcon className="h-6 w-6"/>
              Pie
            </NavLink>

            {/* Logout */}
            <NavLink
              to="/"
              onClick={() => {}}
              className= "flex mt-12 items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-red-500 m-2 duration-300"
            >
              <ArrowUpTrayIcon className="h-6 w-6 rotate-90"/>
              Logout
            </NavLink>
          </div>
          <footer className="text-gray-400 text-xs text-center">
            <p>Copyright 2023 Elzian Agro.</p>
            <p>All Rights Reserved</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Sidebar;
