import React from 'react';

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button className={`${bgColor} text-white py-2 px-4 mr-2 rounded-lg w-24 md:w-32`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
