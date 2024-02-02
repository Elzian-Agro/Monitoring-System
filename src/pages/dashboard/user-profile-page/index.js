import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slice/userSlice';
import { PencilSquareIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [photoEditMode, setPhotoEditMode] = useState(false);
  const [addressEditMode, setAddressEditMode] = useState(false);
  const [phoneEditMode, setPhoneEditMode] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newPhoneNumber, SetNewPhoneNUmber] = useState('');
  const token = localStorage.getItem('jwtAccessToken');

  //Capitalize the text
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const email = useSelector((state) => state.user.email);
  const nic = useSelector((state) => state.user.NIC);
  const phoneNumber = useSelector((state) => state.user.phoneNum);
  const userType = useSelector((state) => capitalize(state.user.userType));
  const organizationName = useSelector((state) => state.user.orgName);
  // const userId = useSelector((state) => state.user._id);
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

  return (
    <div className='mt-8 mx-4'>
      <div className='bg-white p-8 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center'>My Profile</h2>
        <div className='flex justify-center mb-4'>
          {photoEditMode ? (
            <div className='flex items-center justify-center'>
              <input type='file' accept='image/*' onChange={handleProfilePictureChange} />
            </div>
          ) : (
            <img src={profileImage} alt='Profile' className='w-24 h-24 rounded-full object-cover' />
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

        <div className='bio max-w-[50rem] mx-auto text-center mb-6'>{userBio}</div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 w-24'>First Name:</label>
            <p className='text-gray-800'>{firstName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>Last Name:</label>
            <p className='text-gray-800'>{lastName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>Organization Name:</label>
            <p className='text-gray-800'>{organizationName}</p>
          </div>

          <div>
            <label className='block text-gray-600'>Email:</label>
            <p className='text-gray-800'>{email}</p>
          </div>

          <div>
            <label className='block text-gray-600'>NIC:</label>
            <p className='text-gray-800'>{nic}</p>
          </div>

          <div>
            <label className='block text-gray-600'>
              Phone Number:
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
              Address:
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
            <label className='block text-gray-600'>User Type:</label>
            <p className='text-gray-800'>{userType}</p>
          </div>
        </div>

        <div className='flex flex-row justify-end'>
          <button className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'>Disable</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
