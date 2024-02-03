import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, ToggleButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import AlertBox from '../alert-box';
import {
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { identifyError } from 'pages/auth/utils';
import axios from 'axios';
import { generateRandomPassword } from 'pages/dashboard/utils/generateRandomPassword';
import { useTranslation } from 'react-i18next';
import { validateForm } from 'pages/dashboard/utils/userFormValidation';

const Form = ({ visible, onClose, user = null }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    // Set form fields for edit mode
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setNic(user.NIC);
      setEmail(user.email);
      setPhoneNum(user.phoneNum);
      setOrgName(user.orgName);
      setIsDisabled(user.isDisabled);
      setIsToggleClicked(false);
    }

    // Generate random password for register mode
    if (!user) {
      setPassword(generateRandomPassword());
    }
  }, [user]);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setNic('');
    setEmail('');
    setPhoneNum('');
    setPassword(generateRandomPassword());
    setOrgName('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      { key: 'firstName', label: 'First name', value: firstName },
      { key: 'lastName', label: 'Last name', value: lastName },
      { key: 'nic', label: 'NIC', value: nic },
      { key: 'email', label: 'Email', value: email },
      { key: 'phoneNum', label: 'Phone Number', value: phoneNum, optional: false },
      { key: 'password', label: 'Password', value: password, condition: !user },
      { key: 'orgName', label: 'Organization name', value: orgName },
    ];

    const errors = validateForm(fields);

    setErrors(errors);

    const accessToken = localStorage.getItem('jwtAccessToken');

    const requestData = {
      firstName,
      lastName,
      NIC: nic,
      email,
      phoneNum,
      orgName,
      isDisabled,
    };

    if (!user) {
      requestData.password = password;
    }

    if (Object.keys(errors).length === 0) {
      const apiEndpoint = user
        ? `${process.env.REACT_APP_BASE_URL}/user/${user._id}`
        : `${process.env.REACT_APP_BASE_URL}/user`;

      const method = user ? 'put' : 'post';

      axios[method](apiEndpoint, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(() => {
          setMessage(user ? 'User details updated successfully' : 'User registered successfully');
          setIsAlertVisible(true);
          if (!user) {
            resetForm();
          }
        })
        .catch((error) => {
          setMessage(identifyError(error.response?.data?.code));
          setIsAlertVisible(true);
        });
    }
  };

  if (!visible) return null;

  return (
    <div className='flex flex-col px-16 sm:px-28 md:px-36 py-10 md:py-10 bg-white dark:bg-secondary-dark-bg shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 rounded-lg'>
      <div className='mb-5 lg:mb-10'>
        <button
          className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
          onClick={onClose}>
          <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
        </button>
        <h1 className='text-lg text-center text-black dark:text-white tracking-widest'>
          {user ? t('UPDATE USER DETAILS') : t('NEW USER REGISTARTION')}
        </h1>
      </div>
      <form className='grid lg:grid-cols-2 sm:gap-5 md:gap-10 lg:gap-12 w-full px-5'>
        <TextBox
          placeholder='Eg. Saman'
          label='First Name'
          type='text'
          error={errors.firstName}
          Icon={UserIcon}
          value={firstName}
          setValue={setFirstName}
        />

        <TextBox
          placeholder='Eg. Kumra'
          label='Last Name'
          type='text'
          error={errors.lastName}
          Icon={UserIcon}
          value={lastName}
          setValue={setLastName}
        />

        <TextBox
          placeholder='Eg. 9452XXXXXV'
          label='NIC'
          error={errors.nic}
          Icon={UserIcon}
          value={nic}
          setValue={setNic}
        />

        <TextBox
          placeholder='Eg. 076XXXXXXX'
          label='Phone Number'
          type='text'
          error={errors.phoneNum}
          Icon={PhoneIcon}
          value={phoneNum}
          setValue={setPhoneNum}
        />

        <TextBox
          placeholder='Eg. sample@gmail.com'
          label='Email Address'
          type='text'
          error={errors.email}
          Icon={EnvelopeIcon}
          value={email}
          setValue={setEmail}
        />

        {!user && (
          <TextBox
            placeholder='************'
            label='Password'
            type='password'
            error={errors.password}
            Icon={LockClosedIcon}
            value={password}
            setValue={setPassword}
          />
        )}

        <TextBox
          placeholder='Eg. ABC Org.'
          label='Organization Name'
          type='text'
          error={errors.orgName}
          Icon={HomeIcon}
          value={orgName}
          setValue={setOrgName}
        />

        <div>
          {user && (
            <div className='flex flex-row items-center gap-4'>
              <div className='text-gray-400'>{user.isDisabled ? t('Enabled user') : t('Disabled user')} :</div>
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
      </form>
      <div className='flex flex-row justify-end item-center px-6'>
        <div className='flex justify-end item-center gap-2 md:gap-5 mt-3'>
          <PrimaryButton bgEffect='bg-red-500 border-red-600' size='w-24' text='Clear' onClick={resetForm} />
          <PrimaryButton
            bgEffect='bg-blue-500 border-blue-600'
            text={user ? 'Update' : 'Submit'}
            onClick={handleSubmit}
          />
        </div>
        <AlertBox
          visible={isAlertVisible}
          message={`${message}`}
          onClose={() => {
            setIsAlertVisible(false);
          }}
        />
      </div>
    </div>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Form;
