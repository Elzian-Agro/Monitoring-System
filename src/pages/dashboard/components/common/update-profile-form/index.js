import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import { HomeIcon, PhoneIcon, ArrowLeftIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { validateForm } from 'pages/dashboard/utils/userFormValidation';
import useAxios from 'hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setUserData } from 'pages/dashboard/slice/userSlice';

const UpdateProfileForm = ({ visible, onClose, user = null, formSubmission }) => {
  const dispatch = useDispatch();
  const [userBio, setUserBio] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();
  const { send } = useAxios();

  useEffect(() => {
    // Set form fields for edit mode
    if (user) {
      setUserBio(user.bio);
      setPhoneNum(user.phoneNumber);
      setAddress(user.address);
    }
  }, [user]);

  const handleFormErrors = () => {
    const fields = [{ key: 'phoneNum', label: 'Phone Number', value: phoneNum, optional: false }];

    const formErrors = validateForm(fields);
    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (e) => {
    if (Object.keys(handleFormErrors()).length === 0) {
      const requestData = {
        userBio,
        phoneNum,
        address,
      };

      const response = await send({
        endpoint: 'user/profile',
        method: 'PUT',
        body: requestData,
      });

      if (response) {
        //Change updated details in the redux
        dispatch(setUserData({ userBio: userBio }));
        dispatch(setUserData({ address: address }));
        dispatch(setUserData({ phoneNum: phoneNum }));

        formSubmission('User details updated successfully');
        onClose();
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
        <h1 className='text-base text-center text-gray-700 dark:text-white'>{t('UPDATE YOUR DETAILS HERE')}</h1>
      </div>
      <form
        className={
          'grid space-y-4 w-full px-12 sm:px-24 md:px-44 lg:px-40 lg:grid-cols-2 lg:space-y-0 lg:gap-x-24 lg:gap-y-12'
        }>
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
          placeholder='Eg. Your New Bio'
          label='Bio'
          type='text'
          Icon={IdentificationIcon}
          value={userBio}
          setValue={setUserBio}
        />

        <TextBox
          placeholder='Eg. Your Address'
          label='Address'
          type='text'
          Icon={HomeIcon}
          value={address}
          setValue={setAddress}
        />
      </form>
      <div className='flex justify-end gap-2 px-12 sm:px-24 md:px-44 lg:px-40'>
        <PrimaryButton color='bg-blue-500 border-blue-600' text={'Update'} onClick={handleSubmit} />
      </div>
    </div>
  );
};

UpdateProfileForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  formSubmission: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
