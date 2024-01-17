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
    <div className=' hidden md:flex mr-6 gap-5 rounded-full hover:bg-red-500 duration-300 px-4' onClick={changeTheme}>
      <button>
        <SunIcon className='h-6 w-6 cursor-pointer' />
      </button>
      <button>
        <MoonIcon className='h-6 w-6 cursor-pointer' />
      </button>
    </div>
  );
};

export default ThemeSettings;
