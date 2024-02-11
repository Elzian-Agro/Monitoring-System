import React from 'react';

function Loader() {
  return (
    <div className='flex justify-center pt-64'>
      <div className='w-16 border-t-2 rounded-full border-gray-500 dark:border-gray-100 bg-gray-50 dark:bg-gray-900 animate-spin aspect-square'></div>
    </div>
  );
}

export default Loader;
