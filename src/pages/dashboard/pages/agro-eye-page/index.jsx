import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';
import Dropdown from 'pages/dashboard/components/base/Dropdown';

exportingInit(Highcharts);
offlineExportingInit(Highcharts);

function AgroEye() {
  const [chartType, setChartType] = useState('line');

  const lineChart = {
    chart: {
      type: 'line',
      scrollablePlotArea: {
        minWidth: 500,
        scrollPositionX: 1,
      },
    },
    title: {
      text: 'ELZ-0001-01',
    },
    xAxis: {
      categories: ['7.00 A.M', '8.00 A.M', '9.00 A.M', '10.00 A.M', '11.00 A.M'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [
      {
        name: 'Temperature',
        data: [25, 26, 27, 26, 25],
      },
      {
        name: 'Humidity',
        data: [60, 59, 58, 57, 56],
      },
      {
        name: 'Soil Moisture',
        data: [40, 42, 45, 43, 41],
      },
      {
        name: 'Gas Detection',
        data: [0.1, 0.2, 0.3, 0.2, 0.1],
      },
    ],
  };

  const barChart = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'ELZ-0001-01',
    },
    xAxis: {
      categories: ['Temperature', 'Humidity', 'Soil Moisture', 'Gas Detection'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [
      {
        name: '10.00 A.M',
        data: [25, 60, 40, 20],
      },
      {
        name: '11.00 A.M',
        data: [26, 59, 42, 10],
      },
    ],
  };

  const chartOptions = {
    line: lineChart,
    bar: barChart,
  };

  return (
    <div className='bg-white dark:bg-secondary-dark-bg rounded-xl shadow-md p-8 mx-6 my-4 min-h-screen'>
      <div className='flex flex-col sm:flex-row'>
        <label className='text-sm font-medium'>Chart Type :</label>
        <div className='flex items-center sm:ml-2'>
          <input
            type='radio'
            id='line-chart'
            name='chart-type'
            value='line'
            checked={chartType === 'line'}
            onChange={(e) => setChartType(e.target.value)}
            className='mr-2'
          />
          <label htmlFor='line-chart' className='mr-4'>
            Line
          </label>

          <input
            type='radio'
            id='bar-chart'
            name='chart-type'
            value='bar'
            checked={chartType === 'bar'}
            onChange={(e) => setChartType(e.target.value)}
            className='mr-2'
          />
          <label htmlFor='bar-chart'>Bar</label>
        </div>
      </div>

      <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-white rounded-md border border-gray-200 shadow-md shadow-black/5 p-4 w-full'>
          <HighchartsReact highcharts={Highcharts} options={chartOptions[chartType]} />
        </div>

        <div className='bg-white rounded-md border border-gray-200 shadow-md shadow-black/5 p-4 w-full'>
          <HighchartsReact highcharts={Highcharts} options={chartOptions[chartType]} />
        </div>
      </div>
    </div>
  );
}

export default AgroEye;
