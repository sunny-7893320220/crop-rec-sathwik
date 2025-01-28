import React from 'react';
import './CustomButton.css';


const CustomButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="custom-button" id='cbutton'>
      {children}
    </button>
  );
};

export default CustomButton;
