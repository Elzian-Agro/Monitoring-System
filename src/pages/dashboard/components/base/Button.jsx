import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ size = null, bgEffect, text, onClick }) => {
  return (
    <button
      className={`w-16 md:w-24 ${size} cursor-pointer transition-all ${bgEffect} text-white text-sm px-2 lg:px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
      onClick={onClick}>
      {text}
    </button>
  );
};

const VariantButton = ({ text, Icon = null, onClick }) => {
  return (
    <button
      className='rounded-lg relative w-32 sm:w-36 h-9 md:h-10 cursor-pointer flex items-center border-b-[4px] border-green-600 bg-green-500 hover:brightness-110 group'
      onClick={onClick}>
      <span className='text-white text-sm ml-4 sm:ml-8 transform group-hover:translate-x-20 dark:group-hover:text-black transition-all duration-300'>
        {text}
      </span>
      <span className='absolute right-0 h-full w-12 sm:w-12 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300'>
        {Icon && <Icon className='h-5 w-5 text-white mr-2' />}
      </span>
    </button>
  );
};

const ToggleButton = ({ value, onChange }) => {
  return (
    <div>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input className='sr-only peer' type='checkbox' value={value} onChange={onChange} checked={value} />
        <div className="peer rounded-full outline-none duration-100 after:duration-500 w-20 h-10 bg-blue-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 after:content-['No'] after:absolute after:outline-none after:rounded-full after:h-8 after:w-8 after:bg-white after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold peer-checked:after:translate-x-10 peer-checked:after:content-['Yes'] peer-checked:after:border-white"></div>
      </label>
    </div>
  );
};

PrimaryButton.propTypes = {
  size: PropTypes.string.isRequired,
  bgEffect: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

VariantButton.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
};

ToggleButton.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { PrimaryButton, VariantButton, ToggleButton };
