import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slice/dashboardLayoutSlice';
import Button from '../components/base/Button';
import { customTableStyles } from 'constant';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { downloadCSV } from '../utils/download';
import { refreshTokenMiddleware } from '../utils/refreshTokenMiddleware';
import Form from '../components/common/form';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentMode = useSelector(selectTheme);
  const navigate = useNavigate();

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'NIC',
      selector: (row) => row.NIC,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNum,
      sortable: true,
    },
    {
      name: 'Organization Name',
      selector: (row) => row.orgName,
      sortable: true,
    },
    {
      name: 'User Type',
      selector: (row) => row.userType,
      sortable: true,
    },
    {
      name: 'Action',
      cell: () => (
        <button
          className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-2 mx-1 rounded-lg w-24'
          onClick={() => BtnEditClick()}>
          Edit
        </button>
      ),
    },
    {
      cell: () => (
        <button
          className='bg-red-600 hover:bg-red-500 text-white py-2 px-2 mx-1 rounded-lg w-24'
          onClick={() => handleDelete()}>
          Delete
        </button>
      ),
    },
  ];

  const BtnAddClik = () => {
    setShowForm(true);
    setSelectedUser(null); // Clear selectedUser for add mode
  };

  const BtnEditClick = (user) => {
    setShowForm(true);
    setSelectedUser(user); // Set selectedUser for edit mode
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedUser(null); // Clear selectedUser when form is closed
  };

  const handleDelete = () => {
    // TO DO: handle delete
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('jwtAccessToken');

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPending(false);
        setUsers(response.data);
      })
      .catch(async (error) => {
        if (error.response?.data?.code === 13004) {
          const refreshTokenSuccess = await refreshTokenMiddleware();
          if (!refreshTokenSuccess) {
            navigate('/');
          }
          window.location.reload();
        } else {
          setPending(false);
          setError('Access denied');
        }
      });
  }, [navigate]);

  // Function to filter the user based on the search text
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase()) ||
        user.NIC.includes(filterText) ||
        user.orgName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.userType.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [users, filterText]);

  if (error) {
    return (
      <div className='flex bg-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-4 mx-6 rounded-md justify-center items-center'>
        {error}
      </div>
    );
  }

  return (
    <div className='mx-5 mt-2'>
      {showForm ? (
        <Form onClose={closeForm} visible={showForm} user={selectedUser} />
      ) : (
        <div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex gap-2'>
              <Button bgColor='bg-green-500' text='Add+' onClick={BtnAddClik} />
              <Button bgColor='bg-green-500' text='Download' onClick={() => downloadCSV(filteredUsers)} />
            </div>

            <div className='relative mr-2'>
              <input
                type='text'
                placeholder='Search...'
                className='rounded-lg p-1 dark:bg-secondary-dark-bg dark:text-white border-2 border-solid border-gray-300 dark:border-gray-500 focus:outline-none focus:border-black dark:focus:border-white w-40 sm:w-48 md:w-56'
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <button
                className='absolute right-0 p-1 cursor-pointer bg-red-500 rounded-r-lg text-white'
                onClick={() => {
                  setFilterText('');
                }}>
                X
              </button>
            </div>
          </div>
          <div className='pr-2 rounded-t-lg'>
            <DataTable
              columns={columns}
              data={filteredUsers}
              customStyles={customTableStyles}
              theme={currentMode === 'Dark' ? 'dark' : ''}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='70vh'
              progressPending={pending}
            />
          </div>
        </div>
      )}

      {error && (
        <div className='flex bg-red-500 text-white p-4 mb-4 rounded-md justify-center items-center'>{error}</div>
      )}
    </div>
  );
};

export default ManageUsers;
