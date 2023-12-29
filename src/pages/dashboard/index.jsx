import React from "react";

import Navbar from "components/common/navbar";
import Footer from "components/common/footer";
import Sidebar from "components/common/sidebar";
import ThemeSettings from "pages/dashboard/components/common/theme-settings";

function Dashboard() {
  const activeMenu = true;

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg bg-gray-100">
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
