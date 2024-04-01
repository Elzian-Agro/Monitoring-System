import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';

exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const Chart = ({ widget }) => {
  const [chartType, setChartType] = useState('');
  const currentMode = useSelector(selectTheme);

  useEffect(() => {
    setChartType(widget.chartType);
  }, [widget.chartType]);

  // Function to get the color based on currentMode
  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  const lineChart = {
    chart: {
      type: 'line',
      scrollablePlotArea: {
        minWidth: 500,
        scrollPositionX: 1,
      },
      backgroundColor: getColor('#414345', 'white'),
    },
    title: {
      text: widget.name,
      style: {
        color: getColor('white', 'black'),
      },
    },
    xAxis: {
      categories: ['7.00 A.M', '8.00 A.M', '9.00 A.M', '10.00 A.M', '11.00 A.M'],
      labels: {
        style: {
          color: getColor('white', 'black'),
        },
      },
    },
    yAxis: {
      title: {
        text: 'Values',
        style: {
          color: getColor('white', 'black'),
        },
      },
      labels: {
        style: {
          color: getColor('white', 'black'),
        },
      },
    },
    legend: {
      itemStyle: {
        color: getColor('white', 'black'),
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
      scrollablePlotArea: {
        minWidth: 500,
        scrollPositionX: 1,
      },
      backgroundColor: getColor('#414345', 'white'),
    },
    title: {
      text: widget.name,
      style: {
        color: getColor('white', 'black'),
      },
    },
    xAxis: {
      categories: ['Temperature', 'Humidity', 'Soil Moisture', 'Gas Detection'],
      labels: {
        style: {
          color: getColor('white', 'black'),
        },
      },
    },
    yAxis: {
      title: {
        text: 'Values',
        style: {
          color: getColor('white', 'black'),
        },
      },
      labels: {
        style: {
          color: getColor('white', 'black'),
        },
      },
    },
    legend: {
      itemStyle: {
        color: getColor('white', 'black'),
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
    <>
      <div className='bg-white dark:bg-gray-600 border-t border-gray-200 dark:border-gray-600 p-1 w-full'>
        <HighchartsReact highcharts={Highcharts} options={chartOptions[chartType]} />
      </div>
    </>
  );
};

export default Chart;
