import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Redirect({ setPage, Icon, message, type }) {
  const [timer, setTimer] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setPage('Login');
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className='flex-1 flex items-center flex-col lg:justify-center h-full w-full'>
      <Icon className={`w-[50px] ${type === 'warning' ? 'text-red-300' : 'text-[#0B802199]'}`} />
      <p
        className={`font-zenkaku font-bold text-[24px] text-center ${
          type === 'warning' ? 'text-red-300' : 'text-[#0B802199]'
        }`}>
        {t(message)}
      </p>
      <p className={`font-zenkaku font-light text-[14px] ${type === 'warning' ? 'text-red-300' : 'text-[#0B802199]'}`}>
        {t('You will be redirected in', {val: timer})}
      </p>
    </div>
  );
}

Redirect.propTypes = {
  setPage: PropTypes.func.isRequired,
  Icon: PropTypes.elementType.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Redirect;
