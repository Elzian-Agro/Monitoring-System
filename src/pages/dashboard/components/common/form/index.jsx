import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../base/Button';
import { ToggleButton } from '../../base/Button';
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
import { authRegex } from 'constant';

const Form = ({ visible, onClose, user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); //check
  const [orgName, setOrgName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = '*First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = '*Last name is required';
    }

    if (!nic.trim()) {
      newErrors.nic = '*NIC is required';
    }

    if (!email.trim()) {
      newErrors.email = '*Email is required';
    } else if (!authRegex.email.test(email)) {
      newErrors.email = '*Email is not valid';
    }

    if (!user) {
      if (!password.trim()) {
        newErrors.password = '*Password is required';
      }
    }

    if (!orgName.trim()) {
      newErrors.orgName = '*Organization name is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setNic('');
    setEmail('');
    setPhoneNum('');
    setPassword(generateRandomPassword());
    setOrgName('');
    setErrors({});
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (validateForm()) {
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
          resetForm();
          setMessage(user ? 'Farmer details updated successfully!' : 'Farmer registered successfully!');
          setIsAlertVisible(true);
        })
        .catch((error) => {
          setMessage(identifyError(error.response?.data?.code));
          setIsAlertVisible(true);
        });
    }
  };

  if (!visible) return null;

  return (
    <div className='relative flex flex-col px-10 py-4 lg:py-8 bg-white dark:bg-secondary-dark-bg shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 rounded-lg max-h-screen'>
      <button
        className='absolute left-0 top-0 bg-red-500 hover:bg-red-600 self-end rounded-br rounded-tl'
        onClick={onClose}>
        <ArrowLeftIcon className='text-white w-8 h-8' />
      </button>
      <h1 className='font-serif font-medium text-lg mb-10 text-center text-black dark:text-white tracking-widest'>
        {user ? 'UPDATE FARMER DETAILS' : 'NEW FARMER REGISTARTION'}
      </h1>
      <form className='grid grid-colos-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full'>
        <div>
          <TextBox
            placeholder='Eg. Saman'
            label='First Name'
            type='text'
            Icon={UserIcon}
            value={firstName}
            setValue={setFirstName}
          />
          {errors.firstName && <div className='text-red-500 text-sm'>{errors.firstName}</div>}
        </div>

        <div>
          <TextBox
            placeholder='Eg. Kumra'
            label='Last Name'
            type='text'
            Icon={UserIcon}
            value={lastName}
            setValue={setLastName}
          />
          {errors.lastName && <div className='text-red-500 text-sm'>{errors.lastName}</div>}
        </div>

        <div>
          <TextBox placeholder='Eg. 945214789V' label='NIC' Icon={UserIcon} value={nic} setValue={setNic} />
          {errors.nic && <div className='text-red-500 text-sm'>{errors.nic}</div>}
        </div>

        <div>
          <TextBox
            placeholder='Eg. 076-9011456'
            label='Phone Number'
            type='text'
            Icon={PhoneIcon}
            value={phoneNum}
            setValue={setPhoneNum}
          />
        </div>

        <div>
          <TextBox
            placeholder='Eg. saman@gmail.com'
            label='Email Address'
            type='text'
            Icon={EnvelopeIcon}
            value={email}
            setValue={setEmail}
          />
          {errors.email && <div className='text-red-500 text-sm'>{errors.email}</div>}
        </div>

        {!user ? (
          <div>
            <TextBox
              placeholder='************'
              label='Password'
              type='password'
              Icon={LockClosedIcon}
              value={password}
              setValue={setPassword}
            />
            {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
          </div>
        ) : (
          ''
        )}

        <div>
          <TextBox
            placeholder='Eg. ABC Org.'
            label='Organization Name'
            type='text'
            Icon={HomeIcon}
            value={orgName}
            setValue={setOrgName}
          />
          {errors.orgName && <div className='text-red-500 text-sm'>{errors.orgName}</div>}
        </div>
      </form>
      <div className='flex flex-row justify-between item-center pt-4'>
        <div>
          {user ? (
            <div className='flex flex-row items-center gap-4'>
              <div className='text-gray-400'>{user.isDisabled ? 'Enabled' : 'Disabled'} :</div>
              <ToggleButton
                value={isToggleClicked}
                onChange={() => {
                  setIsToggleClicked(!isToggleClicked);
                  setIsDisabled(!isDisabled);
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='flex justify-end item-center gap-2 md:gap-5 mt-3 lg:mt-10'>
          <PrimaryButton
            bgEffect='bg-red-500 border-red-600'
            size='md:py-2 md:px-4 md:text-lg'
            text='Clear'
            onClick={resetForm}
          />
          <PrimaryButton
            bgEffect='bg-blue-500 border-blue-600'
            size='md:py-2 md:px-4 md:text-base'
            text={user ? 'Update' : 'Submit'}
            onClick={handleSubmit}
          />
        </div>
        <AlertBox
          visible={isAlertVisible}
          message={`${message}!`}
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
};

export default Form;
