import React from "react";
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next";

function ErrorMessage({ message }) {
  const { t } = useTranslation();
  
  return <p className="text-red-500 text-xs font-zenkaku">{t(message)}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
