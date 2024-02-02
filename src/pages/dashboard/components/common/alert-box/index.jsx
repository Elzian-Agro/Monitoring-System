import React from 'react';
import { PrimaryButton } from '../../base/Button';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const AlertBox = ({ visible, message, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='w-72 bg-white dark:bg-black p-4 rounded-lg shadow-2xl border-gray-300 dark:border-gray-600 border-b-[4px]'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-center'>
            <ExclamationCircleIcon className='w-16 h-16 text-green-500' />
          </div>
          <p className='text-base text-center text-black dark:text-white'>{message}</p>
          <div className='flex p-2 justify-center'>
            <PrimaryButton bgEffect='bg-blue-500 border-blue-600' text='OK' onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

AlertBox.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertBox;
