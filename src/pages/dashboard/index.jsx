import React from "react";
import "./index.css";

import Navbar from "components/common/navbar";
import Sidebar from "components/common/sidebar";

import { useSelector } from "react-redux";
import { selectActiveMenu } from "./slice/appSlice";

function Dashboard() {
  const activeMenu = useSelector(selectActiveMenu);

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg bg-gray-100">
        {activeMenu === "open" ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : activeMenu === "onlyIcon" ? (
          <div className="w-30 dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg"></div>
        )}

        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
            activeMenu === "open"
              ? "md:ml-72"
              : activeMenu === "onlyIcon"
              ? "md:ml-2"
              : "flex-2"
          }`}
        >
          <div className="bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
