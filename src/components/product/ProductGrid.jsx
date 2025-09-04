import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProductGrid = ({ 
  products = [], 
  loading = false, 
  error = null,
  onAddToCart,
  columns = 'auto-fill',
  minWidth = '300px',
  gap = 'gap-6',
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-medical-red text-lg font-medium mb-2">
          Error loading products
        </div>
        <p className="text-dark-600">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-dark-900 mb-2">
          No products found
        </h3>
        <p className="text-dark-600">
          Try adjusting your search criteria or browse our categories.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-${columns} ${gap} ${className}`}
      style={{
        gridTemplateColumns: columns === 'auto-fill' 
          ? `repeat(auto-fill, minmax(${minWidth}, 1fr))`
          : undefined
      }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product._id || index}
          variants={itemVariants}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;