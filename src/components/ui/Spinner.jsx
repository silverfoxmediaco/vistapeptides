import React from 'react';

const Spinner = ({ 
  size = 'md',
  color = 'primary',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
  };

  const colors = {
    primary: 'text-primary-500',
    white: 'text-white',
    dark: 'text-dark-600',
    success: 'text-medical-green',
    warning: 'text-medical-orange',
    error: 'text-medical-red',
    info: 'text-medical-purple',
  };

  const sizeClasses = sizes[size];
  const colorClasses = colors[color];

  const spinnerClasses = `inline-block animate-spin ${sizeClasses} ${colorClasses} ${className}`.trim();

  return (
    <svg
      className={spinnerClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Spinner;