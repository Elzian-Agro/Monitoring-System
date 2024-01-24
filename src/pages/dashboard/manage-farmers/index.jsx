import React from 'react';
import DataTable from 'react-data-table-component';
import Button from '../components/base/Button';

const ManageFarmers = ({ theme }) => {
  // Custom styles
  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        borderRightStyle: 'solid',
        borderRightWidth: '2px',
        borderRightColor: 'black',
        borderLeftStyle: 'solid',
        borderLeftWidth: '2px',
        borderLeftColor: 'black',
        borderTopStyle: 'solid',
        borderTopWidth: '2px',
        borderTopColor: 'black',
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '2px',
          borderRightColor: 'black',
        },
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'black',
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '2px',
          borderRightColor: 'black',
        },
      },
    },
  };

  // Table columns
  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'NIC',
      selector: (row) => row.nic,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phone,
    },
    {
      name: 'Action',
      cell: () => (
        <diV>
          <Button bgColor='bg-blue-500' text='Edit' onClick={() => handleEdit()} />
          <Button bgColor='bg-red-500' text='Delete' onClick={() => handleDelete()} />
        </diV>
      ),
    },
  ];

  const handleCreate = () => {
    // TO DO: handle create
  };

  const handleEdit = () => {
    // TO DO: handle edit
  };

  const handleDelete = () => {
    // TO DO: handle delete
  };

  const handleDownload = () => {
    // TO DO: handle download
  };

  return (
    <div className='mx-5'>
      <div className='flex items-center justify-between mb-2'>
        <div>
          <Button bgColor='bg-green-500' text='Add+' onClick={() => handleCreate()} />
          <Button bgColor='bg-green-500' text='Download CSV' onClick={() => handleDownload()} />
        </div>

        <div className='mr-3'>
          <input type='text' placeholder='Search...' className='p-2 rounded-l-lg' />
          <button className='bg-red-500 text-white p-2 rounded-r-lg'>X</button>
        </div>
      </div>
      <div className='pr-2 rounded-t-lg b-10'>
        <DataTable
          columns={columns}
          customStyles={customStyles}
          theme={theme}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='70vh'
        />
      </div>
    </div>
  );
};

export default ManageFarmers;
