import React, { useState } from "react";
import logo from "../assest/constants/images/logo.png";
import ForgotPassword from "../components/ForgotPassword";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";

function LoginPage() {
  const [page, setPage] = useState("ResetPassword");

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-[100%] h-[100%] sm:w-[95%] sm:h-[95%] md:w-[90%] md:h-[90%] bg-transparent sm:bg-[#fff] shadow-lg flex flex-col p-5 sm:p-10 gap-10 overflow-y-scroll no-scrollbar rounded-md">
        <div className="w-[100%] flex-1 flex flex-col lg:flex-row rounded-lg gap-5 xs:gap-10">
          <div className="flex-[0.3] flex justify-center items-center lg:border-r-2 lg:px-10">
            <img
              src={logo}
              alt="logo"
              className="max-w-[50%] xxs:max-w-[40%] sm:max-w-[30%] lg:max-w-[100%]"
            />
          </div>

          <div className="flex-[1]">
            {(() => {
              switch (page) {
                case "ForgotPassword":
                  return <ForgotPassword setPage={setPage} />;
                case "ResetPassword":
                  return <ResetPassword setPage={setPage} />;
                default:
                  return <Login setPage={setPage} />;
              }
            })()}
          </div>
        </div>

        <div className="flex justify-center items-center text-center text-[#ccc] font-zenkaku text-[12px]">
          Copyright 2023 Elzian Agro. All Rights Reserved
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
