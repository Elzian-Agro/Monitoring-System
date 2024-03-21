import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slice/dashboardLayoutSlice';
import { PrimaryButton, VariantButton } from '../../components/base/Button';
import { customTableStyles } from 'constant';
import DataTable from 'react-data-table-component';
import { downloadCSV } from '../../utils/download';
import Form from './user-form';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import SearchBox from '../../components/base/SearchBox';
import Loader from '../../components/common/loader';
import { useTranslation } from 'react-i18next';
import Modal from 'components/common/modal';
import useAxios from 'hooks/useAxios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [message, setMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const currentMode = useSelector(selectTheme);
  const { t } = useTranslation();
  const { loading, send } = useAxios();

  // User table columns define
  const columns = [
    {
      name: t('FIRST NAME'),
      selector: (row) => row.firstName,
      sortable: true,
      cell: (row) => (
        <div className='flex flex-row gap-2 items-center'>
          <div className={`${row.isDisabled ? 'bg-red-500' : 'bg-green-500'} rounded-full h-3 w-3`}></div>
          {row.firstName}
        </div>
      ),
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
      selector: (row) => row.nic,
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
        <div className='flex flex-row justify-center gap-2 items-center w-full'>
          <PrimaryButton
            color='bg-blue-500 border-blue-600'
            text='Edit'
            onClick={() => {
              setSelectedUser(row);
              setIsFormVisible(true);
            }}
          />
          <PrimaryButton
            color='bg-red-500 border-red-600'
            text='Delete'
            onClick={() => {
              setSelectedUser(row);
              setIsConfirmVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  const getUsers = async () => {
    const response = await send({ endpoint: 'user', method: 'GET' });
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to filter the user based on the search text
  const filterUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    return users.filter((user) => {
      const firstName = user.firstName?.toLowerCase() || '';
      const lastName = user.lastName?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const nic = user.nic || '';
      const phoneNum = String(user.phoneNum) || '';
      const orgName = user.orgName?.toLowerCase() || '';

      return (
        firstName.includes(filterText.toLowerCase()) ||
        lastName.includes(filterText.toLowerCase()) ||
        email.includes(filterText.toLowerCase()) ||
        nic.includes(filterText) ||
        phoneNum.includes(filterText) ||
        orgName.includes(filterText.toLowerCase())
      );
    });
  }, [users, filterText]);

  // Delete user
  const handleConfirmationAndDelete = async (result) => {
    if (result) {
      const response = await send({
        endpoint: `user/delete/${selectedUser._id}`,
        method: 'PUT',
        body: { isDeleted: true },
      });
      setIsConfirmVisible(false);
      if (response) {
        setMessage('User deleted successfully');
        setIsAlertVisible(true);
        getUsers();
      }
    }
    setIsConfirmVisible(false);
  };

  return (
    <div className='mx-5 mt-2 min-h-screen'>
      {isFormVisible && (
        <Form
          onClose={() => {
            setIsFormVisible(false);
            setSelectedUser(null);
          }}
          visible={isFormVisible}
          user={selectedUser}
          formSubmission={async (message) => {
            setMessage(message);
            setIsAlertVisible(true);
            getUsers();
          }}
        />
      )}

      {loading && <Loader />}

      {!isFormVisible && !loading && (
        <div className='flex flex-col shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg p-4'>
          <div className='flex flex-col lg:flex-row mb-4 lg:items-center lg:justify-between'>
            <div className='flex gap-2 mb-2 lg:mb-0'>
              <VariantButton
                text='Add User'
                Icon={PlusIcon}
                onClick={() => {
                  setIsFormVisible(true);
                  setSelectedUser(null);
                }}
              />
              {filterUsers.length > 0 && (
                <VariantButton
                  text='Download'
                  Icon={ArrowDownTrayIcon}
                  onClick={() => downloadCSV(filterUsers, 'users.csv')}
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
          <div className='rounded-t-lg'>
            <DataTable
              columns={columns}
              data={filterUsers}
              customStyles={customTableStyles}
              theme={currentMode === 'Dark' ? 'dark' : 'default'}
              pagination
            />
          </div>
        </div>
      )}
      <Modal
        isOpen={isConfirmVisible}
        message='Are you sure want to delete?'
        onClose={(result) => handleConfirmationAndDelete(result)}
        type='confirmation'
      />
      <Modal
        isOpen={isAlertVisible}
        message={`${message}`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />
    </div>
  );
};

export default ManageUsers;
