import React, { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import Button from "pages/auth/components/base/Button";
import TextBox from "pages/auth/components/base/TextBox";
import ErrorMessage from "pages/auth/components/base/ErrorMessage";
import PropTypes from "prop-types";
import { isValidPassword } from "pages/auth/utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../slice/emailSlice";
import { sha256 } from "js-sha256";
import Redirect from "pages/auth/components/base/Redirect";

function ResetPassword({ setPage }) {
  const [tempPass, setTempPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hashedEmail = useSelector((state) => state.email.value);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState(false);

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
      temporaryPassword: sha256(tempPass),
      newPassword: sha256(newPass),
    };

    axios
      .post("url", data)
      .then(() => {
        setError(null);
        dispatch(updateEmail(null));
        setIsLoading(false);
        setSuccess(true);
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

  const handleGoBack = () => {
    dispatch(updateEmail(null));
    setPage("Login");
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendEmail = () => {
    axios
      .post("url")
      .then(() => {
        setTimer(60);
      })
      .catch((error) => {
        alert(`${error.response.status}: An Unexpected Error Occured!`);
      });
  };

  return (
    <div className="flex flex-col h-full w-full gap-5 md:gap-0 items-start">
      <button
        onClick={handleGoBack}
        className="group w-[100px] flex items-center"
      >
        <ArrowLeftIcon className="w-[20px] group-hover:ml-[-20px] transition-all" />
        <p className="flex-1 font-zenkaku text-[12px]">Go Back</p>
      </button>

      {hashedEmail && !success && (
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

          <div>
            {timer > 0 ? (
              <p className="font-zenkaku font-light text-[12px] text-center">
                Email Sent! Didn't Recieve? Resend Email in {timer} Seconds
              </p>
            ) : (
              <button
                onClick={handleResendEmail}
                className="text-blue-500 hover:text-blue-700 font-zenkaku"
              >
                Resend Email
              </button>
            )}
          </div>
        </div>
      )}

      {(!hashedEmail && !success) && (
        <Redirect
          setPage={setPage}
          Icon={ExclamationTriangleIcon}
          message={"Unauthorized Access"}
          type={"warning"}
        />
      )}

      {success && (
        <Redirect
          setPage={setPage}
          Icon={CheckCircleIcon}
          message={"Password Reset Successfully"}
          type={"success"}
        />
      )}
    </div>
  );
}

ResetPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default ResetPassword;
