import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='text-center font-zenkaku'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='text-xl font-light text-gray-600 mb-4'>{t('Page Not Found')}</p>
        <NavLink
          to='/'
          className='px-4 py-2 bg-[#0B8021] hover:bg-[#006102] text-white rounded transition-all duration-300'>
          {t('Go Home')}
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
