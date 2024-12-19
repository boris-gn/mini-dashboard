import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', className, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} px-4 py-2 bg-white text-blue-500 border rounded hover:bg-blue-700 hover:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
