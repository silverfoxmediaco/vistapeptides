import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  className = '', 
  hover = true,
  glass = false,
  texture = null,
  padding = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-dark-100 shadow-card',
    glass: 'glass',
    'glass-dark': 'glass-dark',
    primary: 'bg-primary-50 border border-primary-200',
    medical: 'bg-white border border-medical-green/20 shadow-medical',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const textureClasses = {
    dots: 'texture-dots',
    grid: 'texture-grid',
    medical: 'texture-medical',
    waves: 'texture-waves',
    'gradient-mesh': 'texture-gradient-mesh',
  };

  const baseClasses = 'rounded-2xl transition-all duration-300';
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  const variantClasses = glass ? variants.glass : variants[variant];
  const paddingClasses = paddings[padding];
  const textureClass = texture ? textureClasses[texture] : '';

  const cardClasses = `${baseClasses} ${variantClasses} ${paddingClasses} ${hoverClasses} ${textureClass} ${className}`.trim();

  const MotionCard = motion.div;

  return (
    <MotionCard
      className={cardClasses}
      initial={hover ? { scale: 1 } : false}
      whileHover={hover ? { 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

export default Card;