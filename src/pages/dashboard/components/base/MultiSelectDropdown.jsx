import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import ClickOutsideHandler from 'pages/dashboard/utils/ClickOutsideHandler';

const MultiSelectDropdown = ({
  label = 'Select Multiple Items',
  placeholder = 'Select Items',
  Icon = null,
  options,
  onChange,
  selectedValues = [],
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    const newSelectedValues = [...selectedValues];
    const index = newSelectedValues.indexOf(value);

    if (index !== -1) {
      newSelectedValues.splice(index, 1);
    } else {
      newSelectedValues.push(value);
    }

    onChange(newSelectedValues);
    selectedValues.push(value);
  };

  const isSelected = (value) => selectedValues.includes(value);

  return (
    <div className='min-w-60 w-60 sm:w-64 md:w-80 lg:w-full'>
      <div className='mb-2'>
        <label htmlFor={label} className='bg-white dark:bg-secondary-dark-bg text-gray-400 text-sm'>
          {t(label)}
        </label>
      </div>
      <ClickOutsideHandler callback={() => setIsOpen(false)}>
        {(ref) => (
          <div className='border-2 border-b-[3px] border-gray-300 rounded' ref={ref}>
            <div className='relative flex items-center p-2'>
              {Icon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
              <button
                onClick={(e) => {
                  e.preventDefault(false);
                  setIsOpen(!isOpen);
                }}
                className='text-left text-sm appearance-none bg-transparent w-full text-gray-700 dark:text-white dark:bg-secondary-dark-bg leading-tight px-2 focus:outling-none'>
                {selectedValues.length > 0 ? selectedValues.join(', ') : t(placeholder)}
              </button>
              {isOpen && (
                <ul className='absolute z-50 m-3 top-5 border-2 p-4 text-gray-700 dark:text-white dark:be-secondary-dark-bg bg-white'>
                  {options.map((option) => (
                    <li key={option}>
                      <label className='flex p-1'>
                        <input
                          type='checkbox'
                          onChange={() => {
                            handleSelect(option);
                          }}
                          checked={isSelected(option)}
                        />
                        <p className='text-gray-700 px-2 dark:text-white'>{t(option)}</p>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </ClickOutsideHandler>
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  Icon: PropTypes.elementType,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
};

export default MultiSelectDropdown;
