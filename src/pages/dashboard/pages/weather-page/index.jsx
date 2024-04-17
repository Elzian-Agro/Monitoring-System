import React, { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import axios from 'axios';
import Loader from 'pages/dashboard/components/common/loader';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';

const WeatherComponent = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [btnIndex, setBtnIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { response: user, isLoading } = useFetch({
    endpoint: 'user/profile',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });

  // TODO: Move fetch data to backend and use useAxios hook instead.
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
      );
      const weatherForecast = response.data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt);
        return (
          forecastDate.getFullYear() === selectedDate.getFullYear() &&
          forecastDate.getMonth() === selectedDate.getMonth() &&
          forecastDate.getDate() === selectedDate.getDate()
        );
      });
      setWeatherData(weatherForecast[0]);
    } catch (error) {
      dispatch(showErrorModal('Failed to fetch weather data, check your location and try again'));
      navigate('/profile');
    }
  };

  useEffect(() => {
    setLocation(user?.address);
    if (location) fetchData();
    // eslint-disable-next-line
  }, [user, btnIndex]);

  const handleDateChange = (increment) => {
    setBtnIndex((prev) => {
      const newIndex = Math.max(0, Math.min(4, prev + increment));
      if (newIndex !== prev) {
        setSelectedDate((currentDate) => {
          const newDate = new Date(currentDate);
          newDate.setDate(newDate.getDate() + increment);
          return newDate;
        });
        return newIndex;
      }
      return prev;
    });
  };

  if (!weatherData || isLoading) {
    return <Loader />;
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='p-5 mr-2 ml-2 flex flex-wrap justify-center items-center gap-10 bg-white rounded-lg shadow-md'>
        <div className='flex flex-col justify-center items-center border-gray-300 border-4 rounded-lg p-5'>
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
            <div className='flex gap-2 items-center justify-around'>
              <button
                onClick={() => handleDateChange(-1)}
                disabled={btnIndex <= 0}
                className='disabled:text-gray-300 disabled:cursor-not-allowed'>
                <ChevronLeftIcon className='w-[20px]' />
              </button>
              <p className='text-center font-bold font-zenkaku text-[20px] text-gray-600'>
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()},
                <span className='font-normal'>
                  {' '}
                  {selectedDate.getDate()} {selectedDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()}
                </span>
              </p>
              <button
                onClick={() => handleDateChange(1)}
                disabled={btnIndex >= 4}
                className='disabled:text-gray-300 disabled:cursor-not-allowed'>
                <ChevronRightIcon className='w-[20px]' />
              </button>
            </div>

            <h1 className='font-zenkaku font-bold text-[50px] text-gray-700 text-center'>{location.toUpperCase()}</h1>
          </div>

          <div className='bg-[#f8f8f8] flex flex-wrap w-100% p-2 gap-5 justify-center items-center rounded-lg text-center border-gray-300 border-4'>
            <div className='bg-white w-[40%] p-1 rounded-lg'>
              <p className='font-zenkaku text-gray-500 font-normal'>Feels Like</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.main?.feels_like}
                <span className='font-extralight text-gray-400'>°C</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded-lg'>
              <p className='font-zenkaku text-gray-500 font-normal'>Humidity</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.main?.humidity}
                <span className='font-extralight text-gray-400'>%</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded-lg'>
              <p className='font-zenkaku text-gray-500 font-normal'>Wind Speed</p>
              <p className='font-bold text-[25px] font-zenkaku text-gray-600'>
                {weatherData?.wind.speed}
                <span className='font-extralight text-gray-400'> m/s</span>
              </p>
            </div>

            <div className='bg-white w-[40%] p-1 rounded-lg'>
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
