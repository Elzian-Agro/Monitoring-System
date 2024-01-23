import React from 'react';

const Button = ({ color, text, onClick }) => {
  return (
    <button className={`bg-${color}-500 text-white py-2 px-4 mr-2 rounded-lg hover:bg-${color}-600`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
