import React from 'react';

const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-dark-100 text-dark-700',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-medical-green/10 text-medical-green',
    warning: 'bg-medical-orange/10 text-medical-orange',
    error: 'bg-medical-red/10 text-medical-red',
    info: 'bg-primary-50 text-primary-600',
    medical: 'bg-medical-blue/10 text-medical-blue',
    outline: 'bg-transparent border border-dark-300 text-dark-600',
    'outline-primary': 'bg-transparent border border-primary-300 text-primary-600',
    'outline-success': 'bg-transparent border border-medical-green text-medical-green',
    'outline-warning': 'bg-transparent border border-medical-orange text-medical-orange',
    'outline-error': 'bg-transparent border border-medical-red text-medical-red',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const baseClasses = 'inline-flex items-center font-medium rounded-full whitespace-nowrap';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];

  const badgeClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;