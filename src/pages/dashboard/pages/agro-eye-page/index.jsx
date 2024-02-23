import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';
import Dropdown from 'pages/dashboard/components/base/Dropdown';

exportingInit(Highcharts);
offlineExportingInit(Highcharts);

function AgroEye() {
  const [chartType, setChartType] = useState('Line');

  const lineChart = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Sensor Data Over Time',
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
      text: 'Sensor Data Comparison',
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

  const pieChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sensor Data Distribution',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Sensor Data',
        colorByPoint: true,
        data: [
          {
            name: 'Temperature',
            y: 25,
          },
          {
            name: 'Humidity',
            y: 60,
          },
          {
            name: 'Soil Moisture',
            y: 40,
          },
          {
            name: 'Gas Detection',
            y: 20,
          },
        ],
      },
    ],
  };

  const chartOptions = {
    Line: lineChart,
    Bar: barChart,
    Pie: pieChart,
  };

  return (
    <div className='flex justify-center bg-white dark:bg-secondary-dark-bg rounded-xl shadow-md p-8 mx-6 my-4'>
      <div className='flex flex-col'>
        <div className='mb-10'>
          <Dropdown label='Chart Type' value={chartType} setValue={setChartType} options={['Line', 'Bar', 'Pie']} />
        </div>
        <div className='bg-white rounded-md border border-gray-100 shadow-md shadow-black/5 flex justify-center items-center p-4'>
          <HighchartsReact highcharts={Highcharts} options={chartOptions[chartType]} />
        </div>
      </div>
    </div>
  );
}

export default AgroEye;
