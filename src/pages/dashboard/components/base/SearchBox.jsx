import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

function SearchBox({ value, onChange, onClick }) {
  return (
    <div className='flex items-center'>
      <div className='flex rounded-lg border border-gray-400'>
        <div className='flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-400 bg-white dark:bg-secondary-dark-bg'>
          <MagnifyingGlassIcon className='text-gray-400 h-6 w-6' />
        </div>
        <input
          type='text'
          className='w-full xs:w-56 bg-white pl-2 h-8 xs:h-10 text-sm lg:text-base outline-0 dark:bg-secondary-dark-bg dark:text-white'
          placeholder=''
          id='searchInput'
          value={value}
          onChange={onChange}
        />
        <div
          className='flex w-8 justify-center items-center rounded-tr-lg rounded-br-lg text-white bg-red-600 hover:bg-red-500 transition-colors cursor-pointer'
          onClick={onClick}>
          <XMarkIcon className='h-6 w-6' />
        </div>
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchBox;
