import React, { useState } from 'react';
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

const Form = ({ visible, onClose }) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [userType, setUserType] = useState('farmer');

  const handleSubmit = () => {
    // TO DO: handle form submission
  };

  if (!visible) return null;

  return (
    <div className='flex flex-col p-5 md:px-10 lg:py-10 bg-white dark:bg-secondary-dark-bg shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 rounded-lg max-h-screen'>
      <form className='grid grid-colos-1 lg:grid-cols-2 gap-4 lg:gap-16 w-full'>
        <TextBox
          placeholder='Enter first name'
          label='First Name'
          type='text'
          Icon={UserIcon}
          value={firstName}
          setValue={setfirstName}
        />
        <TextBox
          placeholder='Enter last name'
          label='Last Name'
          type='text'
          Icon={UserIcon}
          value={lastName}
          setValue={setLastName}
        />
        <TextBox placeholder='Enter nic number' label='NIC' Icon={UserIcon} value={nic} setValue={setNic} />
        <TextBox
          placeholder='Enter email address'
          label='Email Address'
          type='text'
          Icon={EnvelopeIcon}
          value={email}
          setValue={setEmail}
        />
        <TextBox
          placeholder='Enter phone number'
          label='Phone Number'
          type='text'
          Icon={PhoneIcon}
          value={phoneNum}
          setValue={setPhoneNum}
        />
        <TextBox
          placeholder='Enter password'
          label='Password'
          type='password'
          Icon={LockClosedIcon}
          value={password}
          setValue={setPassword}
        />
        <Dropdown
          label='User Type'
          Icon={UserGroupIcon}
          options={['Farmer', 'Admin']}
          value={userType}
          setValue={setUserType}
        />
        <TextBox
          placeholder='Enter organization name'
          label='Organization Name'
          type='text'
          Icon={HomeIcon}
          value={orgName}
          setValue={setOrgName}
        />
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
    </div>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Form;
