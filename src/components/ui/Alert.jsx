import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  XIcon
} from 'lucide-react';

const Alert = ({ 
  type = 'info',
  variant = 'default',
  size = 'md',
  title,
  message,
  children,
  onClose,
  showIcon = true,
  className = '',
  ...props 
}) => {
  const types = {
    success: {
      icon: CheckCircleIcon,
      colors: {
        default: 'bg-medical-green/10 border-medical-green/20 text-medical-green',
        filled: 'bg-medical-green text-white',
        outlined: 'bg-transparent border-medical-green text-medical-green border-2',
      }
    },
    warning: {
      icon: ExclamationTriangleIcon,
      colors: {
        default: 'bg-medical-orange/10 border-medical-orange/20 text-medical-orange',
        filled: 'bg-medical-orange text-white',
        outlined: 'bg-transparent border-medical-orange text-medical-orange border-2',
      }
    },
    error: {
      icon: XCircleIcon,
      colors: {
        default: 'bg-medical-red/10 border-medical-red/20 text-medical-red',
        filled: 'bg-medical-red text-white',
        outlined: 'bg-transparent border-medical-red text-medical-red border-2',
      }
    },
    info: {
      icon: InformationCircleIcon,
      colors: {
        default: 'bg-primary-50 border-primary-200 text-primary-700',
        filled: 'bg-primary-500 text-white',
        outlined: 'bg-transparent border-primary-500 text-primary-500 border-2',
      }
    },
  };

  const sizes = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const typeConfig = types[type];
  const Icon = typeConfig.icon;
  const colorClasses = typeConfig.colors[variant];
  const sizeClasses = sizes[size];
  const iconSizeClasses = iconSizes[size];

  const baseClasses = 'rounded-xl border flex items-start gap-3 relative';
  const alertClasses = `${baseClasses} ${colorClasses} ${sizeClasses} ${className}`.trim();

  const textColorClass = variant === 'filled' ? 'text-white' : 
                        variant === 'outlined' ? typeConfig.colors.outlined.split(' ').find(c => c.startsWith('text-')) :
                        'text-dark-900';

  return (
    <motion.div
      className={alertClasses}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      role="alert"
      {...props}
    >
      {/* Icon */}
      {showIcon && (
        <Icon className={`${iconSizeClasses} flex-shrink-0 mt-0.5`} />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-semibold mb-1 ${textColorClass}`}>
            {title}
          </h4>
        )}
        
        {message && (
          <p className={`${title ? 'text-sm' : ''} ${
            variant === 'filled' ? 'text-white/90' : 
            variant === 'outlined' ? 'text-current opacity-80' :
            'text-dark-600'
          }`}>
            {message}
          </p>
        )}
        
        {children && (
          <div className={`${title || message ? 'mt-2' : ''}`}>
            {children}
          </div>
        )}
      </div>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded-lg transition-colors duration-200 ${
            variant === 'filled' 
              ? 'hover:bg-white/20 text-white/80 hover:text-white' 
              : 'hover:bg-dark-100 text-dark-400 hover:text-dark-600'
          }`}
          aria-label="Close alert"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;