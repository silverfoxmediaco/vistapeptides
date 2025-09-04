import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon, CheckIcon, ExclamationTriangleIcon } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/format';

const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const {
    _id,
    name,
    manufacturer,
    category,
    description,
    pricing,
    images,
    averageRating,
    reviewCount,
    inStock,
    prescription,
    compliance,
    featured
  } = product;

  const basePrice = pricing.tiers?.[0]?.price || pricing.basePrice || 0;
  const hasDiscount = pricing.tiers?.[0]?.discount > 0;
  const discountedPrice = hasDiscount ? basePrice * (1 - pricing.tiers[0].discount) : basePrice;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const getStockStatus = () => {
    if (!inStock) return { text: 'Out of Stock', color: 'text-medical-red', icon: ExclamationTriangleIcon };
    if (product.inventory?.quantity < 10) return { text: 'Low Stock', color: 'text-orange-600', icon: ExclamationTriangleIcon };
    return { text: 'In Stock', color: 'text-emerald-600', icon: CheckIcon };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card className="group overflow-hidden h-full bg-glass-light backdrop-blur-lg border-dark-100">
        <Link to={`/products/${_id}`} className="block">
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-medical-red text-white text-xs font-semibold px-2 py-1 rounded-full">
                -{Math.round(pricing.tiers[0].discount * 100)}%
              </span>
            </div>
          )}

          {/* Product Image */}
          <div className="relative overflow-hidden bg-gradient-medical aspect-video">
            {images && images.length > 0 ? (
              <img
                src={images[0]}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dark-50">
                <div className="text-6xl text-dark-300">💊</div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {/* Category & Manufacturer */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs text-dark-500">{manufacturer}</span>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-lg text-dark-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-dark-600 mb-4 line-clamp-2">
              {description}
            </p>

            {/* Rating */}
            {averageRating > 0 && (
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-dark-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-dark-600 ml-2">
                  {averageRating.toFixed(1)} ({reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center mb-4">
              <StockIcon className={`w-4 h-4 ${stockStatus.color} mr-2`} />
              <span className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>

            {/* Prescription Requirements */}
            {prescription.required && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="text-xs font-medium text-yellow-800">
                    Prescription Required
                  </span>
                </div>
                {prescription.restrictions.length > 0 && (
                  <p className="text-xs text-yellow-700 mt-1">
                    {prescription.restrictions[0]}
                  </p>
                )}
              </div>
            )}

            {/* Compliance Badges */}
            {compliance.fda && (
              <div className="flex items-center mb-4">
                <CheckIcon className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-xs font-medium text-emerald-700">FDA Compliant</span>
              </div>
            )}

            {/* Pricing */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-dark-900">
                    {formatCurrency(discountedPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-dark-500 line-through">
                      {formatCurrency(basePrice)}
                    </span>
                  )}
                </div>
                {pricing.unit && (
                  <span className="text-sm text-dark-600">per {pricing.unit}</span>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div className="px-6 pb-6">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;