import avatar from 'assets/images/avatar.png';
import { useState } from 'react';

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(avatar);

  const handleProfilePictureChange = (event) => {
    // Handle updating the profile picture when a new image is selected
    const newProfilePicture = URL.createObjectURL(event.target.files[0]);
    setProfilePicture(newProfilePicture);
  };

  const handleEditButtonClick = () => {
    // Toggle between edit mode and view mode
    setEditMode(!editMode);
  };

  return (
    <div className='mt-8 mx-4'>
      <div className='bg-white p-8 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-center'>My Profile</h2>
        <div className='flex justify-center '>
          {editMode ? (
            <input type='file' accept='image/*' onChange={handleProfilePictureChange} className='mb-2' />
          ) : (
            <img src={profilePicture} alt='Profile' className='w-24 h-24 rounded-full object-cover' />
          )}
        </div>

        <div className='flex items-center justify-center mb-4'>
            {editMode ? (
              <button
                className='bg-blue-500 text-white rounded px-4 py-2'
                onClick={handleEditButtonClick}
              >
                Save
              </button>
            ) : (
              <button
                className='bg-blue-500 text-white rounded px-4 py-2'
                onClick={handleEditButtonClick}
              >
                Edit Profile Picture
              </button>
            )}
          </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 w-24'>First Name:</label>
            <p className='text-gray-800'>Michael</p>
          </div>

          <div>
            <label className='block text-gray-600'>Last Name:</label>
            <p className='text-gray-800'>Roberts</p>
          </div>

          <div>
            <label className='block text-gray-600'>Organization Name:</label>
            <p className='text-gray-800'>Elzian Agro</p>
          </div>

          <div>
            <label className='block text-gray-600'>Email:</label>
            <p className='text-gray-800'>Michaelroberts@gmail.com</p>
          </div>

          <div>
            <label className='block text-gray-600'>NIC:</label>
            <p className='text-gray-800'>992050201V</p>
          </div>

          <div>
            <label className='block text-gray-600'>Phone Number:</label>
            <p className='text-gray-800'>0772395594</p>
          </div>

          <div>
            <label className='block text-gray-600'>Address:</label>
            <p className='text-gray-800'>123 Main Street, Colombo</p>
          </div>

          <div>
            <label className='block text-gray-600'>User Type:</label>
            <p className='text-gray-800'>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
