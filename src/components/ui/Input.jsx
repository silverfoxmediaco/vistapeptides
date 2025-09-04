import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text',
  variant = 'default',
  size = 'md',
  error = false,
  success = false,
  disabled = false,
  label,
  helperText,
  errorText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props 
}, ref) => {
  const variants = {
    default: 'border-dark-200 focus:border-primary-500 focus:ring-primary-100',
    outline: 'border-2 border-primary-300 focus:border-primary-500 focus:ring-primary-100',
    filled: 'bg-dark-50 border-dark-200 focus:bg-white focus:border-primary-500 focus:ring-primary-100',
    medical: 'border-medical-green/30 focus:border-medical-green focus:ring-medical-green/20',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const states = {
    error: 'border-medical-red focus:border-medical-red focus:ring-medical-red/20',
    success: 'border-medical-green focus:border-medical-green focus:ring-medical-green/20',
    disabled: 'bg-dark-50 text-dark-400 cursor-not-allowed opacity-60',
  };

  const getStateClasses = () => {
    if (disabled) return states.disabled;
    if (error) return states.error;
    if (success) return states.success;
    return variants[variant];
  };

  const baseClasses = 'w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 placeholder:text-dark-400';
  const sizeClasses = sizes[size];
  const stateClasses = getStateClasses();
  const iconPadding = {
    left: LeftIcon ? (size === 'sm' ? 'pl-10' : size === 'lg' ? 'pl-14' : 'pl-12') : '',
    right: RightIcon ? (size === 'sm' ? 'pr-10' : size === 'lg' ? 'pr-14' : 'pr-12') : '',
  };

  const inputClasses = `${baseClasses} ${sizeClasses} ${stateClasses} ${iconPadding.left} ${iconPadding.right} ${className}`.trim();

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconPositions = {
    left: size === 'sm' ? 'left-3' : size === 'lg' ? 'left-4' : 'left-3',
    right: size === 'sm' ? 'right-3' : size === 'lg' ? 'right-4' : 'right-3',
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium text-dark-700 mb-2 ${labelClassName}`}>
          {label}
          {props.required && <span className="text-medical-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className={`absolute ${iconPositions.left} top-1/2 transform -translate-y-1/2 text-dark-400 pointer-events-none`}>
            <LeftIcon className={iconSizes[size]} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        
        {RightIcon && (
          <div className={`absolute ${iconPositions.right} top-1/2 transform -translate-y-1/2 text-dark-400 pointer-events-none`}>
            <RightIcon className={iconSizes[size]} />
          </div>
        )}
      </div>
      
      {(helperText || errorText) && (
        <p className={`mt-2 text-sm ${error ? 'text-medical-red' : 'text-dark-600'}`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;