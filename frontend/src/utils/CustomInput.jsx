import React, { useState } from 'react';

const CustomInput = ({ label, type, value, onChange, required ,name,autoComplete}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length === 0 ? false : true)}
        className="border border-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-black" // Added text-black class
      />
      <label
        className={`absolute left-2 transition-all duration-200 text-[13px] md:text-sm ${isFocused || value ? 'top-[-10px] text-green-500 text-[10px] md:text-sm  bg-white px-1' : 'top-2 text-black'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
