import React from 'react';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className='m-6 container place-items-center'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
        <h2 className='text-4xl font-bold text-black dark:text-white text-center mb-4 pt-4'>ELZIAN AGRO</h2>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 pt-4 gap-6'>
          <div className='col-span-3'>
            <p className='text-gray-600 dark:text-gray-300 p-6 text-justify'>
              ELZIAN AGRO provides smart agronomy solutions to support mass cultivation farmers to monitor and automate
              their farmland. According to the latest report from the United Nations Intergovernmental Panel on Climate
              Change, the global average temperature rise could reach or exceed 1.5 degrees Celsius in the next 20
              years. That’s 10 years sooner than expected. This unprecedented extreme weather change and scarcity of
              resources impact mass cultivation farmers. We offer customized monitoring information and automation
              solutions through trending digital technologies to optimize our customers' harvest and productively
              utilize their resources..
            </p>
          </div>
          <div className='justify-center'>
            <img src={logo} alt='Elzian Agro logo' />
          </div>
        </div>

        <div className='text-center p-4 dark:text-white'>
          <Link to='https://agro.elzian.com' target='_blank' rel='noreferrer'>
            Go To Elzian Agro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
