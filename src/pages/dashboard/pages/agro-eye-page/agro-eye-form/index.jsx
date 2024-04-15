import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TextBox from 'pages/dashboard/components/base/TextBox';
import Dropdown from 'pages/dashboard/components/base/Dropdown';
import DeviceConfig from './device-config';
import { ArrowLeftIcon, CalendarIcon, ChartBarIcon, IdentificationIcon, PlusIcon } from '@heroicons/react/24/outline';
import { PrimaryButton } from 'pages/dashboard/components/base/Button';
import PropTypes from 'prop-types';
import useAxios from 'hooks/useAxios';

const Form = ({ visible, onClose, widget = null, formSubmission }) => {
  const [name, setName] = useState('');
  const [chartType, setChartType] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [utcStartDateTime, setUtcStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [utcEndDateTime, setUtcEndDateTime] = useState('');
  const [timeGap, setTimeGap] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [devices, setDevices] = useState([{ deviceId: '', factors: [], availableFactors: [] }]);

  const { t } = useTranslation();
  const { send } = useAxios();

  useEffect(() => {
    const getDevices = async () => {
      const devices = await send({ endpoint: 'device', method: 'GET' });

      const deviceInfo = devices?.result.map((device) => ({
        name: `${device.deviceId}`,
        value: device.deviceId,
        factors: device.monitoringFactors,
      }));

      setDeviceList(deviceInfo);
    };

    getDevices();

    // Set form fields for edit mode
    if (widget) {
      setName(widget.name);
      setChartType(widget.chartType);
      setStartDateTime(
        new Date(new Date(widget.startDateTime).getTime() - new Date(widget.startDateTime).getTimezoneOffset() * 60000)
      );
      setUtcStartDateTime(new Date(widget.startDateTime));
      setEndDateTime(
        new Date(new Date(widget.endDateTime).getTime() - new Date(widget.endDateTime).getTimezoneOffset() * 60000)
      );
      setUtcEndDateTime(new Date(widget.endDateTime));
      setTimeGap(widget.timeGap);
      setDevices(widget.devices || [{ deviceId: '', factors: [] }]);
    }

    // eslint-disable-next-line
  }, [widget]);

  const resetForm = () => {
    setName('');
    setChartType('');
    setDevices([{ deviceId: '', factors: [], availableFactors: [] }]);
    setStartDateTime('');
    setUtcStartDateTime('');
    setEndDateTime('');
    setUtcEndDateTime('');
    setTimeGap('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name,
      chartType,
      devices,
      startDateTime: utcStartDateTime,
      endDateTime: utcEndDateTime,
      timeGap,
    };

    const response = await send({
      endpoint: widget ? `widget/${widget._id}` : `widget`,
      method: widget ? 'PUT' : 'POST',
      body: requestData,
    });

    if (response) {
      formSubmission(widget ? 'Widget updated successfully' : 'Widget created successfully');
      onClose();
    }
  };

  return (
    <>
      {!visible ? null : (
        <div className='flex flex-col p-8 gap-4 min-h-full w-full shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
          <div>
            <button
              className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
              onClick={onClose}>
              <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
            </button>
          </div>
          <div>
            <h1 className='text-base text-center text-gray-700 dark:text-white'>
              {widget ? t('UPDATE WIDGET DETAILS') : t('NEW WIDGET CREATION')}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center'>
              <div className='grid lg:grid-cols-2 space-y-4 lg:space-y-0 w-full justify-center lg:gap-x-20 lg:px-24 xl:px-44 lg:gap-y-10'>
                <TextBox
                  placeholder='Ex: North Field'
                  label='Widget Name'
                  type='text'
                  Icon={IdentificationIcon}
                  value={name}
                  setValue={setName}
                  required={true}
                />

                <Dropdown
                  label='Chart Type'
                  Icon={ChartBarIcon}
                  defaltOptions='Select a chart type'
                  value={chartType}
                  setValue={setChartType}
                  options={[
                    { name: 'Line Chart', value: 'line' },
                    { name: 'Bar Chart', value: 'bar' },
                  ]}
                  required={true}
                />

                <TextBox
                  label='Start Date'
                  type='datetime-local'
                  Icon={CalendarIcon}
                  value={startDateTime && startDateTime.toISOString().slice(0, 16)}
                  setValue={(value) => {
                    const selectedDateTime = new Date(value);
                    const localDateTime = new Date(
                      selectedDateTime.getTime() - selectedDateTime.getTimezoneOffset() * 60000 // Adjust the timezone offset to match the local time in Sri Lanka
                    );
                    setStartDateTime(localDateTime); // Set local date for display
                    setUtcStartDateTime(selectedDateTime); // Set UTC date for request data
                  }}
                  required={true}
                />

                <TextBox
                  label='End Date'
                  type='datetime-local'
                  Icon={CalendarIcon}
                  value={endDateTime && endDateTime.toISOString().slice(0, 16)}
                  setValue={(value) => {
                    const selectedDateTime = new Date(value);
                    const localDateTime = new Date(
                      selectedDateTime.getTime() - selectedDateTime.getTimezoneOffset() * 60000
                    );
                    setEndDateTime(localDateTime);
                    setUtcEndDateTime(selectedDateTime);
                  }}
                  required={true}
                />

                <Dropdown
                  label='Time Gap'
                  Icon={IdentificationIcon}
                  defaltOptions='Select a time gap'
                  value={timeGap}
                  setValue={setTimeGap}
                  options={[
                    { name: '1 Min', value: 1 * 60 * 1000 },
                    { name: '5 Min', value: 5 * 60 * 1000 },
                    { name: '15 Min', value: 15 * 60 * 1000 },
                    { name: '30 Min', value: 30 * 60 * 1000 },
                    { name: '1 Hour', value: 1 * 60 * 60 * 1000 },
                    { name: '2 Hours', value: 2 * 60 * 60 * 1000 },
                    { name: '6 Hours', value: 6 * 60 * 60 * 1000 },
                    { name: '12 Hours', value: 12 * 60 * 60 * 1000 },
                    { name: '1 Day', value: 24 * 60 * 60 * 1000 },
                  ]}
                  required={true}
                />

                {devices.map((device, index) => (
                  <DeviceConfig
                    key={device.deviceId}
                    device={device}
                    index={index}
                    setDevices={setDevices}
                    deviceList={deviceList}
                    devices={devices}
                  />
                ))}

                <div className='min-w-60 w-60 sm:w-64 md:w-80 lg:w-full border rounded-md py-2 flex justify-center items-center mt-4 dark:text-white'>
                  <button
                    type='button'
                    onClick={() => {
                      const newDevice = { deviceId: '', factors: [], availableFactors: [] };
                      setDevices([...devices, newDevice]);
                    }}
                    className='flex items-center'>
                    <span>{t('Add device')}</span>
                    <span className='ml-1'>
                      <PlusIcon className='h-5 w-5' />
                    </span>
                  </button>
                </div>
              </div>

              <div className='flex justify-center pt-6'>
                <div className='flex justify-end gap-2 w-60 sm:w-64 md:w-80 lg:w-full lg:px-24 xl:px-44'>
                  {!widget && (
                    <PrimaryButton color='bg-red-500 border-red-600' type='button' text='Clear' onClick={resetForm} />
                  )}
                  <PrimaryButton color='bg-blue-500 border-blue-600' text={widget ? 'Update' : 'Submit'} />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  widget: PropTypes.object,
  formSubmission: PropTypes.func.isRequired,
};

export default Form;
