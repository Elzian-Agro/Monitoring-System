import React from 'react';
import CurrentWeather from './current-weather';

const WeatherStation = () => {
  return (
    <div className='bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 mt-3 p-4 min-h-screen'>
      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 px-4 py-2 shadow-md'>
        <CurrentWeather />
      </div>
    </div>
  );
};

export default WeatherStation;
