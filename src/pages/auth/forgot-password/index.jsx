import React, { useState } from "react";
import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Button from "pages/auth/components/base/Button";
import TextBox from "pages/auth/components/base/TextBox";
import ErrorMessage from "pages/auth/components/base/ErrorMessage";
import { isValidEmail } from "pages/auth/utils";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateEmail } from "../slice/emailSlice";

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("emailRegexFailed");
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost:5000/auth/forget-password", {
        email: email,
      })
      .then(() => {
        setError(null);
        dispatch(updateEmail(email));
        setIsLoading(false);
        setPage("ResetPassword");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          setError("userNotfound");
        } else {
          setError("serverError");
        }
      });
  };

  return (
    <div className="flex flex-col h-full w-full gap-5 md:gap-0 items-start">
      <button
        onClick={() => setPage("Login")}
        className="group w-[100px] flex items-center"
      >
        <ArrowLeftIcon className="w-[20px] group-hover:ml-[-20px] transition-all" />
        <p className="flex-1 font-zenkaku text-[12px]">Go Back</p>
      </button>

      <div className="flex-1 flex items-center flex-col lg:justify-center h-full w-full">
        <h1 className="font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5 sm:leading-10">
          FORGOT PASSWORD?
        </h1>
        <p className="font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10">
          ENTER YOUR EMAIL FOR THE VERIFICATION PROCESS
        </p>

        <form
          className="flex flex-col items-center p-2 xs:p-4 gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <TextBox
            placeholder="Enter your email"
            label="Email Address"
            type="email"
            Icon={EnvelopeIcon}
            value={email}
            setValue={setEmail}
          />

          {error && <ErrorMessage message={error} />}

          <Button
            text={isLoading ? "Loading..." : "Continue"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ForgotPassword;
