import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeSettings = () => {
  return (
    <div className=' hidden md:flex mr-6 gap-5 rounded-full hover:bg-red-500 duration-300 px-4 '>
      <button>
        <SunIcon className="h-6 w-6 cursor-pointer" />
      </button>
      <button>
        <MoonIcon className="h-6 w-6 cursor-pointer" />
      </button>
    </div>
  );
};

export default ThemeSettings;
