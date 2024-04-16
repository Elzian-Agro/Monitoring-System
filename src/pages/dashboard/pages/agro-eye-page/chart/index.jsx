import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsStock from 'highcharts/modules/stock';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import exportingInit from 'highcharts/modules/exporting';
import offlineExportingInit from 'highcharts/modules/offline-exporting';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useSortable } from '@dnd-kit/sortable';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

highchartsStock(Highcharts);
highchartsAccessibility(Highcharts);
exportingInit(Highcharts);
offlineExportingInit(Highcharts);

const Chart = ({ id, widget }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const currentMode = useSelector(selectTheme);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  useEffect(() => {
    const startDateTime = new Date(widget?.startDateTime);
    const endDateTime = new Date(widget?.endDateTime);
    const timeGap = widget?.timeGap;

    const axisTime = []; // Generate time array between start and end time with time gap
    let currentDateTime = new Date(startDateTime);
    while (currentDateTime <= endDateTime) {
      axisTime.push(new Date(currentDateTime).toISOString());
      currentDateTime = new Date(currentDateTime.getTime() + timeGap);
    }

    const sensorSeries = widget?.devices.flatMap((device) => {
      const deviceId = device.deviceId;
      const factors = device.factors;
      const series = factors.map((factor) => {
        const seriesData = widget.sensorData
          .find((sensorData) => sensorData[deviceId])
          [deviceId].map((entry) => {
            return {
              x: new Date(entry.timestamp).toISOString(),
              y: entry[factor],
            };
          });

        const timeSeriesData = [];

        axisTime.forEach((time) => {
          const dataPoint = seriesData.find((data) => data.x === time);
          if (dataPoint) {
            timeSeriesData.push(dataPoint.y);
          } else {
            timeSeriesData.push(null);
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
        type: widget?.chartType,
        backgroundColor: getColor('#414345', '#ffffff'),
      },
      title: {
        text: widget?.name,
        style: {
          color: getColor('#ffffff', '#00000'),
        },
      },
      xAxis: {
        categories: axisTime.map((time) => {
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
            color: getColor('#ffffff', '#00000'),
          },
        },
        labels: {
          style: {
            color: getColor('#ffffff', '#00000'),
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
    <div
      ref={setNodeRef}
      className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 p-1 relative'
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition: transition ?? '',
      }}
      {...attributes}>
      <div className='relative'>
        {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
        <div {...listeners} className='absolute -top-8 left-3 cursor-move'>
          <ArrowsPointingOutIcon className='h-5 w-5 dark:text-white' />
        </div>
      </div>
    </div>
  );
};

export default Chart;
