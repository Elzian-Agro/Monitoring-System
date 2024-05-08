import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'pages/dashboard/components/common/loader';
import { ArrowUpIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserAddress } from '../../slice/userSlice';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from 'pages/dashboard/components/base/Button';
import TextBox from 'pages/dashboard/components/base/TextBox';
import Chart from './chart';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState();
  const [currentdWeather, setCurrentdWeather] = useState({});
  const [selectedWeather, setSelectedWeather] = useState({});
  const [summaryWeather, setSummaryWeather] = useState([]);
  const [view, setView] = useState('summary');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const location = useSelector(selectUserAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (location) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [location, latitude, longitude]);

  // TODO: Move fetch data to backend and use useAxios hook instead.
  const fetchData = async () => {
    try {
      let response = {};
      console.log(latitude);
      if (latitude && longitude) {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
        );
      } else {
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
        );
      }

      const weatherForecast = response?.data?.list;

      const currentWeather = weatherForecast.filter((weather) => {
        const timeDifference = Math.abs(new Date(weather.dt_txt) - new Date()) / (60 * 60 * 1000);
        return timeDifference <= 1.5;
      });

      const summaryWeather = weatherForecast.filter((weather) => {
        const dateTime = new Date(weather.dt_txt);
        return dateTime.getHours() === 6 && dateTime.getMinutes() === 0;
      });

      setWeatherData(weatherForecast);
      setCurrentdWeather(currentWeather);
      setSummaryWeather(summaryWeather);
    } catch (error) {
      dispatch(showErrorModal('Failed to fetch weather data, check your location and try again'));
      navigate('/profile');
    }
  };

  // TO DO: complete function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormVisible(false);
  };

  if (!weatherData) {
    return <Loader />;
  }

  return (
    <div className='flex flex-col gap-5 bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 mt-3 p-4 min-h-screen'>
      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 px-4 py-2 shadow-md'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center'>
            <HomeIcon className='h-6 w-6 mr-2 text-md text-gray-700 dark:text-gray-300' />
            <h1 className='mr-2 text-md text-gray-700 dark:text-gray-300'>{location}</h1>
            <img
              src={`https://openweathermap.org/img/wn/${currentdWeather[0]?.weather[0]?.icon}@2x.png`}
              alt='Weather Icon'
              className='w-10'
            />
            <p className='font-semibold text-md text-gray-700 dark:text-gray-300'>
              {currentdWeather[0]?.main?.temp}
              <span className='font-extralight text-gray-400'>°C</span>
            </p>
          </div>
          {!isFormVisible && (
            <PrimaryButton
              type='button'
              text='Change'
              color='bg-blue-500 border-blue-600'
              onClick={() => setIsFormVisible(true)}
            />
          )}
        </div>
        {isFormVisible ? (
          <form className='flex flex-col lg:flex-row gap-2 lg:w-1/2' onSubmit={handleSubmit}>
            <TextBox placeholder='Latitude' type='text' value={latitude} setValue={setLatitude} required={true} />
            <TextBox placeholder='Longitude' type='text' value={longitude} setValue={setLongitude} required={true} />
            <div className='w-full lg:w-20 lg:mt-3'>
              <PrimaryButton type='submit' text='Submit' color='bg-blue-500 border-blue-600' />
            </div>
          </form>
        ) : null}
      </div>

      <div
        className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md  overflow-x-auto'
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#999696 #d6d4d4' }}>
        <h1 className='text-md text-gray-600 dark:text-gray-300'>{t('CURRENT WEATHER')}</h1>
        <p className='font-bold text-sm text-gray-600 dark:text-gray-300'>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className='flex flex-col md:flex-row item-start md:items-center'>
          <div className='flex flex-row gap-2 items-center'>
            <img
              src={`https://openweathermap.org/img/wn/${currentdWeather[0]?.weather[0]?.icon}@2x.png`}
              alt='Weather Icon'
              className='w-20 sm:w-24 lg:w-40'
            />
            <p className='font-semibold text-gray-600 dark:text-gray-300 text-5xl lg:text-6xl mr-5 lg:mr-10'>
              {currentdWeather[0]?.main?.temp}
              <span className='text-gray-400'>°C</span>
            </p>
          </div>
          <div className='flex flex-col mt-2 sm:mt-0'>
            <p className='text-gray-400 text-md'>
              {currentdWeather[0]?.weather[0]?.description
                ?.split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </p>
            <p className='text-sm lg:text-lg text-gray-600 dark:text-gray-300'>
              {t('Feels like')}
              <span className='font-semibold ml-2'>{currentdWeather[0]?.main?.feels_like}</span>
              <span className='font-extralight text-gray-400'>°C</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between mt-2 md:mt-0 w-full lg:w-2/3'>
          <div className='min-w-24'>
            <p className='font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>{t('Humidity')}</p>
            <p className='font-semibold font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>
              {currentdWeather[0]?.main?.humidity}
              <span className='font-extralight text-gray-400'>%</span>
            </p>
          </div>
          <div className='min-w-24'>
            <p className='font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>{t('Wind Speed')}</p>
            <p className='font-semibold font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300 flex items-center'>
              <ArrowUpIcon
                className='h-6 w-6 transform font-extralight text-gray-400 mr-1'
                style={{ transform: `rotate(${currentdWeather[0]?.wind?.deg || 0}deg)` }}
              />
              <span>{currentdWeather[0]?.wind?.speed}</span>
              <span className='font-extralight text-gray-400'>m/s</span>
            </p>
          </div>
          <div className='min-w-24 ml-5'>
            <p className='font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>{t('Pressure')}</p>
            <p className='font-semibold font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>
              {currentdWeather[0]?.main?.pressure}
              <span className='font-extralight text-gray-400'>hPa</span>
            </p>
          </div>
          <div className='min-w-24'>
            <p className='font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>{t('Visibility')}</p>
            <p className='font-semibold font-md sm:font-lg lg:font-2xl text-gray-600 dark:text-gray-300'>
              {(currentdWeather[0]?.visibility / 1000).toFixed(1)}
              <span className='font-extralight text-gray-400'>km</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col rounded-md border border-gray-200 dark:border-gray-600 p-4 shadow-md'>
        <h1 className='text-md text-gray-600 dark:text-gray-300'>{t('5 DAY FORECAST')}</h1>
        <div
          className='grid grid-flow-col justify-between gap-4 auto-cols-max mt-4 overflow-x-auto'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#999696 #d6d4d4' }}>
          {summaryWeather.map((data, index) => {
            return (
              <button
                key={index}
                className={`flex flex-row ${
                  selectedWeather && selectedWeather === data ? 'w-76' : 'w-44'
                } items-center rounded-md border border-gray-100 dark:border-gray-600 p-2 shadow-sm`}
                onClick={() => setSelectedWeather(data)}>
                <div className='flex flex-row items-center'>
                  <img
                    src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                    alt='Weather Icon'
                    className='w-16 sm:w-20'
                  />
                  <div>
                    <p className='text-md text-left text-gray-600 dark:text-gray-300'>
                      {new Date(data?.dt_txt).toLocaleString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className='font-semibold text-md text-left text-gray-600 dark:text-gray-300'>
                      {data?.main?.temp}
                      <span className='font-extralight text-gray-400'> °C</span>
                    </p>
                  </div>
                </div>

                {selectedWeather && selectedWeather === data && (
                  <div className='flex flex-col w-32 p-2'>
                    <p className='font-semibold text-sm text-right text-gray-400'>
                      {data?.weather[0]?.description
                        ?.split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                    <p className='text-sm text-right text-gray-600 dark:text-gray-300'>
                      {data?.main?.humidity}
                      <span className='font-extralight text-gray-400'> %</span>
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
        <div className='flex flex-row gap-2'>
          <button
            className={`text-sm text-gray-600 dark:text-gray-300 mb-4 hover:underline underline-offset-4 ${
              view === 'summary' && 'underline underline-offset-4 decoration-2'
            }`}
            onClick={() => setView('summary')}>
            {t('Summary')}
          </button>
          <button
            className={`text-sm text-gray-600 dark:text-gray-300 mb-4 hover:underline underline-offset-4 ${
              view === 'hourly' && 'underline underline-offset-4 decoration-2'
            }`}
            onClick={() => setView('hourly')}>
            {t('Hourly')}
          </button>
        </div>

        {view === 'summary' && <Chart weatherData={weatherData} />}

        {view === 'hourly' && (
          <div className='flex flex-row gap-2 max-w-full'>
            <div
              className='flex flex-nowrap space-x-2 overflow-x-auto'
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#999696 #d6d4d4' }}>
              {weatherData.map((data, index) => (
                <div key={index}>
                  <div className='flex flex-col justify-center items-center w-32 rounded-sm border border-gray-200 dark:border-gray-600 p-2'>
                    <img
                      src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                      alt='Weather Icon'
                      className='w-20'
                    />
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-300'>
                      {data?.main?.temp}
                      <span className='font-extralight text-gray-400'>°C</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-400'>
                      {data?.weather[0]?.description
                        ?.split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-300'>
                      {data?.main?.humidity}
                      <span className='font-extralight text-gray-400'>%</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-300 flex items-center'>
                      <ArrowUpIcon
                        className='h-4 w-4 transform font-extralight text-gray-400 mr-1'
                        style={{ transform: `rotate(${data?.wind?.deg || 0}deg)` }}
                      />
                      <span>{data?.wind?.speed}</span>
                      <span className='font-extralight text-gray-400'>m/s</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-300'>
                      {data?.main?.pressure}
                      <span className='font-extralight text-gray-400'>hPa</span>
                    </p>
                  </div>
                  <p className='text-center'>
                    {data?.dt_txt && (
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {new Date(data?.dt_txt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
