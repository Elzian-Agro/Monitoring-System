import React, { useState, useEffect } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Button from "components/Button";
import TextBox from "components/TextBox";
import ErrorMessage from "components/ErrorMessage";
import PropTypes from "prop-types";

function Login({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Retrieve remembered credentials from localStorage
  useEffect(() => {
    if (
      localStorage.getItem("rememberedUsername") &&
      localStorage.getItem("rememberedPassword")
    ) {
      setUsername(localStorage.getItem("rememberedUsername"));
      setPassword(localStorage.getItem("rememberedPassword"));
      setRemember(true);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username) {
      setError("Please Enter Username!");
      return;
    }

    if (!password) {
      setError("Please Enter Password!");
      return;
    }

    // Handle api
    try {
      setError(null);
      setLoading(true);

      // login request and save token

      // Save the username and password if "Remember me" is checked
      if (remember) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }

      //setLoading(false);
    } catch {
      setLoading(false);
      setError("Invalid username or password");
    }
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
        onSubmit={handleLogin}
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
              checked={remember}
              onChange={() => setRemember(!remember)}
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

        <Button text={loading ? "Logging in..." : "Login"} disabled={loading} />
      </form>
    </div>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login;
