import avatar from 'assets/images/avatar.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(avatar);

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
  // const profileImage = useSelector((state) => state.user.profileImage);
  const address = useSelector((state) => state.user.address);

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
            <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleEditButtonClick}>
              Save
            </button>
          ) : (
            <button className='bg-blue-500 text-white rounded px-4 py-2' onClick={handleEditButtonClick}>
              Edit Profile Picture
            </button>
          )}
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
      </div>
    </div>
  );
};

export default UserProfilePage;
