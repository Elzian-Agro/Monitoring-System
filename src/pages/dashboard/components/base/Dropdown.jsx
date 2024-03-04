import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function Dropdown({ label = null, Icon = null, required = false, defaltOptions = 'Select', value, setValue, options }) {
  const { t } = useTranslation();

  return (
    <div className='min-w-60 w-60 sm:w-64 md:w-80 lg:w-full'>
      <div className='mb-2'>
        <label htmlFor={label} className='bg-white dark:bg-secondary-dark-bg text-gray-400 text-sm'>
          {t(label)}:
        </label>
      </div>
      <div className='border-2 border-b-[3px] border-gray-300 rounded'>
        <div className='relative flex items-center p-2'>
          {Icon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={required}
            className='text-base appearance-none bg-transparent border-none w-full h-6 text-gray-700 dark:text-white dark:bg-secondary-dark-bg leading-tight px-2 focus:outline-none'>
            <option value='' disabled selected>
              {t(defaltOptions)}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <div className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300'>
            <ChevronDownIcon className='h-6 w-6' />
          </div>
        </div>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  Icon: PropTypes.elementType,
  defaltOptions: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dropdown;
