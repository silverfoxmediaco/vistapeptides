import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PaletteIcon, 
  TypeIcon, 
  LayoutIcon, 
  ComponentIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  ShieldCheckIcon,
  FlaskConicalIcon
} from 'lucide-react';
import MainHeader from '../components/MainHeader';
import './StyleGuideOption2.css';

const StyleGuideOption2 = () => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const peptideColors = [
    { name: 'Vista Blue', value: '#4FB7F4', variable: '--primary-blue' },
    { name: 'Vista Black', value: '#1A1A1A', variable: '--text-dark' },
    { name: 'Blue 100', value: '#CCE9FF', variable: '--blue-100' },
    { name: 'Blue 300', value: '#66BFFF', variable: '--blue-300' },
    { name: 'Blue 500', value: '#3BA5E8', variable: '--blue-500' },
    { name: 'Blue 700', value: '#1F6FA8', variable: '--blue-700' },
    { name: 'Blue 900', value: '#0B3052', variable: '--blue-900' },
  ];

  const typographySizes = [
    { name: '6XL', size: '90px', variable: '--text-6xl' },
    { name: '5XL', size: '67px', variable: '--text-5xl' },
    { name: '4XL', size: '50px', variable: '--text-4xl' },
    { name: '3XL', size: '38px', variable: '--text-3xl' },
    { name: '2XL', size: '28px', variable: '--text-2xl' },
    { name: 'XL', size: '21px', variable: '--text-xl' },
    { name: 'LG', size: '18px', variable: '--text-lg' },
    { name: 'Base', size: '16px', variable: '--text-base' },
  ];

  const spacingSizes = [
    { name: 'Space 2', size: '8px', variable: '--space-2' },
    { name: 'Space 4', size: '16px', variable: '--space-4' },
    { name: 'Space 6', size: '24px', variable: '--space-6' },
    { name: 'Space 8', size: '32px', variable: '--space-8' },
    { name: 'Space 12', size: '48px', variable: '--space-12' },
  ];

  const peptideProducts = [
    {
      name: 'Semaglutide',
      description: 'GLP-1 receptor agonist for diabetes and weight management',
      dosage: '0.25mg - 2.4mg weekly',
      badge: 'FDA Approved'
    },
    {
      name: 'Tirzepatide',
      description: 'Dual GIP/GLP-1 receptor agonist for enhanced metabolic control',
      dosage: '2.5mg - 15mg weekly',
      badge: 'New'
    },
    {
      name: 'BPC-157',
      description: 'Body protection compound for healing and recovery',
      dosage: '200-400mcg daily',
      badge: 'Research'
    }
  ];

  const ColorCard = ({ color, index, isDark = false }) => (
    <motion.div
      className={`peptide-color-card ${isDark ? 'dark' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div 
        className="peptide-color-swatch"
        style={{ backgroundColor: color.value }}
      />
      <div className="peptide-color-info">
        <h4 className="peptide-color-name">{color.name}</h4>
        <div 
          className="peptide-color-value"
          onClick={() => copyToClipboard(color.value, color.name)}
        >
          <span>{color.value}</span>
          {copiedText === color.name ? (
            <CheckIcon className="copy-icon success" />
          ) : (
            <CopyIcon className="copy-icon" />
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="peptide-style-guide">
      <MainHeader />
      {/* Header */}
      <header className="peptide-header" style={{ paddingTop: '150px' }}>
        <div className="container">
          <div className="peptide-header-content">
            <motion.div 
              className="peptide-logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/vistapeptideslogov2croppedEdited.png" 
                alt="Vista Peptides" 
                className="peptide-logo-img"
              />
            </motion.div>
            <motion.div 
              className="peptide-badge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ShieldCheckIcon className="badge-icon" />
              Physician Verified Platform
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="peptide-hero">
        <div className="peptide-hero-background" />
        <div className="container">
          <motion.div 
            className="peptide-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="peptide-hero-title">
              Brand & Style Guide
            </h1>
            <p className="peptide-hero-subtitle">
              Premium design system for Vista Peptides medical platform
            </p>
            <div className="peptide-hero-actions">
              <motion.button 
                className="peptide-btn peptide-btn-primary-dark"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlaskConicalIcon className="btn-icon" />
                Explore Components
              </motion.button>
              <motion.button 
                className="peptide-btn peptide-btn-secondary-light"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <DownloadIcon className="btn-icon" />
                Download Assets
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Colors - Dark Section */}
      <section className="peptide-section peptide-section-dark">
        <div className="container">
          <motion.div 
            className="peptide-section-header peptide-section-header-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title peptide-section-title-dark">Brand Colors</h2>
            <p className="peptide-section-subtitle peptide-section-subtitle-dark">
              Vista Peptides color palette for medical interface
            </p>
          </motion.div>

          <div className="peptide-card-white">
            <h3 className="peptide-subsection-title">Primary Colors</h3>
            <div className="peptide-color-grid">
              {peptideColors.map((color, index) => (
                <ColorCard key={color.name} color={color} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography - Light Section */}
      <section className="peptide-section peptide-section-light-texture">
        <div className="container">
          <motion.div 
            className="peptide-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title">Typography Scale</h2>
            <p className="peptide-section-subtitle">
              Poppins font family with precise scaling for medical applications
            </p>
          </motion.div>

          <div className="peptide-typography-showcase">
            {typographySizes.map((type, index) => (
              <motion.div
                key={type.name}
                className="peptide-typography-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="peptide-typography-info">
                  <span className="peptide-typography-name">{type.name}</span>
                  <span className="peptide-typography-size">{type.size}</span>
                </div>
                <div 
                  className="peptide-typography-example"
                  style={{ fontSize: type.size }}
                >
                  Medical Grade Typography
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Components - Dark Section */}
      <section className="peptide-section peptide-section-dark">
        <div className="container">
          <motion.div 
            className="peptide-section-header peptide-section-header-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title peptide-section-title-dark">Interactive Components</h2>
            <p className="peptide-section-subtitle peptide-section-subtitle-dark">
              UI elements designed for medical professionals
            </p>
          </motion.div>

          <div className="peptide-card-white">
            <div className="peptide-component-group">
              <h3 className="peptide-component-title">Button Variations</h3>
              <div className="peptide-button-showcase">
                <button className="peptide-btn peptide-btn-primary">Primary Action</button>
                <button className="peptide-btn peptide-btn-secondary">Secondary</button>
                <button className="peptide-btn peptide-btn-ghost">Ghost Button</button>
              </div>
            </div>

            <div className="peptide-component-group">
              <h3 className="peptide-component-title">Status Badges</h3>
              <div className="peptide-badge-showcase">
                <span className="peptide-status-badge peptide-badge-success">FDA Approved</span>
                <span className="peptide-status-badge peptide-badge-warning">Pending</span>
                <span className="peptide-status-badge peptide-badge-info">Research</span>
                <span className="peptide-status-badge peptide-badge-error">Restricted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards - Light Section */}
      <section className="peptide-section peptide-section-light-texture">
        <div className="container">
          <motion.div 
            className="peptide-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title">Peptide Product Cards</h2>
            <p className="peptide-section-subtitle">
              Medical product showcase with professional styling
            </p>
          </motion.div>

          <div className="peptide-card-showcase">
            {peptideProducts.map((product, index) => (
              <motion.div
                key={product.name}
                className="peptide-product-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(79, 183, 244, 0.15)' }}
              >
                <div className="peptide-product-header">
                  <h3 className="peptide-product-name">{product.name}</h3>
                  <span className={`peptide-product-badge peptide-badge-${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>
                </div>
                <p className="peptide-product-description">{product.description}</p>
                <div className="peptide-product-dosage">
                  <span className="peptide-dosage-label">Dosage:</span>
                  <span className="peptide-dosage-value">{product.dosage}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing System - Dark Section */}
      <section className="peptide-section peptide-section-dark">
        <div className="container">
          <motion.div 
            className="peptide-section-header peptide-section-header-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title peptide-section-title-dark">Spacing System</h2>
            <p className="peptide-section-subtitle peptide-section-subtitle-dark">
              8px base unit system for consistent layouts
            </p>
          </motion.div>

          <div className="peptide-card-white">
            <div className="peptide-spacing-showcase">
              {spacingSizes.map((space, index) => (
                <motion.div
                  key={space.name}
                  className="peptide-spacing-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="peptide-spacing-info">
                    <span className="peptide-spacing-name">{space.name}</span>
                    <span className="peptide-spacing-size">{space.size}</span>
                  </div>
                  <div className="peptide-spacing-visual">
                    <div 
                      className="peptide-spacing-bar"
                      style={{ width: space.size }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guidelines - Light Section */}
      <section className="peptide-section peptide-section-light-texture">
        <div className="container">
          <motion.div 
            className="peptide-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="peptide-section-title">Implementation Guidelines</h2>
            <p className="peptide-section-subtitle">
              Best practices for Vista Peptides platform
            </p>
          </motion.div>

          <div className="peptide-guidelines-grid">
            {[
              {
                title: 'Color Usage',
                description: 'Use Vista Blue for primary actions and medical credibility indicators'
              },
              {
                title: 'Typography',
                description: 'Maintain consistent hierarchy with Poppins font family'
              },
              {
                title: 'Spacing',
                description: 'Follow 8px base unit for all layout measurements'
              },
              {
                title: 'Accessibility',
                description: 'Ensure WCAG 2.1 AA compliance for medical applications'
              }
            ].map((guideline, index) => (
              <motion.div
                key={guideline.title}
                className="peptide-guideline-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="peptide-guideline-title">{guideline.title}</h3>
                <p className="peptide-guideline-description">{guideline.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="peptide-footer">
        <div className="container">
          <div className="peptide-footer-content">
            <motion.div 
              className="peptide-footer-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/vistapeptideslogov2croppedEdited.png" 
                alt="Vista Peptides" 
                className="peptide-footer-logo-img"
              />
            </motion.div>
            <p className="peptide-footer-text">
              © 2025 Vista Peptides. Brand & Style Guide v2.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StyleGuideOption2;