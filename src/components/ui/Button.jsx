import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-medical',
    secondary: 'bg-dark-100 hover:bg-dark-200 text-dark-900 focus:ring-dark-500 border border-dark-200',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-500 border border-primary-500 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-dark-50 text-dark-700 focus:ring-dark-500',
    success: 'bg-medical-green hover:bg-green-600 text-white focus:ring-medical-green',
    danger: 'bg-medical-red hover:bg-red-600 text-white focus:ring-medical-red',
    warning: 'bg-medical-orange hover:bg-orange-600 text-white focus:ring-medical-orange'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </>
  );

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;