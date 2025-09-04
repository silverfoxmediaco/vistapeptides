import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FilterIcon, 
  XIcon, 
  ChevronDownIcon,
  SearchIcon,
  SlidersIcon
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ProductFilters = ({ 
  filters,
  onFiltersChange,
  categories = [],
  manufacturers = [],
  priceRange = { min: 0, max: 1000 },
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    manufacturer: false,
    price: true,
    features: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    
    if (key === 'categories' || key === 'manufacturers' || key === 'features') {
      if (!newFilters[key]) newFilters[key] = [];
      
      if (newFilters[key].includes(value)) {
        newFilters[key] = newFilters[key].filter(item => item !== value);
      } else {
        newFilters[key] = [...newFilters[key], value];
      }
    } else {
      newFilters[key] = value;
    }
    
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      categories: [],
      manufacturers: [],
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      inStock: false,
      prescriptionRequired: false,
      features: []
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.categories?.length > 0 ||
      filters.manufacturers?.length > 0 ||
      filters.priceMin > priceRange.min ||
      filters.priceMax < priceRange.max ||
      filters.inStock ||
      filters.prescriptionRequired ||
      filters.features?.length > 0
    );
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-dark-100 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-dark-900">{title}</span>
        <ChevronDownIcon 
          className={`w-4 h-4 text-dark-500 transition-transform duration-200 ${
            expandedSections[sectionKey] ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const CheckboxFilter = ({ label, value, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group py-2">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-4 h-4 border-2 rounded transition-all duration-200 ${
          checked 
            ? 'bg-primary-500 border-primary-500' 
            : 'border-dark-300 group-hover:border-primary-400'
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-dark-700 group-hover:text-dark-900 transition-colors duration-200">
        {label} {value && `(${value})`}
      </span>
    </label>
  );

  return (
    <div className={className}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <SlidersIcon className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters() && (
            <span className="ml-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filters / Mobile Overlay */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-overlay md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Filter Panel */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-modal md:static md:w-full md:h-auto md:bg-transparent md:z-auto overflow-y-auto"
            >
              <Card className="h-full md:h-auto bg-white md:bg-glass-light md:backdrop-blur-lg">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-dark-100 md:hidden">
                  <h3 className="font-semibold text-lg text-dark-900">Filters</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-dark-500 hover:text-dark-700"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search || ''}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <FilterSection title="Categories" sectionKey="category">
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <CheckboxFilter
                          key={category.name}
                          label={category.name}
                          value={category.count}
                          checked={filters.categories?.includes(category.name) || false}
                          onChange={() => handleFilterChange('categories', category.name)}
                        />
                      ))}
                    </div>
                  </FilterSection>

                  {/* Manufacturers */}
                  <FilterSection title="Manufacturers" sectionKey="manufacturer">
                    <div className="space-y-1">
                      {manufacturers.map((manufacturer) => (
                        <CheckboxFilter
                          key={manufacturer.name}
                          label={manufacturer.name}
                          value={manufacturer.count}
                          checked={filters.manufacturers?.includes(manufacturer.name) || false}
                          onChange={() => handleFilterChange('manufacturers', manufacturer.name)}
                        />
                      ))}
                    </div>
                  </FilterSection>

                  {/* Price Range */}
                  <FilterSection title="Price Range" sectionKey="price">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-dark-700 mb-1">
                            Min Price
                          </label>
                          <input
                            type="number"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={filters.priceMin || priceRange.min}
                            onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-dark-700 mb-1">
                            Max Price
                          </label>
                          <input
                            type="number"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={filters.priceMax || priceRange.max}
                            onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </FilterSection>

                  {/* Features */}
                  <FilterSection title="Product Features" sectionKey="features">
                    <div className="space-y-1">
                      <CheckboxFilter
                        label="In Stock Only"
                        checked={filters.inStock || false}
                        onChange={() => handleFilterChange('inStock', !filters.inStock)}
                      />
                      <CheckboxFilter
                        label="Prescription Required"
                        checked={filters.prescriptionRequired || false}
                        onChange={() => handleFilterChange('prescriptionRequired', !filters.prescriptionRequired)}
                      />
                      <CheckboxFilter
                        label="FDA Approved"
                        checked={filters.features?.includes('FDA Approved') || false}
                        onChange={() => handleFilterChange('features', 'FDA Approved')}
                      />
                      <CheckboxFilter
                        label="Featured Products"
                        checked={filters.features?.includes('Featured') || false}
                        onChange={() => handleFilterChange('features', 'Featured')}
                      />
                      <CheckboxFilter
                        label="Bulk Pricing Available"
                        checked={filters.features?.includes('Bulk Pricing') || false}
                        onChange={() => handleFilterChange('features', 'Bulk Pricing')}
                      />
                    </div>
                  </FilterSection>

                  {/* Clear Filters */}
                  {hasActiveFilters() && (
                    <div className="mt-6 pt-4 border-t border-dark-100">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={clearFilters}
                        className="w-full"
                      >
                        <FilterIcon className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;