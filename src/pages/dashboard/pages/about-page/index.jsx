import React from 'react';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import coverImage from 'assets/images/smart-farms.png';

const AboutUsPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-center items-center bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 min-h-screen'>
      <div className='h-48 w-full'>
        <img src={coverImage} alt='farmLand' className='w-full h-full object-cover rounded-tr-xl rounded-tl-xl ' />
      </div>

      <div className='flex flex-col bg-opacity-30 sm:border sm:border-gray-100 sm:dark:border-gray-600 sm:shadow-md sm:rounded-md sm:shadow-black/5 gap-4 p-4 xs:p-8 sm:m-10'>
        <h2 className='text-2xl sm:text-4xl font-bold text-black dark:text-white text-center'>
          ELZIAN AGRO<sup className='text-xl sm:text-2xl text-black dark:text-white'>TM</sup>
        </h2>

        <div className='flex flex-col lg:flex-row lg:gap-5 items-center'>
          <p className='text-black dark:text-white p-0 sm:p-6 text-justify lg:w-2/3'>{t('About EA')}</p>
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

export default AboutUsPage;
