import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slice/dashboardLayoutSlice';
import { PrimaryButton, VariantButton } from '../components/base/Button';
import { customTableStyles } from 'constant';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { downloadCSV } from '../utils/download';
import { getNewAccessToken } from '../utils/getNewAccessToken';
import Form from '../components/common/user-form';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import SearchBox from '../components/base/SearchBox';
import ConformBox from '../components/common/confirm-box';
import AlertBox from '../components/common/alert-box';
import { identifyError } from 'pages/auth/utils';
import Loader from '../components/common/loader';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const currentMode = useSelector(selectTheme);
  const navigate = useNavigate();

  const columns = [
    {
      name: 'FIRST NAME',
      selector: ({ firstName, isDisabled }) => (
        <div className='flex flex-row gap-2'>
          <div className=''>{firstName}</div>
          <div className={isDisabled ? 'bg-red-500 rounded-full h-3 w-3' : ''}></div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'LAST NAME',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'EMAIL',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'NIC',
      selector: (row) => row.NIC,
      sortable: true,
    },
    {
      name: 'TEL. NUMBER',
      selector: (row) => row.phoneNum,
      sortable: true,
    },
    {
      name: 'ORG. NAME',
      selector: (row) => row.orgName,
      sortable: true,
    },
    {
      name: 'ACTION',
      cell: (row) => (
        <PrimaryButton
          bgEffect='bg-blue-500 border-blue-600'
          size='w-20'
          text='Edit'
          onClick={() => {
            setSelectedUser(row);
            setIsFormVisible(true);
          }}
        />
      ),
    },
    {
      cell: (row) => (
        <PrimaryButton
          bgEffect='bg-red-500 border-red-600'
          size='w-20'
          text='Delete'
          onClick={() => {
            setSelectedUser(row);
            setIsConfirmVisible(true);
          }}
        />
      ),
    },
  ];

  const getUsers = useCallback(async () => {
    try {
      const { jwtAccessToken: accessToken } = localStorage;
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (
        error.response?.data?.code === 13004 ||
        error.response?.data?.code === 13013 ||
        error.response?.data?.code === 13014
      ) {
        await getNewAccessToken();
        return await getUsers();
      }
      throw error;
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const usersData = await getUsers();
        setTimeout(() => {
          setIsLoaderVisible(false);
          setUsers(usersData);
        }, 3000);
      } catch (error) {
        setError(identifyError(error.response?.data?.code));
        setIsAlertVisible(true);
        if (error.response?.data?.code === 13002) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }
    })();
  }, [getUsers, navigate, isFormVisible, isAlertVisible]);

  // Confirm for delete
  const confirmDialogClose = (result) => {
    if (result) {
      handleDelete();
    }
    setIsConfirmVisible(false);
  };

  const handleDelete = async () => {
    try {
      const { jwtAccessToken: accessToken } = localStorage;
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/delete/${selectedUser._id}`,
        { isDeleted: true },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage('Farmer deleted successfully!');
      setIsAlertVisible(true);
    } catch (error) {
      setMessage(identifyError(error.response?.data?.code));
      setIsAlertVisible(true);
    }
  };

  // Function to filter the user based on the search text
  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    return users.filter(
      (user) =>
        user.userType.toLowerCase() === 'farmer' &&
        (user.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
          user.email.toLowerCase().includes(filterText.toLowerCase()) ||
          user.NIC.includes(filterText) ||
          user.orgName.toLowerCase().includes(filterText.toLowerCase()))
    );
  }, [users, filterText]);

  // Display the error If happen error when loading table data
  if (error) {
    return (
      <div>
        <div className='flex bg-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-4 mx-6 rounded-md justify-center items-center'>
          {error}
        </div>
        <AlertBox
          visible={isAlertVisible}
          message={`${error}!`}
          onClose={() => {
            setIsAlertVisible(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className='mx-5 mt-2'>
      {isLoaderVisible && <Loader />}
      {isFormVisible ? (
        <Form
          onClose={() => {
            setIsFormVisible(false);
            setSelectedUser(null);
          }}
          visible={isFormVisible}
          user={selectedUser}
        />
      ) : (
        <>
          {isLoaderVisible ? null : (
            <div className='flex flex-col shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 p-4 rounded-lg'>
              <div className='flex flex-col md:flex-row mb-4 md:items-center md:justify-between'>
                <div className='flex gap-2 mb-2 md:mb-0'>
                  <VariantButton
                    text='Add New'
                    Icon={PlusIcon}
                    onClick={() => {
                      setIsFormVisible(true);
                      setSelectedUser(null);
                    }}
                  />
                  {filteredUsers.length > 0 && (
                    <VariantButton
                      text='Download'
                      Icon={ArrowDownTrayIcon}
                      onClick={() => downloadCSV(filteredUsers)}
                    />
                  )}
                </div>
                <SearchBox
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  onClick={() => {
                    setFilterText('');
                  }}
                />
              </div>
              <div className='flex flex-col rounded-t-lg'>
                <DataTable
                  columns={columns}
                  data={filteredUsers}
                  customStyles={currentMode === 'Dark' ? {} : customTableStyles}
                  theme={currentMode === 'Dark' ? 'dark' : ''}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight='65vh'
                />
              </div>
            </div>
          )}
        </>
      )}
      <ConformBox
        visible={isConfirmVisible}
        message='Are you sure want to delete?'
        onClose={(result) => confirmDialogClose(result)}
      />
      <AlertBox
        visible={isAlertVisible}
        message={`${error || message}!`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
      />
    </div>
  );
};

export default ManageUsers;
