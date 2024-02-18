import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideErrorModal } from './slice/errorSlice';
import Modal from 'components/common/modal';

const GlobalErrorModal = () => {
  const { showModal, errorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(hideErrorModal());

  return <Modal isOpen={showModal} message={errorMessage} onClose={handleClose} type='error' />;
};

export default GlobalErrorModal;