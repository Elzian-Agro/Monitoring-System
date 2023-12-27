import React from "react";

import Navbar from "pages/dashboard/components/navbar";
import Footer from "pages/dashboard/components/footer";
import Sidebar from "pages/dashboard/components/sidebar";
import ThemeSetting from "pages/dashboard/components/theme-settings";

function Dashboard() {
  const activeMenu = true;

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        <div
          className={`dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
