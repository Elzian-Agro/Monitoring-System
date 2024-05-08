import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { selectTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useTranslation } from 'react-i18next';

const Chart = ({ weatherData }) => {
  const currentMode = useSelector(selectTheme);
  const { t } = useTranslation();

  const getColor = (darkColor, lightColor) => (currentMode === 'Dark' ? darkColor : lightColor);

  const chartConfig = {
    chart: {
      type: 'area',
      height: 300,
      backgroundColor: getColor('#414345', '#ffffff'),
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
      labels: {
        style: {
          color: '#8f8b8b',
        },
      },
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
            color: getColor('#dee0e3', '#7d7f82'),
            textOutline: '0px',
          },
        },
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: t('Temperature'),
        data: weatherData?.map((data) => data?.main?.temp),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartConfig} />;
};

Chart.propTypes = {
  weatherData: PropTypes.arrayOf(
    PropTypes.shape({
      dt_txt: PropTypes.string,
      main: PropTypes.shape({
        temp: PropTypes.number,
      }),
    })
  ),
};

export default Chart;
