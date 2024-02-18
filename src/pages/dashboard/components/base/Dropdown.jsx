import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function Dropdown({ label = null, Icon = null, value, setValue, options }) {
  const hasLabel = !!label;
  const hasIcon = !!Icon;

  return (
    <div className={`relative border-2 border-gray-300 rounded ${hasLabel ? 'dark:bg-secondary-dark-bg' : ''}`}>
      {hasLabel && (
        <label className='absolute top-[-12px] left-2 bg-white px-1 text-gray-400 dark:bg-secondary-dark-bg text-sm font-regular font-zenkaku rounded-md'>
          {label}
        </label>
      )}
      <div
        className={`flex items-center p-2 relative ${
          hasIcon ? 'border-b-2 border-gray-300 dark:border-gray-700' : ''
        }`}>
        {hasIcon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white p-2 leading-tight focus:outline-none'>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300'>
          <ChevronDownIcon className='h-6 w-6' />
        </div>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  Icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;
