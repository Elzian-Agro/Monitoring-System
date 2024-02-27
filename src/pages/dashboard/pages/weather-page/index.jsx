import React from 'react';

const WeatherComponent = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md bg-white bg-opacity-30 p-8 rounded-lg backdrop-blur-lg border border-gray-300 shadow-lg'>
        <h1 className='text-3xl font-bold dark:text-white mb-4'>Weather Forecast</h1>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/3104/3104612.png'
              alt='Weather Icon'
              className='h-12 w-12'
            />
            <div className='ml-4'>
              <p className='text-lg font-semibold dark:text-white'>Today</p>
              <p className='text-sm text-gray-500 dark:text-gray-200'>Partly Cloudy</p>
            </div>
          </div>
          <div>
            <p className='text-4xl font-bold dark:text-white'>25°C</p>
          </div>
        </div>
        <div className='mt-6'>
          <p className='text-sm text-gray-500 dark:text-gray-200'>Humidity: 65%</p>
          <p className='text-sm text-gray-500 dark:text-gray-200'>Wind: 15 km/h</p>
          <p className='text-sm text-gray-500 dark:text-gray-200'>Pressure: 1015 hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
