import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button
      className={`${bgColor} hover:opacity-75 text-white text-sm px-2 py-2 rounded-lg w-20 md:w-32`}
      onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
