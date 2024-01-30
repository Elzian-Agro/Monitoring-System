import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../slice/dashboardLayoutSlice';
import { PrimaryButton, VariantButton } from '../components/base/Button';
import { customTableStyles } from 'constant';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { downloadCSV } from '../utils/download';
import { getNewAccessToken } from '../utils/getNewAccessToken';
import Form from '../components/common/form';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import SearchBox from '../components/base/SearchBox';
import ConformBox from '../components/common/confirm-box';
import AlertBox from '../components/common/alert-box';
import { identifyError } from 'pages/auth/utils';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [alert, setAlert] = useState(false);

  const currentMode = useSelector(selectTheme);
  const navigate = useNavigate();

  const columns = [
    {
      name: 'FIRST NAME',
      selector: (row) => row.firstName,
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
      name: 'USER TYPE',
      selector: (row) => row.userType,
      sortable: true,
    },
    {
      name: 'ACTION',
      cell: () => <PrimaryButton bgEffect='bg-blue-500 border-blue-600' text='Edit' onClick={() => handleEdit()} />,
    },
    {
      cell: () => <PrimaryButton bgEffect='bg-red-500 border-red-600' text='Delete' onClick={() => handleDelete()} />,
    },
  ];

  const handleCreate = () => {
    setShowForm(true);
    setSelectedUser(null); // Clear selectedUser for add mode
  };

  const handleEdit = (user) => {
    setShowForm(true);
    setSelectedUser(user); // Set selectedUser for edit mode
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedUser(null); // Clear selectedUser when form is closed
  };

  const handleDelete = () => {
    setConfirm(true);
  };

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem('jwtAccessToken');
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

        return await getUser();
      }
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const usersData = await getUser();
        setUsers(usersData);
      } catch (error) {
        setError(identifyError(error.response?.data?.code));
        setAlert(true);
        if (error.response?.data?.code === 13002) {
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      }
      setPending(false);
    })();
  }, [navigate]);

  // Function to filter the user based on the search text
  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }

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
      <div>
        <div className='flex bg-red-500 text-white text-xs md:text-sm lg:text-base p-2 md:p-4 mx-6 rounded-md justify-center items-center'>
          {error}
        </div>
        <AlertBox
          visible={alert}
          message={`${error}!!!`}
          onClose={() => {
            setAlert(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className='mx-5 mt-2'>
      {showForm ? (
        <Form onClose={closeForm} visible={showForm} user={selectedUser} />
      ) : (
        <div className='flex flex-col shadow-lg shadow-gray-500/50 dark:shadow-sm dark:shadow-gray-600 p-4 rounded-lg'>
          <div className='flex flex-col md:flex-row mb-4 md:items-center md:justify-between'>
            <div className='flex gap-2 mb-2 md:mb-0'>
              <VariantButton text='Add User' Icon={PlusIcon} onClick={handleCreate} />
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
          <div className='flex flex-col rounded-t-lg'>
            <DataTable
              columns={columns}
              data={filteredUsers}
              customStyles={currentMode === 'Dark' ? {} : customTableStyles}
              theme={currentMode === 'Dark' ? 'dark' : ''}
              pagination
              fixedHeader
              fixedHeaderScrollHeight='65vh'
              progressPending={pending}
            />
          </div>
        </div>
      )}
      <ConformBox
        visible={confirm}
        message='Are you sure want to delete?'
        onClose={() => {
          setConfirm(false);
        }}
      />
    </div>
  );
};

export default ManageUsers;
