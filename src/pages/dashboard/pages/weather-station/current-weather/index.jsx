import React, { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import { useTranslation } from 'react-i18next';
import Loader from 'pages/dashboard/components/common/loader';

const CurrentWeather = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedWeatherData, setSelectedWeatherData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMinute, setCurrentMinute] = useState(currentTime.getMinutes());

  const { t } = useTranslation();

  const { response: currentWeatherData, isLoading } = useFetch({
    endpoint: 'weather-station/current',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [currentMinute],
  });

  useEffect(() => {
    if (currentWeatherData) {
      setSelectedDevice(currentWeatherData[0]?.deviceId);
      setSelectedWeatherData(currentWeatherData[0]);
    }

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = new Date();
        if (newTime.getMinutes() !== prevTime.getMinutes()) {
          setCurrentMinute(newTime.getMinutes());
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWeatherData]);

  const handleDeviceChange = (e) => {
    const deviceId = e.target.value;
    setSelectedDevice(deviceId);

    // Find the selected device data from the weatherData array
    setSelectedWeatherData(currentWeatherData?.find((device) => device.deviceId === deviceId));
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-center mb-4'>
        <div>
          <h2 className='text-md text-gray-600 dark:text-gray-300'>{t('CURRENT WEATHER')}</h2>
          <p className='font-bold text-sm text-gray-600 dark:text-gray-300'>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {!isLoading && Array.isArray(currentWeatherData) && currentWeatherData.length > 0 && (
          <select
            className='border border-gray-300 dark:border-gray-500 rounded-md p-2 focus:outline-none dark:bg-secondary-dark-bg dark:text-white'
            value={selectedDevice || ''}
            onChange={handleDeviceChange}>
            {currentWeatherData?.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.deviceId}
              </option>
            ))}
          </select>
        )}
      </div>

      {isLoading && <Loader />}

      {!isLoading && !currentWeatherData && (
        <div className='flex justify-center bg-white dark:bg-secondary-dark-bg rounded-lg p-8'>
          <p className='text-sm dark:text-white justify-center'>{t('There are no current weather data available!')}</p>
        </div>
      )}

      {!isLoading && currentWeatherData && (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {/* Temperature */}
          {selectedWeatherData?.temperature && (
            <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
              <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>{t('Temperature')}</h3>

              <div className='flex items-center justify-center mt-4'>
                <div className='relative'>
                  <div className='relative w-4 h-36 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='absolute bottom-0 w-full bg-red-500'
                      style={{ height: `${((selectedWeatherData.temperature - 0) / (60 - 0)) * 100}%` }}>
                      {/* min temp = 0 and max temp = 60 */}
                    </div>
                  </div>
                  {/* Bulb Shape */}
                  <div className='absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full'></div>
                </div>
              </div>

              <p className='text-center text-4xl font-semibold text-red-500 mt-6'>
                {selectedWeatherData.temperature}°C
              </p>
            </div>
          )}

          {/* Humidity */}
          {selectedWeatherData?.humidity && (
            <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
              <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>{t('Humidity')}</h3>

              <div className='flex flex-col items-center justify-center mt-7'>
                <div className='relative w-36 h-36'>
                  <svg className='w-full h-full' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='none'>
                    <path
                      d='M11 2C11 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 11 11 2 11 2Z'
                      stroke='#e5e5e5'
                      strokeWidth='0.6'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M11 2C11 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 11 11 2 11 2Z'
                      fill='#60a5fa'
                      style={{
                        clipPath: `inset(${99 - Math.max(0, Math.min(99, selectedWeatherData.humidity))}% 0% 0% 0%)`,
                      }}
                    />
                    {/* min humidity = 0 and max humidity = 99 */}
                  </svg>
                </div>
                <p className='text-center text-4xl font-semibold text-blue-400 mt-3'>{selectedWeatherData.humidity}%</p>
              </div>
            </div>
          )}

          {/* Rainfall */}
          {selectedWeatherData?.rainfall && (
            <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
              <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>{t('Rainfall')}</h3>

              <div className='mt-4 flex flex-col items-center'>
                {/* Beaker Shape */}
                <div className='relative w-24 h-40'>
                  <svg
                    className='w-full h-full scale-150' // Scale the beaker size
                    viewBox='0 0 100 100'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'>
                    <path
                      d='M30 10 L70 10 L68 20 L80 85 Q80 90 75 90 L25 90 Q20 90 20 85 L30 20 L30 10'
                      fill='none'
                      stroke='#d4d4d4'
                      strokeWidth='2'
                    />
                    {/* Rainfall Level */}
                    <path
                      d='M30 10 L70 10 L68 20 L80 85 Q80 90 75 90 L25 90 Q20 90 20 85 L30 20 L30 10'
                      fill='#2563eb'
                      style={{
                        clipPath: `inset(${100 - (selectedWeatherData.rainfall / 9999) * 100}% 0% 0% 0%)`, // Proportional filling
                      }}
                    />
                  </svg>
                </div>
                <p className='text-center text-4xl font-semibold text-blue-600 mt-2'>
                  {selectedWeatherData.rainfall}mm
                </p>
              </div>
            </div>
          )}

          {/* Wind */}
          {selectedWeatherData?.wind_speed && selectedWeatherData?.wind_direction && (
            <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
              <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>{t('Wind Speed')}</h3>

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
                      stroke='#22C55E'
                      strokeWidth='2'
                      fill='none'
                      strokeDasharray='2 100' /* Small stroke (2 units) and gap (100 units) */
                      strokeDashoffset={
                        100 - (selectedWeatherData.wind_direction / 360) * 100
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
                <p className='text-center text-4xl font-semibold text-green-500 mt-2'>
                  {selectedWeatherData.wind_speed}m/s
                </p>
              </div>
            </div>
          )}

          {/* Light */}
          {selectedWeatherData?.light && (
            <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-sm'>
              <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>{t('Light')}</h3>

              <div className='mt-4 flex flex-col items-center'>
                <div className='relative w-40 h-40 flex items-center justify-center'>
                  {/* Sun Shape */}
                  <svg className='w-full h-full' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' fill='none'>
                    {/* Sun Core */}
                    <circle cx='50' cy='50' r='30' fill='none' stroke='#FFD700' strokeWidth='2' />

                    {/* Dynamic Rays */}
                    {Array.from({ length: Math.min((selectedWeatherData.light / 300) * 20, 20) }).map((_, index) => {
                      const angle = (index / 20) * 360; // Adjust based on max rays
                      const x1 = 50 + 35 * Math.cos((angle - 90) * (Math.PI / 180));
                      const y1 = 50 + 35 * Math.sin((angle - 90) * (Math.PI / 180));
                      const x2 = 50 + 45 * Math.cos((angle - 90) * (Math.PI / 180));
                      const y2 = 50 + 45 * Math.sin((angle - 90) * (Math.PI / 180));
                      return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke='#FFD700' strokeWidth='2' />;
                    })}
                  </svg>
                </div>

                <p className='text-center text-4xl font-semibold text-yellow-500 mt-2'>
                  {selectedWeatherData.light}lux
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
