import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <div className='flex items-center'>
      <input type='checkbox' id={label} checked={checked} onChange={onChange} className='mr-2' />
      <label htmlFor={label} className='text-sm dark:text-white'>
        {label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
