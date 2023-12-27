import React from "react";
// import { SiShopware } from "react-icons/si";
import logo from "../../../assest/constants/images/logo.png"
// import { MdOutlineCancel } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeMenu = true;

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white bg-green-500 text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
    
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
          
            <Link
              to="/dashboard"
              onClick={() => {}}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <img className="w-20" src={logo} alt="Elzian Agro logo"/>
              <span>Elzian Agro</span>
            </Link>
            <button
              type="button"
              onClick={() => {}}
              // style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              {/* <MdOutlineCancel /> */}
            </button>
          </div>
          <div className="sidebar-items mt-10">
            <NavLink
              to="/dashboard"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/customer"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Customers
            </NavLink>
            <NavLink
              to="/orders"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Orders
            </NavLink>
            <NavLink
              to="/analytics"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Analytics
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Settings
            </NavLink>
            <NavLink
              to="/addProducts"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Add Products
            </NavLink>
            <div className="Title">
              <p className=" text-gray-400 m-3 mt-4 uppercase">Charts</p>
            </div>

            <NavLink
              to="/pie"
              onClick={() => {}}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Pie
            </NavLink>


            <NavLink
              to="/"
              onClick={() => {}}
              className= "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black dark:hover:text-black hover:bg-light-gray m-2"
            >
              Logout
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
