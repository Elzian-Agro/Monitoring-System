import React, { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import axios from 'axios';
import Loader from 'pages/dashboard/components/common/loader';

const WeatherComponent = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const [date, setDate] = useState(null);

  const {
    response: user,
    isLoading,
    recall,
  } = useFetch({
    endpoint: 'user/profile',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLocation(user?.address);
    if (user) fetchData();
    const date = new Date();
    setDate({
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    });
    // eslint-disable-next-line
  }, [user]);

  if (!weatherData || isLoading) {
    return <Loader />;
  }

  return (
    // <div className='flex items-center justify-center min-h-screen'>
    //   <div className='w-full max-w-md bg-white bg-opacity-30 p-8 rounded-lg backdrop-blur-lg border border-gray-300 shadow-lg'>
    //     <h1 className='text-3xl font-bold dark:text-white mb-4'>Weather Forecast</h1>
    //     <div className='flex items-center justify-between'>
    //       <div className='flex items-center'>
    //         <img
    //           src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
    //           alt='Weather Icon'
    //           className='h-12 w-12'
    //         />
    //         <div className='ml-4'>
    //           <p className='text-lg font-semibold dark:text-white'>{location}</p>
    //           <p className='text-sm text-gray-500 dark:text-gray-200'>{weatherData?.weather[0]?.description}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <p className='text-4xl font-bold dark:text-white'>{weatherData?.main?.temp}°C</p>
    //       </div>
    //     </div>
    //     <div className='mt-6'>
    //       <p className='text-sm text-gray-500 dark:text-gray-200'>Humidity: {weatherData?.main?.humidity}%</p>
    //       <p className='text-sm text-gray-500 dark:text-gray-200'>Wind: {weatherData?.wind.speed} m/s</p>
    //       <p className='text-sm text-gray-500 dark:text-gray-200'>Pressure: {weatherData?.main?.pressure} hPa</p>
    //     </div>
    //   </div>
    // </div>

    <div className='flex items-center justify-center min-h-screen'>
      <div className='p-5 mr-2 ml-2 flex flex-wrap justify-center items-center gap-10 bg-white rounded'>
        <div className='flex flex-col justify-center items-center border-gray-300 border-4 rounded p-5'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt='Weather Icon'
            className='w-full'
          />

          <h1 className='font-bold text-[50px] font-zenkaku text-gray-900'>
            {weatherData?.main?.temp}
            <span className='font-extralight text-gray-400'>°C</span>
          </h1>

          <p className='text-gray-400 font-zenkaku font-normal'>{weatherData?.weather[0]?.description.toUpperCase()}</p>
        </div>

        <div className='flex-1 flex flex-col justify-between'>
          <div>
            <p className='text-center font-bold font-zenkaku text-[20px] text-gray-600'>
              {date?.day.toUpperCase()}, <span className='font-normal'>{date?.date.toUpperCase()}</span>
            </p>
            <h1 className='font-zenkaku font-bold text-[50px] text-gray-700 text-center'>{location.toUpperCase()}</h1>
          </div>
          <div className='bg-[#f8f8f8] flex flex-wrap w-100% p-2 gap-5 justify-center items-center rounded text-center border-gray-300 border-4'>
            <div className='bg-white w-[40%] p-1 rounded'>
              <p className='font-zenkaku text-gray-500 font-normal'>Feels Like</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.main?.feels_like}
                <span className='font-extralight text-gray-400'>°C</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded'>
              <p className='font-zenkaku text-gray-500 font-normal'>Humidity</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.main?.humidity}
                <span className='font-extralight text-gray-400'>%</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded'>
              <p className='font-zenkaku text-gray-500 font-normal'>Wind Speed</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.wind.speed}
                <span className='font-extralight text-gray-400'> m/s</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded'>
              <p className='font-zenkaku text-gray-500 font-normal'>Pressure</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.main?.pressure}
                <span className='font-extralight text-gray-400'> hPa</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
