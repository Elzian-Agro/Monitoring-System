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
  const [chartOptions, setChartOptions] = useState(null);
  const currentMode = useSelector(selectTheme);

  useEffect(() => {
    const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

    const generateAxisTime = () => {
      const startDate = new Date(widget.startDate);
      const endDate = new Date(widget.endDate);
      const timeGap = widget.timeGap.toLowerCase();
      const axisTime = [];

      let currentDate = startDate;
      while (currentDate <= endDate) {
        axisTime.push(currentDate.toLocaleString());
        currentDate = new Date(currentDate.getTime() + getTimeGapInMilliseconds(timeGap));
      }

      return axisTime;
    };

    const getTimeGapInMilliseconds = (timeGap) => {
      const timeGapMap = {
        '2min': 120000,
        '5min': 300000,
        '10min': 600000,
      };
      return timeGapMap[timeGap];
    };

    const axisTime = generateAxisTime();

    const sensorData = widget.devices
      .map((device) => {
        const deviceId = device.deviceId;
        const factors = device.factors;
        const series = factors.map((factor) => {
          const data = widget.sensorData
            .find((sensorData) => sensorData[deviceId])
            [deviceId].map((entry) => entry[factor]);
          return {
            name: deviceId + ' ' + factor,
            data,
          };
        });
        return series;
      })
      .flat();

    const chartConfig = {
      chart: {
        type: widget.chartType,
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
        categories: axisTime,
        labels: {
          style: {
            color: getColor('white', 'black'),
          },
        },
      },
      yAxis: {
        title: {
          text: '',
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
      series: sensorData,
    };

    setChartOptions(chartConfig);
  }, [widget, currentMode]);

  return (
    <>
      <div className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 p-1 w-full'>
        {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
      </div>
    </>
  );
};

export default Chart;
