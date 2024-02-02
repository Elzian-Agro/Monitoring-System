import React from 'react';
import { PrimaryButton } from '../../base/Button';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const ConformBox = ({ visible, message, onClose }) => {
  const { t } = useTranslation();

  if (!visible) {
    return null;
  }
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='w-72 bg-white dark:bg-black p-4 rounded-lg shadow-2xl border-gray-300 dark:border-gray-600 border-b-[4px]'>
        <div className='flex flex-col text-black dark:text-white gap-4'>
          <div className='flex justify-center'>
            <ExclamationCircleIcon className='w-16 h-16 text-green-500' />
          </div>
          <p className='text-center text-base'>{t(message)}</p>
          <div className='flex gap-4 justify-center'>
            <PrimaryButton bgEffect='bg-red-500 border-red-600' text={t('NO')} onClick={() => onClose(false)} />
            <PrimaryButton bgEffect='bg-blue-500 border-blue-600' text={t('YES')} onClick={() => onClose(true)} />
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
