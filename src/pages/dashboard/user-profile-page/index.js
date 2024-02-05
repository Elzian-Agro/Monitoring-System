import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slice/userSlice';
import { PencilSquareIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { identifyError } from 'pages/auth/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatar from 'assets/images/avatar.png';
import Modal from 'components/common/modal';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [addressEditMode, setAddressEditMode] = useState(false);
  const [phoneEditMode, setPhoneEditMode] = useState(false);
  const [bioEditMode, setBioEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newPhoneNumber, SetNewPhoneNUmber] = useState('');
  const [bio, setbio] = useState('');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem('jwtAccessToken');

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

  const handleProfilePictureChange = (event) => {
    // Handle updating the profile picture when a new image is selected
    const newProfilePicture = event.target.files[0];
    setLocalProfilePicture(newProfilePicture);
  };

  const handleSaveButtonClick = async () => {
    if (localProfilePicture) {
      try {
        // Dispatch the updated profile image URL to Redux store
        dispatch(setUserData({ profileImage: URL.createObjectURL(localProfilePicture) }));

        // Use FormData to append the file and other data
        const formData = new FormData();
        formData.append('profile-image', localProfilePicture);

        // Make Axios PUT request to the specified endpoint
        await axios.put(`${process.env.REACT_APP_BASE_URL}/user/profile/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
      // Toggle back to view mode
      setPhotoEditMode(false);
    }
  };

  //Bio
  const handleBioClick = () => {
    setBioEditMode(true);
  };

  const handleBioSave = async () => {
    try {
      // Update user data in Redux store
      dispatch(setUserData({ userBio: bio }));

      // Make Axios PUT request to update the bio
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { userBio: bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Close the bio edit mode and reset the local state for bio
      setBioEditMode(false);
      setbio('');
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  //Adress
  const handleAddressClick = () => {
    setAddressEditMode(true);
  };

  const handleAddressSave = async () => {
    try {
      // Update user data in Redux store
      dispatch(setUserData({ address: newAddress }));

      // Make Axios PUT request to update the address
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Close the address edit mode and reset the local state for newAddress
      setAddressEditMode(false);
      setNewAddress('');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  //Phone Numebr
  const handlePhoneClick = () => {
    setPhoneEditMode(true);
  };

  const handlePhoneSave = async () => {
    try {
      // Update user data in Redux store
      dispatch(setUserData({ phoneNum: newPhoneNumber }));
      // Make Axios PUT request to update the address
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { phoneNum: newPhoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Close the phone edit mode and reset the local state for newphonenumber
      setPhoneEditMode(false);
      SetNewPhoneNUmber('');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handlePhotoEditButtonClick = () => {
    setPhotoEditMode(true);
  };

  //Disable
  const confirmDialogClose = (result) => {
    if (result) {
      handleDisable();
    }
    setIsConfirmVisible(false);
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
      setMessage('Disabled successfully!');
      setIsAlertVisible(true);
    } catch (error) {
      setMessage(identifyError(error.response?.data?.code));
      setIsAlertVisible(true);
    }
  };

  return (
    <div className='mt-8 mx-4'>
      <div className='bg-white p-8 rounded shadow-md'>
        <div className='flex justify-center mb-4'>
          {photoEditMode ? (
            <div className='flex items-center justify-center'>
              <input type='file' accept='image/*' onChange={handleProfilePictureChange} />
            </div>
          ) : (
            <img
              src={profileImage ? profileImage : avatar}
              alt='Profile'
              className='w-24 h-24 rounded-full object-cover'
            />
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
          {bioEditMode ? (
            <>
              <textarea className='border border-gray-300 p-1' value={bio} onChange={(e) => setbio(e.target.value)} />
              <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handleBioSave}>
                <CheckIcon className='h-4 w-4 text-black dark:text-white' />
              </button>
            </>
          ) : (
            <>
              <p className='text-gray-800'>{userBio}</p>
              <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handleBioClick}>
                <PencilIcon className='h-4 w-4 text-black dark:text-white' />
              </button>
            </>
          )}
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 w-24'>{t('First Name:')}</label>
            <p className='text-gray-800'>{firstName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>{t('Last Name:')}</label>
            <p className='text-gray-800'>{lastName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>{t('Organization Name:')}</label>
            <p className='text-gray-800'>{organizationName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>{t('Email')}:</label>
            <p className='text-gray-800'>{email}</p>
          </div>

          <div>
            <label className='block text-gray-600'>{t('National Identity Card Number (NIC):')}</label>
            <p className='text-gray-800'>{nic}</p>
          </div>

          <div>
            <label className='block text-gray-600'>
              {t('Phone Number:')}
              {phoneEditMode ? (
                <>
                  <input
                    type='text'
                    className='border border-gray-300 p-1'
                    value={newPhoneNumber}
                    onChange={(e) => SetNewPhoneNUmber(e.target.value)}
                  />
                  <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handlePhoneSave}>
                    <CheckIcon className='h-4 w-4 text-black dark:text-white' />
                  </button>
                </>
              ) : (
                <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handlePhoneClick}>
                  <PencilIcon className='h-4 w-4 text-black dark:text-white' />
                </button>
              )}
            </label>
            {phoneEditMode ? null : <p className='text-gray-800'>{phoneNumber}</p>}
          </div>

          <div>
            <label className='block text-gray-600'>
              {t('Address')}
              {addressEditMode ? (
                <>
                  <input
                    type='text'
                    className='border border-gray-300 p-1'
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handleAddressSave}>
                    <CheckIcon className='h-4 w-4 text-black dark:text-white' />
                  </button>
                </>
              ) : (
                <button className='bg-blue-500 text-white rounded p-1 ml-2' onClick={handleAddressClick}>
                  <PencilIcon className='h-4 w-4 text-black dark:text-white' />
                </button>
              )}
            </label>
            {addressEditMode ? null : <p className='text-gray-800'>{address}</p>}
          </div>

          <div>
            <label className='block text-gray-600'>{t('User Type:')}</label>
            <p className='text-gray-800'>{userType}</p>
          </div>
        </div>

        <div className='flex flex-row justify-end'>
          <button
            className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'
            onClick={() => {
              setIsConfirmVisible(true);
            }}>
            {t('Disable')}
          </button>
        </div>
      </div>
      {/* confirm Popup */}
      <Modal
        isOpen={isConfirmVisible}
        message='Are you sure want to disable this account?'
        onClose={confirmDialogClose}
        type='confirmation'
      />
      {/* Alert message Popup */}
      <Modal
        isOpen={isAlertVisible}
        message={`${message}!`}
        onClose={() => {
          setIsAlertVisible(false);
          navigate('/');
          localStorage.removeItem('jwtAccessToken');
          localStorage.removeItem('jwtRefreshToken');
        }}
        type='alert'
      />
    </div>
  );
};

export default UserProfilePage;
