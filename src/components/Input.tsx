import React from 'react';
import SearchIcon from '@/assets/icons/search.svg?react';



interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  contClassName?: string;
  icon?: boolean;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, className, contClassName, icon, ...props }) => {
  return (
    <div className={`relative flex items-center ${contClassName}`}>
      <div className='absolute to-[5px] left-2'>{icon && <SearchIcon />}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border p-2 pl-8 rounded w-full ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
