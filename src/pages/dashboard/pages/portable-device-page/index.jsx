import React from 'react';
import useFetch from 'hooks/useFetch';

const PortableDevice = () => {
  const {
    response: soilElementsData,
    recall,
    isLoading,
  } = useFetch({
    endpoint: 'portable-device',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });

  // TO DO: Complete page

  return (
    <div className='mx-5 mt-2'>
      <div>Portable Device</div>
    </div>
  );
};

export default PortableDevice;
