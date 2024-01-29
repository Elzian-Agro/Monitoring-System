import React from 'react';
import PropTypes from 'prop-types';

function TextBox({ placeholder = '', type = 'text', value, setValue }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='text-black text-sm dark:bg-secondary-dark-bg dark:text-white p-2 border-2 border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:border-black dark:focus:border-white'
    />
  );
}

TextBox.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default TextBox;
