import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, ToggleButton } from 'pages/dashboard/components/base/Button';
import TextBox from 'pages/dashboard/components/base/TextBox';
import { UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import Dropdown from 'pages/dashboard/components/base/Dropdown';

const Form = ({ visible, onClose, device = null, formSubmission }) => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceStatus, setDeviceStatus] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const { t } = useTranslation();
  const { send } = useAxios();

  useEffect(() => {
    // Set form fields for edit mode
    if (device) {
      setDeviceId(device.deviceId);
      setDeviceType(device.deviceType);
      setDeviceStatus(device.deviceStatus);
      setIsDisabled(device.isDisabled);
    }
  }, [device]);

  const resetForm = () => {
    setDeviceId('');
    setDeviceType('');
    setDeviceStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      deviceId,
      deviceType,
      deviceStatus,
      isDisabled,
    };

    const response = await send({
      endpoint: device ? `device/${device._id}` : `device`,
      method: device ? 'PUT' : 'POST',
      body: requestData,
    });

    if (response) {
      formSubmission(device ? 'Device updated successfully' : 'Device created successfully');
      onClose();
    }
  };

  return (
    <>
      {!visible ? null : (
        <div className='flex flex-col p-8 gap-6 min-h-full w-full shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
          <div>
            <button
              className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
              onClick={onClose}>
              <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
            </button>
          </div>
          <div>
            <h1 className='text-base text-center text-gray-700 dark:text-white'>
              {device ? t('UPDATE DEVICE DETAILS') : t('NEW DEVICE CREATION')}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <div className='grid space-y-8 md:space-y-10 lg:space-y-12 justify-center'>
                <div className='lg:w-80'>
                  <TextBox
                    placeholder='Ex: ELZ-XXXX-XX'
                    label='Device ID'
                    type='text'
                    Icon={UserIcon}
                    value={deviceId}
                    setValue={setDeviceId}
                    required={true}
                  />
                </div>

                <div className='lg:w-80'>
                  <Dropdown
                    label='Device Type'
                    Icon={UserIcon}
                    value={deviceType}
                    setValue={setDeviceType}
                    options={['', 'monitoring-system-v1', 'monitoring-system-v2']}
                    required={true}
                  />
                </div>

                <div className='flex flex-col sm:flex-row gap-4 lg:w-80'>
                  <label className='text-sm text-gray-400'>{t('Device Status')} :</label>
                  <div className='flex flex-row gap-x-4'>
                    <div>
                      <input
                        type='radio'
                        id='active'
                        name='status'
                        value='Active'
                        required
                        checked={deviceStatus === 'Active'}
                        onChange={() => setDeviceStatus('Active')}
                      />
                      <label htmlFor='active' className='text-sm text-gray-400 ml-2'>
                        {t('Active')}
                      </label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        id='inactive'
                        name='status'
                        value='Inactive'
                        required
                        checked={deviceStatus === 'Inactive'}
                        onChange={() => setDeviceStatus('Inactive')}
                      />
                      <label htmlFor='inactive' className='text-sm text-gray-400 ml-2'>
                        {t('Inactive')}
                      </label>
                    </div>
                  </div>
                </div>

                {device && (
                  <div className='flex flex-row items-center gap-4'>
                    <div className='text-gray-400'>
                      {device.isDisabled ? t('Enable device') : t('Disable device')} :
                    </div>
                    <ToggleButton
                      value={isToggleClicked}
                      onChange={() => {
                        setIsToggleClicked(!isToggleClicked);
                        setIsDisabled(!isDisabled);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className='flex justify-center pt-6 md:pt-10'>
                <div className='flex justify-end gap-2 w-60 sm:w-64 md:w-80 lg:w-80'>
                  {!device && <PrimaryButton color='bg-red-500 border-red-600' text='Clear' onClick={resetForm} />}
                  <PrimaryButton color='bg-blue-500 border-blue-600' text={device ? 'Update' : 'Submit'} />
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
  device: PropTypes.object,
  formSubmission: PropTypes.func.isRequired,
};

export default Form;
