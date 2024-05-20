import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';

const Chart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const currentMode = useSelector(selectTheme);

  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  useEffect(() => {
    const newAxisTime = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    for (
      let currentDate = new Date(startDate);
      currentDate <= endDate;
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    ) {
      newAxisTime.push(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(currentDate));
    }

    const chartConfig = {
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
        categories: newAxisTime,
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
      series: [
        {
          name: 'ELZ-0001-01',
          data: [2, 5, 6, 7, 10, 1, 2, 5, 6, 7, 10, 1],
        },
        {
          name: 'ELZ-0001-02',
          data: [10, 6, 8, 2, 5, 10, 10, 6, 8, 2, 5, 10],
        },
      ],
    };

    setChartOptions(chartConfig);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='bg-white dark:bg-gray-800'>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
