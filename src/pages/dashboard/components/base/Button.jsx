import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = ({ bgEffect, text, onClick }) => {
  return (
    <button
      className={`w-16 md:w-20 lg:24 cursor-pointer transition-all ${bgEffect} text-white text-sm px-2 lg:px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
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

PrimaryButton.propTypes = {
  bgEffect: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

VariantButton.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
};

export { PrimaryButton, VariantButton };
