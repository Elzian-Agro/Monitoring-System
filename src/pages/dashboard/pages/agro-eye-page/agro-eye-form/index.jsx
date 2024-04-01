import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const Form = ({ visible, onClose, widget = null }) => {
  const { t } = useTranslation();

  return (
    <>
      {!visible ? null : (
        <div className='flex flex-col p-8 gap-8 min-h-full w-full shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
          <div>
            <button
              className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
              onClick={onClose}>
              <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
            </button>
          </div>
          <div>
            <h1 className='text-base text-center text-gray-700 dark:text-white'>
              {widget ? t('UPDATE WIDGET DETAILS') : t('NEW WIDGET CREATION')}
            </h1>
          </div>

          <div>Form Element</div>
        </div>
      )}
    </>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object,
};

export default Form;
