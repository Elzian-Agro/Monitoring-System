import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import Dropdown from '../../base/Dropdown';
import {
  EnvelopeIcon,
  HomeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { identifyError } from 'pages/auth/utils';
import AlertBox from '../alert-box';
import axios from 'axios';

const Form = ({ visible, onClose, user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    // Set form fields for edit mode
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setNic(user.NIC || '');
      setEmail(user.email || '');
      setPhoneNum(user.phoneNum || '');
      setOrgName(user.orgName || '');
      setUserType(user.userType || '');
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
    }

    if (!password.trim()) {
      newErrors.password = '*Password is required';
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
    setPassword('');
    setOrgName('');
    setUserType('farmer');
    setErrors({});
    setMessage(null);
    setIsAlertVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('jwtAccessToken');

    if (validateForm()) {
      const apiEndpoint = user
        ? `${process.env.REACT_APP_BASE_URL}/user/${user._id}`
        : `${process.env.REACT_APP_BASE_URL}/user`;

      const method = user ? 'put' : 'post';

      axios[method](
        apiEndpoint,
        {
          firstName,
          lastName,
          NIC: nic,
          email,
          phoneNum,
          password,
          orgName,
          userType,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(() => {
          resetForm();
          setMessage(user ? 'User updated successfully!' : 'User created successfully!');
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
    <div className='flex flex-col px-10 py-4 lg:py-8 bg-white dark:bg-secondary-dark-bg shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 rounded-lg max-h-screen'>
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

        <div>
          <TextBox
            placeholder=''
            label='Password'
            type='password'
            Icon={LockClosedIcon}
            value={password}
            setValue={setPassword}
          />
          {errors.password && <div className='text-red-500 text-sm'>{errors.password}</div>}
        </div>

        <div>
          <Dropdown
            label='Eg. User Type'
            Icon={UserGroupIcon}
            options={['farmer', 'admin']}
            value={userType}
            setValue={setUserType}
          />
          {errors.userType && <div className='text-red-500 text-sm'>{errors.userType}</div>}
        </div>

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
      <div className='flex justify-end item-center gap-2 md:gap-5 mt-3 lg:mt-10'>
        <PrimaryButton
          bgEffect='bg-red-500 border-red-600'
          size='md:py-2 md:px-4 md:text-lg'
          text='Cancel'
          onClick={onClose}
        />
        <PrimaryButton
          bgEffect='bg-blue-500 border-blue-600'
          size='md:py-2 md:px-4 md:text-base'
          text='Submit'
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
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Form;
