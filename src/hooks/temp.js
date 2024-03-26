import React, { useEffect, useState } from 'react';
import useAxios from './useFetch';
// import useAxios from './useAxios';

function Temp() {
  const { respond, error, loader, recall, setBody } = useAxios({ endpoint: '', method: 'get' });

  const myFunc = () => {
    console.log('clicked');
    recall();
  };

  // useEffect(() => {
  //   if (!loader) {
  //     console.log(respond);
  //   }
  // }, [loader]);

  //   const { response, error, loading, send } = useAxios({ endpoint: '', method: 'get' });

  //   const myFunc = async () => {
  //     send({endpoint:"", method:'get'});
  //     setData(response);
  //   };

  return (
    <div>
      <button className='w-100' onClick={myFunc}>
        click
      </button>
      {respond}
    </div>
  );
}

export default Temp;
