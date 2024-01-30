import React from 'react';
import { PrimaryButton } from '../../base/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const ConformBox = ({ visible, message, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='relative bg-secondary-dark-bg dark:bg-white p-8 rounded-lg shadow-2xl border-gray-600 dark:border-gray-300 border-b-[4px]'>
        <button
          className='absolute right-0 top-0 bg-red-500 hover:bg-red-600 self-end rounded-bl rounded-tr'
          onClick={onClose}>
          <XMarkIcon className='text-white w-6 h-6' />
        </button>
        <div className='flex flex-col text-white dark:text-black gap-4'>
          <p>{message}</p>
          <div className='flex justify-between'>
            <PrimaryButton bgEffect='bg-red-500 border-red-600' text='No' />
            <PrimaryButton bgEffect='bg-blue-500 border-blue-600' text='Yes' />
          </div>
        </div>
      </div>
    </div>
  );
};

ConformBox.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConformBox;
