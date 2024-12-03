import React, { useState } from 'react';

// Weather data for devices
const weatherData = [
  {
    deviceId: 'ELZ-0003-01',
    data: { temperature: 20, humidity: 10, rainfall: 0, windSpeed: 0, windDirection: 0, light: 0 },
  },
  {
    deviceId: 'ELZ-0003-02',
    data: { temperature: 30.5, humidity: 60, rainfall: 1500, windSpeed: 20, windDirection: 90, light: 150 },
  },
  {
    deviceId: 'ELZ-0003-03',
    data: { temperature: 60, humidity: 99, rainfall: 9999, windSpeed: 50, windDirection: 270, light: 300 },
  },
  {
    deviceId: 'ELZ-0003-04',
    data: { temperature: 40, humidity: 40, rainfall: 5000, windSpeed: 0, windDirection: 45, light: 160 },
  },
];

const CurrentWeather = () => {
  const [selectedDevice, setSelectedDevice] = useState(weatherData[0].deviceId);
  const selectedWeatherData = weatherData.find((device) => device.deviceId === selectedDevice)?.data;

  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-center mb-4'>
        <div>
          <h2 className='text-lg font-semibold  text-gray-600 dark:text-gray-200'>Current Weather</h2>
          <p className='text-gray-700 dark:text-gray-300'>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <select
          className='border border-gray-300 dark:border-gray-500 rounded-md p-2 focus:outline-none dark:bg-secondary-dark-bg dark:text-white'
          value={selectedDevice}
          onChange={handleDeviceChange}>
          {weatherData.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.deviceId}
            </option>
          ))}
        </select>
      </div>

      {/* Weather Cards */}
      <div className='grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {/* Temperature */}
        <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Temperature</h3>

          <div className='flex items-center justify-center mt-4'>
            <div className='relative'>
              <div className='relative w-4 h-36 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='absolute bottom-0 w-full bg-red-500'
                  style={{ height: `${((selectedWeatherData?.temperature - 0) / (60 - 0)) * 100}%` }}>
                  {/* min temp = 0 and max temp = 60 */}
                </div>
              </div>
              {/* Bulb Shape */}
              <div className='absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full'></div>
            </div>
          </div>

          <p className='text-center text-4xl font-semibold text-red-500 mt-6'>{selectedWeatherData?.temperature}°C</p>
        </div>

        {/* Humidity */}
        <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Humidity</h3>

          <div className='flex flex-col items-center justify-center mt-4'>
            <div className='relative w-40 h-40'>
              <svg className='w-full h-full' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='none'>
                <path
                  d='M11 2C11 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 11 11 2 11 2Z'
                  stroke='#e5e5e5'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11 2C11 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 11 11 2 11 2Z'
                  fill='#4287f5'
                  style={{
                    clipPath: `inset(${99 - Math.max(0, Math.min(99, selectedWeatherData?.humidity))}% 0% 0% 0%)`,
                  }}
                />
                {/* min humidity = 0 and max humidity = 99 */}
              </svg>
            </div>
            <p className='text-center text-4xl font-semibold text-blue-500 mt-2'>{selectedWeatherData?.humidity}%</p>
          </div>
        </div>

        {/* Wind */}
        <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Wind</h3>

          <div className='flex flex-col justify-center items-center mt-4'>
            <div className='relative w-40 h-40'>
              <svg className='w-full h-full' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' fill='none'>
                {/* Background Circle */}
                <circle cx='20' cy='20' r='16' stroke='#e5e5e5' strokeWidth='2' fill='none' />

                {/* Direction Indicator */}
                <circle
                  cx='20'
                  cy='20'
                  r='16'
                  stroke='#fcba03'
                  strokeWidth='2'
                  fill='none'
                  strokeDasharray='2 100' /* Small stroke (2 units) and gap (100 units) */
                  strokeDashoffset={
                    100 - (selectedWeatherData?.windDirection / 360) * 100
                  } /* Adjust position based on direction */
                  transform='rotate(-100 20 20)' /* Rotate to align 0 degrees to the top */
                />
              </svg>

              {/* Directional Text */}
              <div className='absolute inset-0'>
                <span className='text-xs text-gray-600 dark:text-gray-100 absolute top-6 left-1/2 transform -translate-x-1/2'>
                  N
                </span>
                <span className='text-xs text-gray-600 dark:text-gray-100 absolute bottom-6 left-1/2 transform -translate-x-1/2'>
                  S
                </span>
                <span className='text-xs text-gray-600 dark:text-gray-100 absolute left-6 top-1/2 transform -translate-y-1/2'>
                  W
                </span>
                <span className='text-xs text-gray-600 dark:text-gray-100 absolute right-6 top-1/2 transform -translate-y-1/2'>
                  E
                </span>
              </div>
            </div>
            <p className='text-center text-4xl font-semibold text-yellow-500 mt-2'>
              {selectedWeatherData?.windSpeed}m/s
            </p>
          </div>
        </div>

        {/* Rainfall */}
        <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Rainfall</h3>

          <div className='mt-4 flex flex-col items-center'>
            <div className='relative w-24 h-40 bg-gray-200 rounded-b-md overflow-hidden border-2 border-gray-300'>
              <div
                className='absolute bottom-0 w-full bg-blue-500'
                style={{
                  height: `${Math.min((selectedWeatherData?.rainfall / 9999) * 100, 100)}%`, // 9999 = max rainfall
                }}></div>
            </div>

            <p className='text-center text-4xl font-semibold text-blue-500 mt-2'>{selectedWeatherData?.rainfall}mm</p>
          </div>
        </div>

        {/* Light */}
        <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Light</h3>

          <div className='mt-4 flex flex-col items-center'>
            <div className='relative w-40 h-40 flex items-center justify-center'>
              {/* Sun Shape */}
              <svg className='w-full h-full' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' fill='none'>
                {/* Sun Core */}
                <circle cx='50' cy='50' r='30' fill='none' stroke='#FFD700' strokeWidth='2' />

                {/* Dynamic Rays */}
                {Array.from({ length: Math.min((selectedWeatherData?.light / 300) * 20, 20) }).map((_, index) => {
                  const angle = (index / 20) * 360; // Adjust based on max rays
                  const x1 = 50 + 35 * Math.cos((angle - 90) * (Math.PI / 180));
                  const y1 = 50 + 35 * Math.sin((angle - 90) * (Math.PI / 180));
                  const x2 = 50 + 45 * Math.cos((angle - 90) * (Math.PI / 180));
                  const y2 = 50 + 45 * Math.sin((angle - 90) * (Math.PI / 180));
                  return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke='#FFD700' strokeWidth='2' />;
                })}
              </svg>
            </div>

            <p className='text-center text-4xl font-semibold text-yellow-500 mt-2'>{selectedWeatherData?.light}lux</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
