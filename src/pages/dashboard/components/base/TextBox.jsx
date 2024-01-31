import React from 'react';
import PropTypes from 'prop-types';

function TextBox({ label = null, type = 'text', placeholder = '', Icon = null, value, setValue }) {
  const hasLabel = !!label;
  const hasIcon = !!Icon;

  return (
    <div className={`relative border-2 border-gray-300 rounded ${hasLabel ? 'dark:bg-secondary-dark-bg' : ''}`}>
      {hasLabel && (
        <label
          className='absolute top-[-12px] left-2 bg-white dark:bg-secondary-dark-bg px-1 text-gray-400 text-sm font-regular font-zenkaku'
          htmlFor={`textbox-${label}`}>
          {label}
        </label>
      )}
      <div className={`flex items-center p-2 ${hasIcon ? 'border-b-2 border-gray-300 dark:border-gray-700' : ''}`}>
        {hasIcon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
        <input
          type={type}
          id={`textbox-${label}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='appearance-none bg-transparent border-none w-full h-full text-gray-700 dark:text-white p-2 leading-tight focus:outline-none'
        />
      </div>
    </div>
  );
}

TextBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  Icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
  serValue: PropTypes.func.isRequired,
};

export default TextBox;
