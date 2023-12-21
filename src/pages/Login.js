import React from "react";
import logo from "../assest/images/logo.png";

const Login = () => {
  // Logic for login

  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="bg-white shadow-2xl rounded-lg p-8 flex max-sm:flex-col ">
        <div className="flex items-center justify-center sm:mr-8 max-sm:items-center max-sm:mb-5">
          <img src={logo} alt="Logo" className="w-104 h-auto max-sm:w-56" />
        </div>
        <form className="flex flex-col justify-center w-full">
          <div className="flex items-center justify-center">
            <h2 className="max-[660px]:text-base max-[795px]:text-xl text-3xl font-semibold mb-5">
              Login to the dashboard!
            </h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            className="border rounded-lg px-3 py-2 mb-5"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 mb-5"
          />
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-base max-md:text-sm max-sm:text-xs">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-blue-500 text-base max-md:text-sm max-sm:text-xs"
            >
              Forget Password?
            </a>
          </div>
          <button className="bg-sky-400 text-white text-lg max-sm:text-base px-4 py-2 rounded-lg hover:bg-sky-300">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
