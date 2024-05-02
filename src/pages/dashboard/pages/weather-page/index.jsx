import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'pages/dashboard/components/common/loader';
import { HomeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorModal } from 'error/slice/errorSlice';
import { useNavigate } from 'react-router-dom';
import { selectUserAddress } from '../../slice/userSlice';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState();
  const [selectedWeather, setSelectedWeather] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useSelector(selectUserAddress);

  // TODO: Move fetch data to backend and use useAxios hook instead.
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=128a04a67f6b5706e842411e7a3cebe6`
      );
      const weatherForecast = response?.data?.list;
      setWeatherData(weatherForecast);
    } catch (error) {
      dispatch(showErrorModal('Failed to fetch weather data, check your location and try again'));
      navigate('/profile');
    }
  };

  useEffect(() => {
    if (location) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [location]);

  if (!weatherData) {
    return <Loader />;
  }

  const chartConfig = {
    chart: {
      type: 'area',
      height: 200,
    },
    title: {
      text: null,
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      categories: ['Sun 28', 'Mon 29', 'Thu 30', 'Wed 1', 'Thu 2', 'Fry 3', 'Sat 4', 'Sun 5', 'Mon 6'],
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
        data: [26, 27, 32, 27, 25, 31, 32, 31, 27],
      },
    ],
  };

  return (
    <div className='flex flex-col gap-5 bg-white dark:bg-secondary-dark-bg border border-gray-100 dark:border-gray-700 rounded-xl shadow-md mx-6 mt-3 p-4 min-h-screen'>
      <div className='flex flex-row items-center rounded-md border border-gray-100 dark:border-gray-600 px-4 py-2 shadow-md text-md text-gray-700 dark:text-gray-100'>
        <HomeIcon className='h-6 w-6 mr-2' />
        <h1 className='mr-2'>{location}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
          alt='Weather Icon'
          className='w-10'
        />
        <p>
          {weatherData[0]?.main?.temp}
          <span>°C</span>
        </p>
      </div>

      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
        <h1 className='text-md text-gray-600 dark:text-gray-100'>CURRENT WEATHER</h1>
        <p className='font-bold text-sm text-gray-600 dark:text-gray-100'>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>

        <div className='flex flex-row items-center'>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`}
            alt='Weather Icon'
            className='w-40'
          />
          <p className='font-semibold text-gray-600 dark:text-gray-100 text-6xl mr-10'>
            {weatherData[0]?.main?.temp}
            <span className='text-gray-400'>°C</span>
          </p>
          <div className='flex flex-col'>
            <p className='text-gray-400 text-md'>
              {weatherData[0]?.weather[0]?.description
                ?.split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </p>
            <p className='text-gray-600 dark:text-gray-100'>
              Feels like<span className='font-semibold ml-2'>{weatherData[0]?.main?.feels_like}</span>
              <span className='font-extralight text-gray-400'>°C</span>
            </p>
          </div>
        </div>

        {/* Add description
        <p>description</p> */}

        <div className='flex justify-between mt-4'>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Humidity</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.main?.humidity}
              <span className='font-extralight text-gray-400'> %</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Wind Speed</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.wind?.speed}
              <span className='font-extralight text-gray-400'> m/s</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Pressure</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.main?.pressure}
              <span className='font-extralight text-gray-400'> hPa</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Humidity</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.main?.humidity}
              <span className='font-extralight text-gray-400'> %</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Wind Speed</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.wind?.speed}
              <span className='font-extralight text-gray-400'> m/s</span>
            </p>
          </div>
          <div>
            <p className='font-2xl text-gray-600 dark:text-gray-100'>Pressure</p>
            <p className='font-semibold text-2xl text-gray-600 dark:text-gray-100'>
              {weatherData[0]?.main?.pressure}
              <span className='font-extralight text-gray-400'> hPa</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
        <h1 className='text-md text-gray-600 dark:text-gray-100'>5 DAY FORECAST</h1>

        <div className='flex flex-row justify-between mt-4'>
          {weatherData.slice(0, 5).map((data, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            return (
              <button
                key={index}
                onClick={() => setSelectedWeather(data)}
                className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
                <p className='tex-md text-gray-600 dark:text-gray-100'>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })} {date.getDate()}
                </p>
                <p className='tex-md text-gray-600 dark:text-gray-100'>
                  {data.main.temp}
                  <span className='font-extralight text-gray-400'> °C</span>
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className='rounded-md border border-gray-100 dark:border-gray-600 p-4 shadow-md'>
        <h1 className='text-sm text-gray-600 dark:text-gray-100 mb-4'>Summary</h1>
        <HighchartsReact highcharts={Highcharts} options={chartConfig} />
      </div>
    </div>
  );
};

export default WeatherComponent;
