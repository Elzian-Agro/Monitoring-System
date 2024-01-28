import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ value, setValue }) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='text-black text-sm dark:bg-secondary-dark-bg dark:text-white p-2 border-2 border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:border-black'>
      <option value='farmer'>Farmer</option>
      <option value='admin'>Admin</option>
    </select>
  );
}

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Dropdown;
