import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import { LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { encryptData } from 'utils/rsa.encrypt';
import { generateRandomPassword } from 'pages/dashboard/utils/generateRandomPassword';
import { useTranslation } from 'react-i18next';
import { validateForm } from 'pages/dashboard/utils/userFormValidation';
import useAxios from 'hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const ResetForm = ({ onClose, user = null, formSubmission }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  const handleFormErrors = () => {
    const fields = [
      { key: 'firstName', label: 'First name', value: firstName },
      { key: 'lastName', label: 'Last name', value: lastName },
      { key: 'nic', label: 'NIC', value: nic },
      { key: 'email', label: 'Email', value: email },
      { key: 'phoneNum', label: 'Phone Number', value: phoneNum, optional: false },
      { key: 'password', label: 'Password', value: password, condition: !user },
      { key: 'orgName', label: 'Organization name', value: orgName },
    ];

    const formErrors = validateForm(fields);
    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (e) => {
    if (Object.keys(handleFormErrors()).length === 0) {
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
        requestData.password = await encryptData(password);
      }

      const response = await send({
        endpoint: user ? `user/${user._id}` : `user`,
        method: user ? 'PUT' : 'POST',
        body: requestData,
      });

      if (response) {
        formSubmission(user ? 'User details updated successfully' : 'User registered successfully');
        onClose();
      }
    }
  };

  return (
    <div className='flex flex-col p-4 gap-4 min-h-full w-full shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg'>
      <div>
        <button
          className='prevbutton flex justify-start bg-red-500 hover:brightness-110 rounded-lg transition-transform'
          onClick={() => {
            console.log('Clicked');
            navigate('/profile');
          }}>
          <ArrowLeftIcon className='text-white w-6 h-6 mx-4 my-2 transform hover:-translate-x-2 duration-300' />
        </button>
      </div>
      <div className='text-center text-gray-700 dark:text-white'>
        <h1 className='text-base text-center '>RESET PASSWORD</h1>
        <p>TEMPORARY PASSWORD HAS BEEN SENT TO YOUR EMAIL</p>
      </div>
      <form
        className={`grid space-y-4 w-full px-12 sm:px-24 md:px-44 lg:px-40 lg:grid-cols-2 lg:space-y-0 lg:gap-x-24 ${
          user ? 'lg:gap-y-12' : 'lg:gap-y-6'
        }`}>
        <TextBox
          placeholder='Enter Temporary Password'
          label='Temporary Password'
          type='password'
          error={errors.nic}
          Icon={LockClosedIcon}
          value={nic}
          setValue={setNic}
        />

        <TextBox
          placeholder='Enter New Password'
          label='New Password'
          type='password'
          error={errors.phoneNum}
          Icon={LockClosedIcon}
          value={phoneNum}
          setValue={setPhoneNum}
        />

        <TextBox
          placeholder='Enter New Password Again'
          label='Confirm Password'
          type='password'
          error={errors.email}
          Icon={LockClosedIcon}
          value={email}
          setValue={setEmail}
        />
      </form>
      <div className='flex justify-end gap-2 px-12 sm:px-24 md:px-44 lg:px-40'>
        {!user && <PrimaryButton bgEffect='bg-red-500 border-red-600' size='w-24' text='Clear' onClick={resetForm} />}
        <PrimaryButton
          bgEffect='bg-blue-500 border-blue-600'
          text={user ? 'Update' : 'Submit'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

ResetForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  formSubmission: PropTypes.func.isRequired,
};

export default ResetForm;
