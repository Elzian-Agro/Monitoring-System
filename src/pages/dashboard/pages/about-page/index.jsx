import React from 'react';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className='flex justify-center bg-gradient-to-br from-green-500 to-lime-500 dark:from-gray-900 dark:to-gray-500 rounded-xl shadow-md p-8 sm:p-10 md:p-16 lg:p-24 mx-6 min-h-screen'>
      <div className='bg-white bg-opacity-30 border border-gray-100 shadow-md rounded-md shadow-black/5 flex justify-center items-center p-4'>
        <div className='flex flex-col gap-5 sm:gap-8 md:gap-12 lg:gap-8'>
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
            className='text-center text-blue-500 dark:text-blue-800 hover:text-lg transition duration-300'>
            {t('Go To Elzian Agro')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
