import React, { useState } from "react";
import logo from "../assest/constants/images/logo.png";
import ForgotPassword from "../components/ForgotPassword";
import Login from "../components/Login";

function LoginPage() {
  const [page, setPage] = useState("Login");

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-[100%] h-[100%] sm:w-[95%] sm:h-[95%] md:w-[90%] md:h-[90%] bg-transparent sm:bg-[#fff] shadow-lg flex flex-col p-5 sm:p-10 gap-10 overflow-y-scroll no-scrollbar rounded-md">
        <div className="w-[100%] flex-1 flex flex-col xl:flex-row rounded-lg gap-10">
          <div className="flex-[0.3] flex justify-center items-center xl:border-r-2 xl:px-10">
            <img
              src={logo}
              alt="logo"
              className="max-w-[75%] xs:max-w-[50%] sm:max-w-[30%] xl:max-w-[100%]"
            />
          </div>

          <div className="flex-[0.7]">
            {page === "Login" ? (
              <Login setPage={setPage} />
            ) : (
              <ForgotPassword setPage={setPage} />
            )}
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
