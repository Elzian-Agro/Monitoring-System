import React, { useState } from "react";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Button from "pages/auth/components/base/Button";
import TextBox from "pages/auth/components/base/TextBox";
import ErrorMessage from "pages/auth/components/base/ErrorMessage";
import PropTypes from "prop-types";
import { isValidPassword } from "pages/auth/utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../slice/emailSlice";

function ResetPassword({ setPage }) {
  const [tempPass, setTempPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hashedEmail = useSelector((state) => state.email.value);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!tempPass) {
      setError("emptyTempPassword");
      return 0;
    } else if (!isValidPassword(newPass)) {
      setError("passwordRegexFailed");
      return 0;
    } else if (newPass !== confirmPass) {
      setError("passwordNoMatch");
      return 0;
    }

    setIsLoading(true);

    const data = {
      email: hashedEmail,
      temporaryPassword: tempPass,
      newPassword: newPass,
    };

    axios
      .post("url", data)
      .then(() => {
        setError(null);
        dispatch(updateEmail(null));
        setIsLoading(false);
        setPage("Login");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 401) {
          setError("wrongTempPassword");
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
          RESET PASSWORD
        </h1>
        <p className="font-zenkaku font-normal text-center text-[#999] text-[10px] sm:text-[16px] leading-5 xxs:leading-10">
          TEMPORARY PASSWORD HAS BEEN SENT TO YOUR EMAIL
        </p>

        <form
          className="flex flex-col items-center p-2 xs:p-4 gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <TextBox
            placeholder="Enter  Temporary Password"
            label="Temporary Password"
            type="password"
            Icon={LockClosedIcon}
            value={tempPass}
            setValue={setTempPass}
          />

          <TextBox
            placeholder="Enter New Password"
            label="New Password"
            type="password"
            Icon={LockClosedIcon}
            value={newPass}
            setValue={setNewPass}
          />

          <TextBox
            placeholder="Enter New Password Again"
            label="Confirm Password "
            type="password"
            Icon={LockClosedIcon}
            value={confirmPass}
            setValue={setConfirmPass}
          />

          {error && <ErrorMessage message={error} />}

          <Button text="Continue" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ResetPassword;
