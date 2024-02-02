import React from 'react';

function Loader() {
  return (
    <div className='flex item center justify-center p-64'>
      <div className='loader border-t-2 rounded-full border-gray-500 bg-gray-50 animate-spin aspect-square w-16 flex justify-center items-center text-yellow-700'></div>
    </div>
  );
}

export default Loader;
