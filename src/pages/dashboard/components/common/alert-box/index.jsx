import React from 'react';
import { PrimaryButton } from '../../base/Button';
import PropTypes from 'prop-types';

const AlertBox = ({ visible, message, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='bg-secondary-dark-bg dark:bg-white pt-4 lg:pt-8 rounded-lg shadow-2xl border-gray-600 dark:border-gray-300 border-b-[4px]'>
        <div className='flex flex-col px-12 gap-4'>
          <p className='text-sm md:text-base lg:text-lg text-white dark:text-black'>{message}</p>
          <div className='flex p-2 justify-center'>
            <PrimaryButton
              bgEffect='bg-red-500 border-red-600'
              size='md:py-2 md:px-4 md:text-lg'
              text='OK'
              onClick={onClose}
            />
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
