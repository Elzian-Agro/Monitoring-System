import React from 'react';

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button className={`${bgColor} text-white py-2 px-4 mr-2 rounded-lg`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
