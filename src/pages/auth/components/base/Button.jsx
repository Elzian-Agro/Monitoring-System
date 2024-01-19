import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Button({ text, disabled = false }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
  }, []);

  return (
    <button
      className={`text-white py-2 px-4 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] transition-all font-zenkaku font-medium text-[16px] rounded flex group ${
        isTouchDevice ? '' : disabled ? '' : 'hover:bg-[#006102]'
      } ${disabled ? 'bg-[#0B802199] hover:cursor-not-allowed' : 'bg-[#0B8021]'} `}
      type='submit'
      disabled={disabled}>
      <p className='flex-1 w-full text-left'>{t(text)}</p>
      <ArrowRightIcon className={`h-6 w-6 mr-5 transition-all ${disabled ? '' : 'group-hover:mr-0'}`} />
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
