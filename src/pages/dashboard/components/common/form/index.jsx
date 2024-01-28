import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../base/Button';
import TextBox from '../../base/TextBox';
import Dropdown from '../../base/Dropdown';

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
    <div className='flex flex-col p-4'>
      <form className='grid grid-colos-1 md:grid-cols-2 gap-2 md:ga=-4 w-full'>
        <TextBox placeholder='First Name' type='text' value={firstName} setValue={setfirstName} />
        <TextBox placeholder='Last Name' type='text' value={lastName} setValue={setLastName} />
        <TextBox placeholder='NIC' type='text' value={nic} setValue={setNic} />
        <TextBox placeholder='Email Address' type='text' value={email} setValue={setEmail} />
        <TextBox placeholder='Phone Number' type='text' value={phoneNum} setValue={setPhoneNum} />
        <TextBox placeholder='Password' type='text' value={password} setValue={setPassword} />
        <Dropdown value={userType} setValue={setUserType} />
        <TextBox placeholder='Organization Name' type='text' value={orgName} setValue={setOrgName} />
      </form>
      <div className='flex justify-end gap-2 mt-2 md:mt-5'>
        <Button bgColor='bg-red-600' text='Cancel' onClick={onClose} />
        <Button bgColor='bg-blue-600' text='Submit' onClick={handleSubmit} />
      </div>
    </div>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Form;
