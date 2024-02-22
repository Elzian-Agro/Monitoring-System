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
      cell: (row) => (
        <div className='flex flex-row gap-2 items-center'>
          {row.firstName}
          {row.isDisabled && <div className='hidden lg:block bg-red-500 rounded-full h-3 w-3'></div>}
        </div>
      ),
      sortable: true,
    },
    {
      name: t('LAST NAME'),
      cell: (row) => row.lastName,
      sortable: true,
      hide: 'sm',
    },
    {
      name: t('EMAIL'),
      cell: (row) => row.email,
      sortable: true,
      hide: 'md',
    },
    {
      name: t('NIC'),
      cell: (row) => row.nic,
      sortable: true,
      hide: 'lg',
    },
    {
      name: t('TEL. NUMBER'),
      cell: (row) => row.phoneNum,
      sortable: true,
      hide: 'sm',
    },
    {
      name: t('ORG. NAME'),
      cell: (row) => row.orgName,
      sortable: true,
      hide: 'lg',
    },
    {
      name: t('ACTION'),
      cell: (row) => (
        <div className='flex flex-row gap-2 items-center'>
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

  const ExpandedUserdata = ({ data }) => {
    return (
      <div className='p-2 text-sm'>
        <p className='sm:hidden'>Last Name : {data.lastName}</p>
        <p className='lg:hidden'>Email : {data.email}</p>
        <p className='sm:hidden'>Phone Number : {data.phoneNum}</p>
        <p className='xl:hidden'>Organization Name : {data.orgName}</p>
        <p className='lg:hidden'>Status: {data.isDisabled ? <span>Disabled</span> : <span>Active</span>}</p>
      </div>
    );
  };

  const getUsers = async () => {
    const response = await send({ endpoint: 'user', method: 'GET' });
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to filter the user based on the search text
  const filteredUsers = useMemo(() => {
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
    <div className='mx-5 mt-2'>
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
                <VariantButton text='Download' Icon={ArrowDownTrayIcon} onClick={() => downloadCSV(filteredUsers)} />
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
              data={filteredUsers}
              customStyles={currentMode === 'Dark' ? {} : customTableStyles}
              theme={currentMode === 'Dark' ? 'dark' : 'default'}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='65vh'
              expandableRows
              expandableRowsComponent={ExpandedUserdata}
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
