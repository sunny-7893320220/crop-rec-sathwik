import React, { useState } from 'react';
import { User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const CustomInput = ({ label, type, value, onChange, required, name, autoComplete, error, Icon, iconColor = '#008552' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <div className="relative flex items-center">
        <span className="absolute left-3">
          <Icon 
            className="w-5 h-5"
            color={error ? '#013220' : (isFocused ? iconColor : '#013220')}
          />
        </span>
        <input
          type={showPassword ? 'text' : type}
          value={value}
          name={name}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value.length === 0 ? false : true)}
          className={`border ${error ? 'border-red-500 bg-red-50' : 'border-black'} p-2 pl-10 w-full rounded-md focus:outline-none ${
            error ? 'focus:ring-2 focus:ring-red-300' : 'focus:ring-2 focus:ring-green-300'
          } focus:border-transparent text-black`}
        />
        {(type === 'password' || name === 'reEnterPassword') && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 focus:outline-none"
          >
            {showPassword ? 
              <EyeOff className="w-5 h-5" color={error ? '#EF4444' : (isFocused ? iconColor : '#6B7280')} /> : 
              <Eye className="w-5 h-5" color={error ? '#EF4444' : (isFocused ? iconColor : '#6B7280')} />
            }
          </button>
        )}
        <label
          className={`absolute left-10 transition-all duration-200 text-[13px] md:text-sm ${
            isFocused || value 
              ? `top-[-10px] left-2 ${error ? 'text-red-500' : 'text-green-500'} text-[10px] md:text-sm bg-white px-1`
              : 'top-2 text-black'
          }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;