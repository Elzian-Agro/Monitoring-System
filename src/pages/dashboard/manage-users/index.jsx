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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // User table columns define
  const columns = [
    {
      name: t('FIRST NAME'),
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: t('LAST NAME'),
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: t('EMAIL'),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: t('NIC'),
      selector: (row) => row.NIC,
      sortable: true,
    },
    {
      name: t('TEL. NUMBER'),
      selector: (row) => row.phoneNum,
      sortable: true,
    },
    {
      name: t('ORG. NAME'),
      selector: (row) => row.orgName,
      sortable: true,
    },
    {
      name: t('ACTION'),
      cell: (row) => (
        <PrimaryButton
          bgEffect='bg-blue-500 border-blue-600'
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
        <div className='flex flex-row gap-2 items-center'>
          <PrimaryButton
            bgEffect='bg-red-500 border-red-600'
            text='Delete'
            onClick={() => {
              setSelectedUser(row);
              setIsConfirmVisible(true);
            }}
          />
          {row.isDisabled && <div className='bg-green-500 rounded-full h-3 w-3'></div>}
        </div>
      ),
    },
  ];

  const getUsers = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('jwtAccessToken');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      // Check access token invalid or expired
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
        }, 2000);
      } catch (error) {
        setError(identifyError(error.response?.data?.code));
        setIsAlertVisible(true);

        // Check refresh token is invalid or expired
        if (error.response?.data?.code === 13002) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }
    })();
  }, [getUsers, navigate, isFormVisible, isConfirmVisible]);

  // Get confirmation for delete
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
      setMessage('User deleted successfully');
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
    return users.filter((user) => {
      const userType = user.userType?.toLowerCase() || '';
      const firstName = user.firstName?.toLowerCase() || '';
      const lastName = user.lastName?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const NIC = user.NIC || '';
      const phoneNum = String(user.phoneNum) || '';
      const orgName = user.orgName?.toLowerCase() || '';

      return (
        userType === 'farmer' &&
        (firstName.includes(filterText.toLowerCase()) ||
          lastName.includes(filterText.toLowerCase()) ||
          email.includes(filterText.toLowerCase()) ||
          NIC.includes(filterText) ||
          phoneNum.includes(filterText) ||
          orgName.includes(filterText.toLowerCase()))
      );
    });
  }, [users, filterText]);

  // Display the error If happen error when loading table data
  if (error) {
    return (
      <div>
        <div className='flex bg-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-4 mx-6 rounded-md justify-center items-center'>
          {t(error)}
        </div>
        <AlertBox
          visible={isAlertVisible}
          message={`${error}`}
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
                    text='Add User'
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
