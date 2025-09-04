import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import Button from './Button';

const Modal = ({ 
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  variant = 'default',
  className = '',
  overlayClassName = '',
  contentClassName = '',
  ...props 
}) => {
  const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full mx-4',
  };

  const variants = {
    default: 'bg-white',
    glass: 'glass',
    'glass-dark': 'glass-dark',
    medical: 'bg-white border-2 border-primary-200',
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const baseOverlayClasses = 'fixed inset-0 z-modal flex items-center justify-center p-4';
  const overlayBackgroundClasses = 'bg-dark-950/50 backdrop-blur-sm';
  const overlayClasses = `${baseOverlayClasses} ${overlayBackgroundClasses} ${overlayClassName}`.trim();

  const baseModalClasses = 'relative w-full rounded-2xl shadow-xl';
  const sizeClasses = sizes[size];
  const variantClasses = variants[variant];
  const modalClasses = `${baseModalClasses} ${sizeClasses} ${variantClasses} ${contentClassName}`.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={overlayClasses}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          {...props}
        >
          <motion.div
            className={modalClasses}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 pb-4">
                {title && (
                  <h2 
                    id="modal-title"
                    className="text-xl font-semibold text-dark-900"
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 ml-auto -mr-2"
                    aria-label="Close modal"
                  >
                    <XIcon className="w-5 h-5" />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={`px-6 ${title || showCloseButton ? 'pb-6' : 'py-6'} ${className}`}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Compound components for better organization
Modal.Header = ({ children, className = '' }) => (
  <div className={`px-6 pt-6 pb-4 ${className}`}>
    {children}
  </div>
);

Modal.Body = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

Modal.Footer = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 pt-4 flex items-center justify-end space-x-3 ${className}`}>
    {children}
  </div>
);

export default Modal;