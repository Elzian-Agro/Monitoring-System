import React from 'react';

const CurrentWeather = () => {
  const temperature = 32;
  const humidity = 70;
  const airPressure = 720;
  const rainfall = 50;
  const windDirection = 180;
  const windSpeed = 15.6;

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-center mb-4'>
        <div>
          <h2 className='text-lg font-semibold  text-gray-600 dark:text-gray-200'>Current Weather</h2>
          <p className='text-gray-700 dark:text-gray-300'>10:52 A.M.</p>
        </div>
        <select className='border border-gray-300 rounded-md p-2 focus:outline-none dark:bg-secondary-dark-bg dark:text-white'>
          <option value='ELZ-003-01'>ELZ-003-01</option>
          <option value='ELZ-003-02'>ELZ-003-02</option>
        </select>
      </div>

      {/* Weather Cards */}
      <div className='grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {/* Temperature */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Temperature</h3>

          <div className='flex items-center justify-center mt-4'>
            <div className='relative w-8 h-40 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='absolute bottom-0 w-full bg-red-500'
                style={{ height: `${((temperature - 0) / (50 - 0)) * 100}%` }}>
                {/* min temp = 0 and max temp = 50 */}
              </div>
            </div>
          </div>

          <p className='text-center text-4xl font-semibold text-red-500'>{temperature.toFixed(1)}°C</p>
        </div>

        {/* Humidity */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Humidity</h3>
          <div className='flex flex-col items-center justify-center mt-4'>
            <div className='relative w-40 h-40'>
              <svg className='w-full h-full' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='none'>
                <path
                  d='M12 2C12 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 10 12 2 12 2Z'
                  stroke='#e5e5e5'
                  strokeWidth='0.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 2C12 2 4 10 4 15C4 18.866 7.134 22 11 22C14.866 22 18 18.866 18 15C18 10 12 2 12 2Z'
                  fill='#4287f5'
                  style={{
                    clipPath: `inset(${100 - Math.max(0, Math.min(100, humidity))}% 0% 0% 0%)`,
                  }}
                />
                {/* min humidity = 0 and max humidity = 100 */}
              </svg>
            </div>
            <p className='text-center text-4xl font-semibold text-blue-500'>{humidity.toFixed(1)}%</p>
          </div>
        </div>

        {/* Air Pressure */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Air Pressure</h3>
          <div className='flex flex-col items-center justify-center mt-4'>
            {/* Gauge */}
            <div className='relative w-40 h-40'>
              <svg className='w-full h-full' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' fill='none'>
                {/* Background Circle */}
                <circle cx='18' cy='18' r='16' stroke='#e5e5e5' strokeWidth='4' fill='none' />
                {/* Dynamic Fill */}
                <circle
                  cx='18'
                  cy='18'
                  r='16'
                  stroke='#29c24c'
                  strokeWidth='4'
                  fill='none'
                  strokeDasharray='100'
                  strokeDashoffset={100 - Math.max(0, Math.min(100, ((airPressure - 700) / (800 - 700)) * 100))}
                  transform='rotate(-90 18 18)'
                />
                {/* min air pressure = 700 and max air pressure = 800 */}
              </svg>
            </div>

            <p className='text-center text-4xl font-semibold text-green-500'>{airPressure.toFixed(1)} mmHg</p>
          </div>
        </div>

        {/* Wind */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow'>
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
                  strokeDashoffset={100 - (windDirection / 360) * 100} /* Adjust position based on direction */
                  transform='rotate(-90 20 20)' /* Rotate to align 0 degrees to the top */
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
            <p className='text-center text-4xl font-semibold text-yellow-500 mt-2'> {windSpeed.toFixed(1)} kph</p>
          </div>
        </div>

        {/* Rainfall */}
        <div className='bg-gray-50 dark:bg-gray-800 rounded-md p-4 shadow'>
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-100'>Rainfall</h3>
          <div className='mt-4 flex flex-col items-center'>
            <div className='relative w-24 h-40 bg-gray-200 rounded-b-md overflow-hidden border-2 border-gray-300'>
              <div
                className='absolute bottom-0 w-full bg-blue-500'
                style={{
                  height: `${Math.min((rainfall / 150) * 100, 100)}%`, // 150 = max rainfall
                }}></div>
            </div>

            <p className='text-center text-4xl font-semibold text-blue-500 mt-2'>{rainfall.toFixed(1)} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
