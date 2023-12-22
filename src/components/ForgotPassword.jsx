import React, { useState } from "react";
import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Button from "./utils/login/Button";
import TextBox from "./utils/login/TextBox";
import ErrorMessage from "./utils/login/ErrorMessage";
import { isValidEmail } from "./utils/login/Validator";
import PropTypes from "prop-types";

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please Enter a Valid Email Address!");
      return;
    }

    //handle api...

    setError(null);
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

      <div className="flex-1 flex items-center flex-col xl:justify-center h-full w-full">
        <h1 className="font-zenkaku font-black text-[#212121] text-[18px] sm:text-[26px] leading-5">
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

          {error && (
            <ErrorMessage message={error} />
          )}

          <Button text="Continue" />
        </form>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ForgotPassword;
