import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsStock from 'highcharts/modules/stock';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';

highchartsStock(Highcharts);
highchartsAccessibility(Highcharts);
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const Chart = ({ widget }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const currentMode = useSelector(selectTheme);

  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  useEffect(() => {
    const sensorSeries = widget.devices.flatMap((device) => {
      const deviceId = device.deviceId;
      const factors = device.factors;
      const series = factors.map((factor) => {
        const seriesData = widget.sensorData
          .find((sensorData) => sensorData[deviceId])
          [deviceId].map((entry) => {
            return {
              date: new Date(entry.dateTime).toLocaleString('en-US', {
                timeZone: 'Asia/Colombo',
                dateStyle: 'long',
                timeStyle: 'short',
              }),
              values: entry[factor],
            };
          });

        const timeSeriesData = Array.from({ length: widget.axisTime.length }).fill(null);

        seriesData.forEach((data) => {
          const timeIndex = widget.axisTime.findIndex((time) => time === data.date);
          if (timeIndex !== -1) {
            timeSeriesData[timeIndex] = data.values;
          }
        });

        return {
          name: deviceId + ' ' + factor,
          data: timeSeriesData,
        };
      });

      return series;
    });

    const chartConfig = {
      chart: {
        type: widget.chartType,
        backgroundColor: getColor('#414345', '#ffffff'),
        scrollablePlotArea: {
          minWidth: 500,
          scrollPositionX: 1,
        },
      },
      title: {
        text: widget.name,
        style: {
          color: getColor('#ffffff', '#00000'),
        },
      },
      xAxis: {
        categories: widget.axisTime,
        title: {
          text: null,
          style: {
            color: getColor('#ffffff', '#00000'),
          },
        },
        labels: {
          style: {
            color: getColor('#ffffff', '#00000'),
          },
        },
        min: 0,
        max: 4,
        scrollbar: {
          enabled: true,
        },
        tickLength: 0,
      },
      yAxis: {
        title: {
          text: null,
          style: {
            color: getColor('#ffffff', '#00000'),
          },
        },
        labels: {
          style: {
            color: getColor('#ffffff', '#00000'),
          },
        },
      },
      legend: {
        itemStyle: {
          color: getColor('#ffffff', '#00000'),
        },
      },
      series: sensorSeries,
    };

    setChartOptions(chartConfig);
    // eslint-disable-next-line
  }, [widget, currentMode]);

  return (
    <>
      <div className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 p-1 '>
        {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
      </div>
    </>
  );
};

export default Chart;
