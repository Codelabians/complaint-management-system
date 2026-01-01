import React from "react";

const Button = ({ children, onClick, icon , className, disabled}) => {
  return (
    <button 
    className={`flex items-center w-full justify-center  gap-x-2 px-12 py-3 bg-orange hover:bg-lightorange text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors ${className}`}
    onClick={onClick}
    disabled={disabled}
    >
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
