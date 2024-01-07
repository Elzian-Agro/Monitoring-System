import React from "react";
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import avatar from "../../../assets/images/avatar.jpg"

import { useDispatch, useSelector } from "react-redux";
import {setActiveMenu, selectActiveMenu} from "../../../pages/dashboard/slice/appSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(selectActiveMenu);

  const toggleActiveMenu = () => {
    let newActiveMenu;

    if (activeMenu === "open") {
      newActiveMenu = "onlyIcon";
    } else if (activeMenu === "onlyIcon") {
      newActiveMenu = "close";
    } else {
      newActiveMenu = "open";
    }

    dispatch(setActiveMenu(newActiveMenu));
  };



  return (
    <div className="flex justify-between p-2 md:mr-6 relative">

      <button
        type="button"
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        
        onClick={toggleActiveMenu}

      >
        {/* <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        /> */}
        <Bars3Icon className="h-6 w-6 cursor-pointer"/>
      </button>

      <div className="flex">
        <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              Michael
            </span>
          </p>
          <ChevronDownIcon className="h-6 w-6 text-14 text-gray-400"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;








