import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { DeviceFactors } from 'utils/constant';

// Weather data for devices
const weatherData = [
  {
    'ELZ-0003-01': [
      {
        timestamp: '2024-12-05T06:12:00.000Z',
        temperature: 38.3,
        humidity: 50,
        rainfall: 3500,
        wind_speed: 25,
        wind_direction: 120,
        light: 180,
      },
      {
        timestamp: '2024-12-05T06:13:00.000Z',
        temperature: 34.3,
        humidity: 50,
        rainfall: 3500,
        wind_speed: 25,
        wind_direction: 120,
        light: 180,
      },
      {
        timestamp: '2024-12-05T06:14:00.000Z',
        temperature: 32.0,
        humidity: 50,
        rainfall: 3500,
        wind_speed: 25,
        wind_direction: 120,
        light: 180,
      },
    ],
  },
  {
    'ELZ-0003-02': [
      {
        timestamp: '2024-12-05T06:12:00.000Z',
        temperature: 20.3,
        humidity: 50,
        rainfall: 3500,
        wind_speed: 25,
        wind_direction: 120,
        light: 180,
      },
      {
        timestamp: '2024-12-05T06:14:00.000Z',
        temperature: 31.3,
        humidity: 50,
        rainfall: 3500,
        wind_speed: 25,
        wind_direction: 120,
        light: 180,
      },
    ],
  },
];

const HistryWeather = () => {
  const [selectedRange, setSelectedRange] = useState('Last 24 hours');
  const [selectedInterval, setSelectedInterval] = useState('1 min');
  const [temperatureOptions, setTemperatureOptions] = useState(null);
  const [humidityOptions, setHumidityOptions] = useState(null);
  const [rainfallOptions, setRainfallOptions] = useState(null);
  const [windSpeedOptions, setWindSpeedOptions] = useState(null);
  const [windDirectionOptions, setWindDirectionOptions] = useState(null);
  const [lightOptions, setLightOptions] = useState(null);

  const currentMode = useSelector(selectTheme);
  const { t } = useTranslation();

  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  const calculateStartDate = (range) => {
    const now = new Date();
    switch (range) {
      case 'Last 24 hours':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).setSeconds(0, 0);
      case 'Last week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).setSeconds(0, 0);
      case 'Last Month':
        return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).setSeconds(0, 0);
      default:
        return new Date(now.getFullYear(), now.getMonth(), 1).setSeconds(0, 0);
    }
  };

  const calculateInterval = (interval) => {
    switch (interval) {
      case '1 min':
        return 60 * 1000;
      case '5 min':
        return 5 * 60 * 1000;
      case '30 min':
        return 30 * 60 * 1000;
      case '1 hour':
        return 60 * 60 * 1000;
      case '1 day':
        return 24 * 60 * 60 * 1000;
      default:
        return 60 * 60 * 1000;
    }
  };

  useEffect(() => {
    if (!weatherData) return;

    const options = {};

    const generateSeriesData = (factor) => {
      const series = {};
      const startDate = calculateStartDate(selectedRange);
      const interval = calculateInterval(selectedInterval);
      const now = new Date();
      const categories = [];

      let currentTime = new Date(startDate);
      while (currentTime <= now) {
        categories.push(currentTime.toISOString());
        currentTime = new Date(currentTime.getTime() + interval);
      }

      console.log(categories);
      let hasData = false;

      weatherData.forEach((device) => {
        const deviceId = Object.keys(device)[0];
        const deviceData = device[deviceId];

        const seriesData = categories.map((date) => {
          const entry = deviceData.find((data) => data.timestamp === date);

          // Check if the entry contains the factor and return the value, else return null
          return entry && factor in entry ? entry[factor] : null;
        });

        if (seriesData.some((value) => value !== null)) {
          hasData = true; // Data exists for this factor
        }

        series[deviceId] = seriesData;
      });

      return { series, categories, hasData };
    };

    DeviceFactors['Weather Station']
      .map((factor) => factor.replace(/\s+/g, '_').toLowerCase())
      .forEach((factor) => {
        const { series, categories, hasData } = generateSeriesData(factor);

        if (!hasData) return; // Skip if no data exists for this factor

        options[factor] = {
          chart: {
            type: 'line',
            backgroundColor: getColor('#414345', '#ffffff'),
          },
          title: {
            text: null,
            style: {
              color: getColor('#ffffff', '#000000'),
            },
          },
          xAxis: {
            categories: categories.map((time) => {
              const dateTime = new Date(time);
              const dateFormat = dateTime.toLocaleDateString('en-US', {
                timeZone: 'Asia/Colombo',
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });
              const timeFormat = dateTime.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Colombo',
                hour: 'numeric',
                minute: 'numeric',
              });
              return `${dateFormat}<br>${timeFormat}`;
            }),
            title: {
              text: null,
              style: {
                color: getColor('#ffffff', '#000000'),
              },
            },
            labels: {
              style: {
                color: getColor('#ffffff', '#000000'),
              },
            },
            min: 0,
            max: 5,
            scrollbar: {
              enabled: true,
            },
            tickLength: 0,
          },
          yAxis: {
            title: {
              text: null,
              style: {
                color: getColor('#ffffff', '#000000'),
              },
            },
            labels: {
              style: {
                color: getColor('#ffffff', '#000000'),
              },
            },
          },
          legend: {
            itemStyle: {
              color: getColor('#ffffff', '#000000'),
            },
          },
          exporting: {
            enabled: false,
          },
          accessibility: {
            enabled: false,
          },
          
          series: Object.keys(series).map((deviceId) => ({
            name: deviceId,
            data: series[deviceId],
          })),
        };
      });

    setTemperatureOptions(options.temperature);
    setHumidityOptions(options.humidity);
    setRainfallOptions(options.rainfall);
    setWindSpeedOptions(options.wind_speed);
    setWindDirectionOptions(options.wind_direction);
    setLightOptions(options.light);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, selectedInterval,currentMode]);

  return (
    <div>
      {/* Filters */}
      <div className='flex flex-col xs:flex-row gap-2 xs:justify-end xs:items-center mb-4'>
        <select
          className='border border-gray-300 dark:border-gray-500 rounded-md p-2 focus:outline-none dark:bg-secondary-dark-bg dark:text-white'
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}>
          <option>Last 24 hours</option>
          <option>Last week</option>
          <option>Last Month</option>
        </select>
        <select
          className='border border-gray-300 dark:border-gray-500 rounded-md p-2 focus:outline-none dark:bg-secondary-dark-bg dark:text-white'
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(e.target.value)}>
          <option>1 min</option>
          <option>5 min</option>
          <option>30 min</option>
          <option>1 hour</option>
          <option>1 day</option>
        </select>
      </div>

      {/* Weather Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {temperatureOptions && (
          <div className='bg-white dark:bg-secondary-dark-bg rounded-md border border-gray-100 dark:border-gray-600 shadow-md shadow-black/5 p-1 w-full'>
            <h1 className='text-md text-center font-semibold dark:text-white'>{t('Temperature')}</h1>
            <HighchartsReact highcharts={Highcharts} options={temperatureOptions} />
          </div>
        )}
        {humidityOptions && (
          <div className='bg-white dark:bg-secondary-dark-bg rounded-md border border-gray-100 dark:border-gray-600 shadow-md shadow-black/5 p-1 w-full'>
            <h1 className='text-md text-center font-semibold dark:text-white'>{t('Humidity')}</h1>
            <HighchartsReact highcharts={Highcharts} options={humidityOptions} />
          </div>
        )}
        {rainfallOptions && (
          <div className='bg-white dark:bg-secondary-dark-bg rounded-md border border-gray-100 dark:border-gray-600 shadow-md shadow-black/5 p-1 w-full'>
            <h1 className='text-md text-center font-semibold dark:text-white'>{t('Rainfall')}</h1>
            <HighchartsReact highcharts={Highcharts} options={rainfallOptions} />
          </div>
        )}
        {windSpeedOptions && (
          <div className='bg-white dark:bg-secondary-dark-bg rounded-md border border-gray-100 dark:border-gray-600 shadow-md shadow-black/5 p-1 w-full'>
            <h1 className='text-md text-center font-semibold dark:text-white'>{t('Wind')}</h1>
            <HighchartsReact highcharts={Highcharts} options={windSpeedOptions} />
          </div>
        )}
        {lightOptions && (
          <div className='bg-white dark:bg-secondary-dark-bg rounded-md border border-gray-100 dark:border-gray-600 shadow-md shadow-black/5 p-1 w-full'>
            <h1 className='text-md text-center font-semibold dark:text-white'>{t('Light')}</h1>
            <HighchartsReact highcharts={Highcharts} options={lightOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistryWeather;
