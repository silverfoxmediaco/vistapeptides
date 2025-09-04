import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';

const Select = ({ 
  options = [],
  value = '',
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  success = false,
  label,
  helperText,
  errorText,
  size = 'md',
  variant = 'default',
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(opt => opt.value === value) || null
  );
  const selectRef = useRef(null);
  const listRef = useRef(null);

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

  const baseClasses = 'w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer flex items-center justify-between';
  const sizeClasses = sizes[size];
  const stateClasses = getStateClasses();

  const triggerClasses = `${baseClasses} ${sizeClasses} ${stateClasses} ${className}`.trim();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        selectRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Focus next option logic could be added here
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Focus previous option logic could be added here
        break;
      case 'Enter':
        event.preventDefault();
        // Select focused option logic could be added here
        break;
    }
  };

  return (
    <div className={`relative ${containerClassName}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-dark-700 mb-2">
          {label}
          {props.required && <span className="text-medical-red ml-1">*</span>}
        </label>
      )}
      
      <div 
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={selectedOption ? 'text-dark-900' : 'text-dark-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon 
          className={`w-5 h-5 text-dark-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </div>

      {isOpen && (
        <div 
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-white border border-dark-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-dark-400">No options available</div>
          ) : (
            options.map((option, index) => {
              const isSelected = selectedOption?.value === option.value;
              return (
                <div
                  key={option.value || index}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'hover:bg-dark-50 text-dark-900'
                  }`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="block truncate">{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-primary-600" />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
      
      {(helperText || errorText) && (
        <p className={`mt-2 text-sm ${error ? 'text-medical-red' : 'text-dark-600'}`}>
          {error ? errorText : helperText}
        </p>
      )}
    </div>
  );
};

export default Select;