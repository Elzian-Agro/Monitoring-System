import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <button
      className={'bg-green-500 hover:bg-green-400 text-white py-2 px-4 mr-2 rounded-lg w-24 md:w-32'}
      onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
