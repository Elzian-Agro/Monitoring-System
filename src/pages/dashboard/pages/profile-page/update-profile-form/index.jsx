import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../../components/base/Button';
import TextBox from '../../../components/base/TextBox';
import {
  HomeIcon,
  PhoneIcon,
  ArrowLeftIcon,
  IdentificationIcon,
  PencilSquareIcon,
  CheckIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import useAxios from 'hooks/useAxios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateEmail } from 'pages/auth/slice/emailSlice';
import { setUserData } from 'pages/dashboard/slice/userSlice';
import Modal from 'components/common/modal';
import avatar from 'assets/images/avatar.png';
import Loader from '../../../components/common/loader';
import { patterns } from 'constant';

const UpdateProfileForm = ({ visible, onClose, user = null, formSubmission }) => {
  const [userBio, setUserBio] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
  const [localProfilePicture, setLocalProfilePicture] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { send, loading } = useAxios();

  useEffect(() => {
    // Set form fields for edit mode
    if (user) {
      setUserBio(user.userBio);
      setPhoneNum(user.phoneNum);
      setAddress(user.address);
      setFacebook(user.socialMedia?.facebook);
      setLinkedIn(user.socialMedia?.linkedIn);
      setYoutube(user.socialMedia?.youtube);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      userBio,
      phoneNum,
      address,
      socialMedia: {
        facebook: facebook,
        linkedIn: linkedIn,
        youtube: youtube,
      },
    };

    const response = await send({
      endpoint: 'user/profile',
      method: 'PUT',
      body: requestData,
    });

    if (response) {
      formSubmission('User details updated successfully');
      onClose();
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
      dispatch(setUserData({ profileImage: `${user.profileImage}?timestamp=${new Date().getTime()}` }));

      // Toggle back to view mode
      setPhotoEditMode(false);
    }
  };

  return (
    <>
      {!visible && null}

      {loading && <Loader />}

      {!loading && (
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
              <img
                src={
                  localProfilePicture
                    ? URL.createObjectURL(localProfilePicture)
                    : `${user.profileImage || avatar}?timestamp=${new Date().getTime()}`
                }
                alt='Profile'
                className='w-24 h-24 rounded-full object-cover'
              />
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
                <button className='bg-blue-500 text-white rounded p-1' onClick={() => setPhotoEditMode(true)}>
                  <PencilSquareIcon className='h-5 w-5 text-black dark:text-white' />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-center'>
              <div className='grid lg:grid-cols-2 space-y-4 lg:space-y-0 w-full justify-center lg:gap-x-20 lg:px-24 xl:px-48 lg:gap-y-6'>
                <TextBox
                  placeholder='Eg. 076XXXXXXX'
                  label='Phone Number'
                  type='text'
                  Icon={PhoneIcon}
                  value={phoneNum.toString()}
                  setValue={setPhoneNum}
                  required={true}
                  pattern={patterns.phoneNum}
                  title='Enter a valid phone number'
                />

                <TextBox
                  placeholder='Eg. Your Bio'
                  label='Bio'
                  type='text'
                  Icon={IdentificationIcon}
                  value={userBio}
                  setValue={setUserBio}
                />

                <TextBox
                  placeholder='Eg. 232, Main Street, Negombo, LK.'
                  label='Address'
                  type='text'
                  Icon={HomeIcon}
                  value={address}
                  setValue={setAddress}
                  required={true}
                />

                <TextBox
                  placeholder='Add your facebook link here'
                  label='Facebook'
                  type='text'
                  Icon={LinkIcon}
                  value={facebook}
                  setValue={setFacebook}
                />

                <TextBox
                  placeholder='Add your linkedIn link here'
                  label='LinkedIn'
                  type='text'
                  Icon={LinkIcon}
                  value={linkedIn}
                  setValue={setLinkedIn}
                />

                <TextBox
                  placeholder='Add your youtube link here'
                  label='Youtube'
                  type='text'
                  Icon={LinkIcon}
                  value={youtube}
                  setValue={setYoutube}
                />
              </div>
              <div className='flex justify-center mt-5'>
                <div className='flex justify-end gap-2 w-60 sm:w-64 md:w-80 lg:w-full lg:px-24 xl:px-48'>
                  <PrimaryButton
                    type='button'
                    color='bg-red-500 border-red-600'
                    text={'Reset Password'}
                    onClick={() => setIsResetConfirmVisible(true)}
                  />
                  <PrimaryButton type='submit' color='bg-blue-500 border-blue-600' text={'Update'} />
                </div>
              </div>
            </div>
          </form>

          {/* Reset Password confirmation */}
          <Modal
            isOpen={isResetConfirmVisible}
            message={t('Do you want to reset the password?')}
            onClose={confirmDialogCloseReset}
            type='confirmation'
          />
        </div>
      )}
    </>
  );
};

UpdateProfileForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  formSubmission: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
