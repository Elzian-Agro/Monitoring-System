import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ size = null, bgEffect, text, onClick }) => {
  return (
    <button
      className={`${size} cursor-pointer transition-all ${bgEffect} text-white text-base px-4 py-2 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
      onClick={onClick}>
      {text}
    </button>
  );
};

const VariantButton = ({ text, Icon = null, onClick }) => {
  return (
    <button
      className='rounded-lg relative w-36 h-10 cursor-pointer flex items-center border-b-[4px] border-green-600 bg-green-500 hover:brightness-110 group'
      onClick={onClick}>
      <span className='text-white text-sm ml-8 transform group-hover:translate-x-20 dark:group-hover:text-black transition-all duration-300'>
        {text}
      </span>
      <span className='absolute right-0 h-full w-12 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300'>
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
        <div className='peer rounded-full outline-none duration-100 after:duration-500 w-12 h-6 bg-blue-300 peer-focus:outline-none ring-2 ring-blue-500  after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-white after:top-0.4 after:left-0.4 after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold peer-checked:after:translate-x-6 peer-checked:after:border-white'></div>
      </label>
    </div>
  );
};

PrimaryButton.propTypes = {
  size: PropTypes.string,
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
