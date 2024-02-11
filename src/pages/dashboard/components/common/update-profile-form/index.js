import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../base/Button';
import TextBox from '../../base/TextBox';
import {
  HomeIcon,
  PhoneIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  PencilSquareIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { validateForm } from 'pages/dashboard/utils/userFormValidation';
import useAxios from 'hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from 'pages/dashboard/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { updateEmail } from 'pages/auth/slice/emailSlice';
import Modal from 'components/common/modal';
import avatar from 'assets/images/avatar.png';

const UpdateProfileForm = ({ visible, onClose, user = null, formSubmission }) => {
  const dispatch = useDispatch();
  const [userBio, setUserBio] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
  const profileImage = useSelector((state) => state.user.profileImage);
  const [localProfilePicture, setLocalProfilePicture] = useState('');
  const navigate = useNavigate();
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

  const confirmDialogCloseReset = (result) => {
    if (result) {
      handleResetPassword();
    }
    setIsResetConfirmVisible(false);
  };

  const handleResetPassword = async () => {
    dispatch(updateEmail(user.email));

    await send({
      endpoint: 'auth/forget-password',
      method: 'POST',
      body: {
        email: user.email,
      },
    });

    navigate('/reset');
  };

  const handleProfilePictureChange = (event) => {
    // Handle updating the profile picture when a new image is selected
    const newProfilePicture = event.target.files[0];
    setLocalProfilePicture(newProfilePicture);
  };

  const handleSaveButtonClick = async () => {
    if (localProfilePicture) {
      // Use FormData to append the file and other data
      const formData = new FormData();
      formData.append('profile-image', localProfilePicture);

      await send({
        endpoint: 'user/profile/image',
        method: 'PUT',
        body: formData,
        requestHeaders: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Dispatch the updated profile image URL to Redux store
      dispatch(setUserData({ profileImage: URL.createObjectURL(localProfilePicture) }));

      // Toggle back to view mode
      setPhotoEditMode(false);
    }
  };

  const handlePhotoEditButtonClick = () => {
    setPhotoEditMode(true);
  };

  if (!visible) return null;

  return (
    <div className='flex flex-col px-4 py-4 gap-4 min-h-full w-full shadow-lg bg-white dark:bg-gray-800 rounded-lg'>
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
      <div className='flex justify-center mb-4'>
        {photoEditMode ? (
          <div className='flex items-center justify-center'>
            <input type='file' accept='image/*' onChange={handleProfilePictureChange} />
            <p className='text-xs text-gray-500 px-4'>
              Images should be JPG or PNG,
              <br /> size should be below 5MB.
            </p>
          </div>
        ) : (
          <img src={profileImage || avatar} alt='Profile' className='w-24 h-24 rounded-full object-cover' />
        )}

        <div className='flex items-end'>
          {photoEditMode ? (
            <button
              className={`rounded px-4 py-2 ${
                !localProfilePicture ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
              onClick={handleSaveButtonClick}
              disabled={!localProfilePicture}>
              <CheckIcon className='h-6 w-6 text-black dark:text-white' />
            </button>
          ) : (
            <button className='bg-blue-500 text-white rounded p-1' onClick={handlePhotoEditButtonClick}>
              <PencilSquareIcon className='h-5 w-5 text-black dark:text-white' />
            </button>
          )}
        </div>
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
      <div className='flex justify-between mt-20 px-12 sm:px-24 md:px-44 lg:px-40'>
        <button
          className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'
          onClick={() => {
            setIsResetConfirmVisible(true);
          }}>
          {t('Reset Password')}
        </button>
        <PrimaryButton color='bg-blue-500 border-blue-600' text={'Update'} onClick={handleSubmit} />
      </div>

      {/* Reset Password confirmation */}
      <Modal
        isOpen={isResetConfirmVisible}
        message={t('Do you want to reset the password?')}
        onClose={confirmDialogCloseReset}
        type='confirmation'
      />
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
