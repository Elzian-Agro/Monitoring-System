import React from "react";

import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import avatar from "../../../assets/images/avatar.jpg"

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative ">
      <Bars3Icon className="h-6 w-6 cursor-pointer"/>
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
        >
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              James
            </span>
          </p>
          <ChevronDownIcon className="h-6 w-6 text-14 text-gray-400"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
