import React, { useState } from 'react';
import CheckBox from 'pages/dashboard/components/base/CheckBox';
import { IdentificationIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Dropdown from 'pages/dashboard/components/base/Dropdown';
import { useTranslation } from 'react-i18next';

const DeviceConfig = ({ device, setDevices, index, deviceList, devices }) => {
  const { t } = useTranslation();

  return (
    <div key={device.deviceId} className='min-w-60 w-60 sm:w-64 md:w-80 lg:w-full'>
      <div className='flex justify-end'>
        <XMarkIcon
          className='h-3 w-3 text-red-600'
          onClick={() => {
            const updatedDevices = [...devices];
            updatedDevices.splice(index, 1);
            setDevices(updatedDevices);
          }}
        />
      </div>
      <Dropdown
        label='Device Id'
        Icon={IdentificationIcon}
        defaltOptions='Select a device'
        value={device.deviceId}
        setValue={(value) => {
          const updatedDevices = [...devices];
          updatedDevices[index].deviceId = value;
          updatedDevices[index].availableFactors = deviceList.filter((deviceInfo) => deviceInfo.name === value)[0][
            'factors'
          ];
          console.log(updatedDevices);
          setDevices(updatedDevices);
        }}
        options={deviceList}
        required={true}
      />
      <div className='my-4'>
        <p className='text-sm text-gray-400 mb-2'>{t('Factors')}</p>
        <div className='grid grid-cols-2'>
          {device.availableFactors?.map((factor) => {
            return (
              <CheckBox
                label={t(factor)}
                checked={device.factors.includes(factor)}
                onChange={() => {
                  const updatedDevices = [...devices];
                  updatedDevices[index].factors.push(factor);
                  setDevices(updatedDevices);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeviceConfig;
