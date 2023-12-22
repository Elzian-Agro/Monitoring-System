import React from "react";
import PropTypes from "prop-types"

function ErrorMessage({ message }) {
  return <p className="text-red-500 text-xs font-zenkaku">{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
