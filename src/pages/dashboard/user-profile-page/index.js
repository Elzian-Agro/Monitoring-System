import React from 'react';

const UserProfilePage = () => {
  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>My Profile</h2>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600'>First Name:</label>
            <p className='text-gray-800'>Michael </p>
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
            <label className='block text-gray-600'>User Type:</label>
            <p className='text-gray-800'>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
