import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'pages/dashboard/components/common/loader';
import { ArrowUpIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserAddress } from '../../slice/userSlice';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState();
  const [currentdWeather, setCurrentdWeather] = useState({});
  const [selectedWeather, setSelectedWeather] = useState({});
  const [summaryWeather, setSummaryWeather] = useState([]);
  const [view, setView] = useState('summary');
  const location = useSelector(selectUserAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [location]);

  // TODO: Move fetch data to backend and use useAxios hook instead.
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
      );

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

  const chartConfig = {
    chart: {
      type: 'area',
      height: 300,
    },
    title: {
      text: null,
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      categories: weatherData?.map((data) =>
        new Date(data?.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
      ),
      min: 0,
      max: 15,
      scrollbar: {
        enabled: true,
      },
      tickLength: 0,
    },
    plotOptions: {
      series: {
        showInLegend: false,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y + '°C';
          },
          style: {
            color: 'black',
          },
        },
      },
      area: {
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666',
        },
      },
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: 'Temperature',
        data: weatherData?.map((data) => data?.main?.temp),
      },
    ],
  };

  if (!weatherData) {
    return <Loader />;
  }

  return (
    <div className='flex flex-col gap-5 bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 mt-3 p-4 min-h-screen'>
      <div className='flex flex-row items-center rounded-md border border-gray-100 dark:border-gray-600 px-4 py-2 shadow-md text-md text-gray-700 dark:text-gray-400'>
        <HomeIcon className='h-6 w-6 mr-2' />
        <h1 className='mr-2'>{location}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${currentdWeather[0]?.weather[0]?.icon}@2x.png`}
          alt='Weather Icon'
          className='w-10'
        />
        <p>
          {currentdWeather[0]?.main?.temp}
          <span className='text-gray-400'>°C</span>
        </p>
      </div>

      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
        <h1 className='text-md text-gray-600 dark:text-gray-400'>CURRENT WEATHER</h1>
        <p className='font-bold text-sm text-gray-600 dark:text-gray-400'>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <div className='flex flex-col sm:flex-row items-center'>
          <div className='flex flex-row gap-2 items-center'>
            <img
              src={`https://openweathermap.org/img/wn/${currentdWeather[0]?.weather[0]?.icon}@2x.png`}
              alt='Weather Icon'
              className='w-32 sm:w-40'
            />
            <p className='font-semibold text-gray-600 dark:text-gray-400 text-5xl sm:text-6xl mr-10'>
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
            <p className='text-gray-600 dark:text-gray-400'>
              Feels like<span className='font-semibold ml-2'>{currentdWeather[0]?.main?.feels_like}</span>
              <span className='font-extralight text-gray-400'>°C</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between mt-4 w-full sm:w-2/3 lg:w-1/2'>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-400'>Humidity</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-400'>
              {currentdWeather[0]?.main?.humidity}
              <span className='font-extralight text-gray-400'> %</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-400'>Wind Speed</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-400 flex items-center'>
              <ArrowUpIcon
                className='h-6 w-6 transform font-extralight text-gray-400 mr-1'
                style={{ transform: `rotate(${currentdWeather[0]?.wind?.deg || 0}deg)` }}
              />
              <span className='mr-1'>{currentdWeather[0]?.wind?.speed}</span>
              <span className='font-extralight text-gray-400'>m/s</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-400'>Pressure</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-400'>
              {currentdWeather[0]?.main?.pressure}
              <span className='font-extralight text-gray-400'> hPa</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-400'>Visibility</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-400'>
              {(currentdWeather[0]?.visibility / 1000).toFixed(1)}
              <span className='font-extralight text-gray-400'> km</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md overflow-x-auto'>
        <h1 className='text-md text-gray-600 dark:text-gray-400'>5 DAY FORECAST</h1>
        <div className='flex flex-row justify-between mt-4'>
          {summaryWeather.map((data, index) => {
            return (
              <button
                key={index}
                className='flex flex-row items-center rounded-md border border-gray-100 dark:border-gray-600 p-2 shadow-sm'
                onClick={() => setSelectedWeather(data)}>
                <div className='flex flex-row items-center'>
                  <img
                    src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                    alt='Weather Icon'
                    className='w-16 sm:w-20'
                  />
                  <div>
                    <p className='text-md text-left text-gray-600 dark:text-gray-400'>
                      {new Date(data?.dt_txt).toLocaleString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className='text-md text-left text-gray-600 dark:text-gray-400'>
                      {data?.main?.temp}
                      <span className='font-extralight text-gray-400'> °C</span>
                    </p>
                  </div>
                </div>

                {selectedWeather && selectedWeather === data && (
                  <div className='flex flex-col p-4 ml-2'>
                    <p className='font-semibold text-sm text-right text-gray-400'>
                      {data?.weather[0]?.description
                        ?.split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                    <p className='text-sm text-right text-gray-600 dark:text-gray-400'>
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
            className={`text-sm text-gray-600 dark:text-gray-400 mb-4 hover:underline underline-offset-4 ${
              view === 'summary' && 'underline underline-offset-4 decoration-2'
            }`}
            onClick={() => setView('summary')}>
            Summary
          </button>
          <button
            className={`text-sm text-gray-600 dark:text-gray-400 mb-4 hover:underline underline-offset-4 ${
              view === 'hourly' && 'underline underline-offset-4 decoration-2'
            }`}
            onClick={() => setView('hourly')}>
            Hourly
          </button>
        </div>

        {view === 'summary' && <HighchartsReact highcharts={Highcharts} options={chartConfig} />}

        {view === 'hourly' && (
          <div className='flex flex-row gap-2 max-w-full overflow-x-auto'>
            <div className='flex flex-nowrap space-x-2 overflow-x-auto'>
              {weatherData.map((data, index) => (
                <div key={index}>
                  <div className='flex flex-col justify-center items-center w-32 rounded-sm border border-gray-300 dark:border-gray-600 p-2'>
                    <img
                      src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                      alt='Weather Icon'
                      className='w-20'
                    />
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-400'>
                      {data?.main?.temp}
                      <span className='font-extralight text-gray-400'> °C</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-400'>
                      {data?.weather[0]?.description
                        ?.split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-400'>
                      {data?.main?.humidity}
                      <span className='font-extralight text-gray-400'> %</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-400 flex items-center'>
                      <ArrowUpIcon
                        className='h-4 w-4 transform font-extralight text-gray-400 mr-1'
                        style={{ transform: `rotate(${data?.wind?.deg || 0}deg)` }}
                      />
                      <span className='mr-1'>{data?.wind?.speed}</span>
                      <span className='font-extralight text-gray-400'>m/s</span>
                    </p>
                    <p className='font-semibold text-sm text-gray-600 dark:text-gray-400'>
                      {data?.main?.pressure}
                      <span className='font-extralight text-gray-400'> hPa</span>
                    </p>
                  </div>
                  <p className='text-center'>
                    {data?.dt_txt && (
                      <span className='text-sm text-gray-600 dark:text-gray-400'>
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
