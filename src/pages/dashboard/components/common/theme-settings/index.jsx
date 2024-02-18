import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { selectTheme, setTheme } from 'pages/dashboard/slice/dashboardLayoutSlice';
import { useDispatch, useSelector } from 'react-redux';

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const currTheme = useSelector(selectTheme);

  const changeTheme = () => {
    if (currTheme === 'Dark') {
      dispatch(setTheme(''));
    } else {
      dispatch(setTheme('Dark'));
    }
  };

  return (
    <div
      className='flex mr-6 gap-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 duration-300 px-4 cursor-pointer'
      onClick={changeTheme}>
      <button>
        <SunIcon
          className={`h-6 w-6 cursor-pointer dark:fill-gray-300 dark:text-white rounded-lg ${
            currTheme === 'Dark' ? '' : 'bg-orange-500'
          }`} />
      </button>
      <button>
        <MoonIcon
          className={`h-6 w-6 cursor-pointer dark:fill-blue-500 rounded-lg ${currTheme === 'Dark' ? 'bg-white' : ''} `} />
      </button>
    </div>
  );
};

export default ThemeSettings;
