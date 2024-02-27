import React from 'react';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import coverImage from 'assets/images/smart-farms.png';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-center items-center bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 mt-3'>
      <div className='h-48 w-full'>
        <img src={coverImage} alt='farmLand' className='w-full h-full object-cover rounded-tr-xl rounded-tl-xl ' />
      </div>

      <div className='flex flex-col bg-opacity-30 border border-gray-100 dark:border-gray-600 shadow-md rounded-md shadow-black/5 gap-4 p-8 m-10'>
        <h2 className='text-4xl font-bold text-black dark:text-white text-center'>ELZIAN AGRO</h2>
        <div className='flex flex-col lg:flex-row lg:gap-5 items-center'>
          <p className='text-black dark:text-white p-6 text-justify lg:w-2/3'>{t('About EA')}</p>
          <div className='flex justify-center items-center lg:w-80'>
            <img src={logo} alt='Elzian Agro logo' className='w-80' />
          </div>
        </div>
        <Link
          to='https://agro.elzian.com'
          target='_blank'
          rel='noreferrer'
          className='text-center text-blue-500 hover:text-lg transition duration-300'>
          {t('Go To Elzian Agro')}
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
