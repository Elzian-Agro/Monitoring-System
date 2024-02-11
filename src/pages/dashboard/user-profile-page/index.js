import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setUserData } from '../slice/userSlice';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import { identifyError } from 'pages/auth/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from 'assets/images/avatar.png';
import Modal from 'components/common/modal';
import useAxios from 'hooks/useAxios';
import { updateEmail } from 'pages/auth/slice/emailSlice';
import UpdateProfileForm from '../components/common/update-profile-form';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const { send } = useAxios();

  //Capitalize the text
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const email = useSelector((state) => state.user.email);
  const nic = useSelector((state) => state.user.nic);
  const phoneNumber = useSelector((state) => state.user.phoneNum);
  const userType = useSelector((state) => capitalize(state.user.userType));
  const organizationName = useSelector((state) => state.user.orgName);
  const userId = useSelector((state) => state.user._id);
  const userBio = useSelector((state) => state.user.userBio);
  const profileImage = useSelector((state) => state.user.profileImage);
  const address = useSelector((state) => state.user.address);
  const [localProfilePicture, setLocalProfilePicture] = useState(profileImage);

  const user = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    bio: userBio,
    address: address,
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

      // Make Axios PUT request to the specified endpoint
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

  const formSubmission = async (message) => {
    setMessage(message);
    setIsAlertVisible(true);
  };

  const handlePhotoEditButtonClick = () => {
    setPhotoEditMode(true);
  };

  //Disable
  const confirmDialogCloseDisable = (result) => {
    if (result) {
      handleDisable();
    }
    setIsConfirmVisible(false);
  };

  const confirmDialogCloseReset = (result) => {
    if (result) {
      handleResetPassword();
    }
    setIsResetConfirmVisible(false);
  };

  const handleDisable = async () => {
    setIsAlertVisible(true);
    try {
      const { jwtAccessToken: accessToken } = localStorage;
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/disable/${userId}`,
        { isDisabled: true },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(t('Disabled successfully'));
      setIsAlertVisible(true);

      //Removed locally sotored user data
      localStorage.removeItem('jwtAccessToken');
      localStorage.removeItem('jwtRefreshToken');
      dispatch(clearUserData());
    } catch (error) {
      setMessage(identifyError(error.response?.data?.code));
      setIsAlertVisible(true);
    }
  };

  const handleResetPassword = async () => {
    dispatch(updateEmail(email));

    await send({
      endpoint: 'auth/forget-password',
      method: 'POST',
      body: {
        email: email,
      },
    });

    navigate('/reset');
  };

  return (
    <div className='mt-8 mx-4'>
      {isFormVisible ? (
        <UpdateProfileForm
          onClose={() => {
            setIsFormVisible(false);
          }}
          visible={isFormVisible}
          user={user}
          formSubmission={formSubmission}
        />
      ) : (
        <div className='bg-white dark:bg-gray-800 p-8 rounded shadow-md'>
          <div className='flex justify-center mb-4'>
            {photoEditMode ? (
              <div className='flex items-center justify-center'>
                <input type='file' accept='image/*' onChange={handleProfilePictureChange} />
                <p className='text-xs text-gray-500 pr-4'>
                  Images should be JPG or PNG,
                  <br /> size should be below 5MB.
                </p>
              </div>
            ) : (
              <img src={profileImage || avatar} alt='Profile' className='w-24 h-24 rounded-full object-cover' />
            )}

            <div className='flex items-end'>
              {photoEditMode ? (
                <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleSaveButtonClick}>
                  <CheckIcon className='h-6 w-6 text-black dark:text-white' />
                </button>
              ) : (
                <button className='bg-blue-500 text-white rounded p-1' onClick={handlePhotoEditButtonClick}>
                  <PencilSquareIcon className='h-5 w-5 text-black dark:text-white' />
                </button>
              )}
            </div>
          </div>

          <div className='bio max-w-[50rem] mx-auto text-center mb-6'>
            <p className='text-gray-800 dark:text-white mb-2'>{userBio}</p>
          </div>

          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400 w-24'>{t('First Name:')}</label>
              <p className='text-gray-800 dark:text-white'>{firstName}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('Last Name:')}</label>
              <p className='text-gray-800 dark:text-white'>{lastName}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('Organization Name:')}</label>
              <p className='text-gray-800 dark:text-white'>{organizationName}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('Email')}:</label>
              <p className='text-gray-800 dark:text-white'>{email}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>
                {t('National Identity Card Number (NIC):')}
              </label>
              <p className='text-gray-800 dark:text-white'>{nic}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('Phone Number:')}</label>
              <p className='text-gray-800 dark:text-white'>{phoneNumber}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('Address')}</label>
              <p className='text-gray-800 dark:text-white'>{address}</p>
            </div>

            <div className='flex mb-8 gap-4'>
              <label className='block text-gray-600 dark:text-gray-400'>{t('User Type:')}</label>
              <p className='text-gray-800 dark:text-white'>{userType}</p>
            </div>
          </div>

          <div className='flex flex-row justify-between'>
            <button
              className='bg-green-500 text-black dark:text-white rounded px-4 py-2 mr-2'
              onClick={() => {
                setIsFormVisible(true);
              }}>
              {t('Edit')}
            </button>

            <div className='flex flex-row'>
              <button
                className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'
                onClick={() => {
                  setIsResetConfirmVisible(true);
                }}>
                {t('Reset Password')}
              </button>

              <button
                className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'
                onClick={() => {
                  setIsConfirmVisible(true);
                }}>
                {t('Disable')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* confirm Popups */}
      {/* Disable confirmation */}
      <Modal
        isOpen={isConfirmVisible}
        message={t('Are you sure you want to disable this account?')}
        onClose={(result) => confirmDialogCloseDisable(result)}
        type='confirmation'
      />

      {/* Reset Password confirmation */}
      <Modal
        isOpen={isResetConfirmVisible}
        message={t('Do you want to reset the password?')}
        onClose={confirmDialogCloseReset}
        type='confirmation'
      />
      {/* Alert message Popup */}
      <Modal
        isOpen={isAlertVisible}
        message={`${message}!`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />
    </div>
  );
};

export default UserProfilePage;
