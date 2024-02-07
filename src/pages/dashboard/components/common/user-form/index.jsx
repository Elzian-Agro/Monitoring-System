import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton, ToggleButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import {
  EnvelopeIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { encryptData } from 'utils/rsa.encrypt';
import { generateRandomPassword } from 'pages/dashboard/utils/generateRandomPassword';
import { useTranslation } from 'react-i18next';
import { validateForm } from 'pages/dashboard/utils/userFormValidation';
import Modal from 'components/common/modal';
import useAxios from 'hooks/useAxios';

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
  const { send } = useAxios();

  useEffect(() => {
    // Set form fields for edit mode
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setNic(user.nic);
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

    const requestData = {
      firstName,
      lastName,
      nic,
      email,
      phoneNum,
      orgName,
      isDisabled,
    };

    if (!user) {
      try {
        const encryptedPassword = await encryptData(password);
        requestData.password = encryptedPassword;
      } catch (err) {
        throw err;
      }
    }

    if (Object.keys(errors).length === 0) {
      const response = await send({
        endpoint: user ? `user/${user._id}` : `user`,
        method: user ? 'PUT' : 'POST',
        body: requestData,
      });

      if (response) {
        setMessage(user ? 'User details updated successfully' : 'User registered successfully');
        setIsAlertVisible(true);
        if (!user) {
          resetForm();
        }
      }
    }
  };

  if (!visible) return null;

  return (
    <div className='flex flex-col px-4 py-4 gap-4 min-h-full w-full shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
      <div>
        <button
          className='flex justify-start bg-red-500 hover:brightness-110 self-end rounded-lg transition-transform'
          onClick={onClose}>
          <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
        </button>
      </div>
      <div>
        <h1 className='text-base text-center text-gray-700 dark:text-white'>
          {user ? t('UPDATE USER DETAILS') : t('NEW USER REGISTARTION')}
        </h1>
      </div>
      <form
        className={`grid space-y-4 w-full px-12 sm:px-24 md:px-44 lg:px-40 lg:grid-cols-2 lg:space-y-0 lg:gap-x-24 ${
          user ? 'lg:gap-y-12' : 'lg:gap-y-6'
        }`}>
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
          disabled={user ? true : false}
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
            disabled={true}
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
      </form>
      <div className='flex justify-end gap-2 px-12 sm:px-24 md:px-44 lg:px-40'>
        {!user && <PrimaryButton bgEffect='bg-red-500 border-red-600' size='w-24' text='Clear' onClick={resetForm} />}
        <PrimaryButton
          bgEffect='bg-blue-500 border-blue-600'
          text={user ? 'Update' : 'Submit'}
          onClick={handleSubmit}
        />
      </div>
      <Modal
        isOpen={isAlertVisible}
        message={`${message}`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />
    </div>
  );
};

Form.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Form;
