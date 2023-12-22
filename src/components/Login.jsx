import React, { useState } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Button from "./utils/login/Button";
import TextBox from "./utils/login/TextBox";
import ErrorMessage from "./utils/login/ErrorMessage";
import PropTypes from "prop-types";

function Login({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username) {
      setError("Please Enter Username!");
      return;
    }

    if (!password) {
      setError("Please Enter Password!");
      return;
    }

    //handle api...

    setError(null);
  };

  return (
    <div className="flex-1 flex items-center flex-col lg:justify-center h-full w-full gap-2 xxs:gap-0">
      <h1 className="font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5 sm:leading-10">
        LOG IN
      </h1>
      <p className="font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10">
        LOG IN TO YOUR DASHBOARD
      </p>

      <form
        className="flex flex-col items-center p-2 xs:p-4 gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <TextBox
          placeholder="Enter your username"
          label="Username"
          type="text"
          Icon={UserIcon}
          value={username}
          setValue={setUsername}
        />

        <TextBox
          placeholder="Enter your password"
          label="Password"
          type="password"
          Icon={LockClosedIcon}
          value={password}
          setValue={setPassword}
        />

        <div className="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex justify-normal font-zenkaku font-light text-[12px] sm:text-[16px]">
          <div className="flex-1 flex gap-2 content-center">
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="checkbox">Remember me</label>
          </div>

          <button
            className="hover:text-[#0000EE] transition-all"
            onClick={() => setPage("ForgotPassword")}
          >
            Forgot Password?
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <Button text="Login" />
      </form>
    </div>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login;
