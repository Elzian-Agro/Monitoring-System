import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../slice/userSlice';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

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
  // const userBio = useSelector((state) => state.user.userBio);
  const profileImage = useSelector((state) => state.user.profileImage);
  const address = useSelector((state) => state.user.address);

  const [localProfilePicture, setLocalProfilePicture] = useState(profileImage);

  const handleProfilePictureChange = (event) => {
    // Handle updating the profile picture when a new image is selected
    const newProfilePicture = URL.createObjectURL(event.target.files[0]);
    setLocalProfilePicture(newProfilePicture);
  };

  const handleSaveButtonClick = () => {
    if (localProfilePicture) {
      dispatch(setUserData({ profileImage: localProfilePicture }));
    }
    // Toggle back to view mode
    setEditMode(false);
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
  };

  return (
    <div className='mt-8 mx-4'>
      <div className='bg-white p-8 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center'>My Profile</h2>
        <div className='flex justify-center mb-4'>
          {editMode ? (
            <div className='flex items-center justify-center'>
              <input type='file' accept='image/*' onChange={handleProfilePictureChange} />
            </div>
          ) : (
            <img src={profileImage} alt='Profile' className='w-24 h-24 rounded-full object-cover' />
          )}

          <div className='flex items-end'>
            {editMode ? (
              <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleSaveButtonClick}>
                <CheckIcon className='h-6 w-6 text-black dark:text-white' />
              </button>
            ) : (
              <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleEditButtonClick}>
                <PencilSquareIcon className='h-6 w-6 text-black dark:text-white' />
              </button>
            )}
          </div>
        </div>

        <div className='bio max-w-[50rem] mx-auto text-center mb-6'>
          This is user Bio section, Vestibulum erat lorem, finibus in cursus sed, aliquet at metus. Curabitur faucibus
          id ex ac gravida. Aenean commodo mi nulla, et tincidunt elit tempus ac. Curabitur porta malesuada urna, ac
          sollicitudin nunc pellentesque lobortis. Donec molestie elit vel malesuada porttitor.
        </div>

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
            <label className='block text-gray-600'>Phone Number:</label>
            <p className='text-gray-800'>{phoneNumber}</p>
          </div>

          <div>
            <label className='block text-gray-600'>Address:</label>
            <p className='text-gray-800'>{address}</p>
          </div>

          <div>
            <label className='block text-gray-600'>User Type:</label>
            <p className='text-gray-800'>{userType}</p>
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <button className='bg-blue-500 text-black dark:text-white rounded px-4 py-2 mr-2'>Edit</button>
          <button className='bg-red-500 text-black dark:text-white rounded px-4 py-2 mr-2'>Disable</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
