import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { modalContent } from './modal.types';

const Modal = ({ isOpen, message, onClose, type }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  if (!modalContent[type]) {
    alert('Modal: Type Error. Either type not specified or wrongly specified');
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='xxs:w-72 w-64 bg-white dark:bg-black p-4 rounded-lg shadow-2xl border-gray-300 dark:border-gray-600 border-b-[4px]'>
        {modalContent[type](message, onClose, t)}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(modalContent)).isRequired,
};

export default Modal;
