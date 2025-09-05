import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PaletteIcon, 
  TypeIcon, 
  LayoutIcon, 
  ComponentIcon,
  CopyIcon,
  CheckIcon,
  DownloadIcon
} from 'lucide-react';
import './StyleGuideOption1.css';

const StyleGuide = () => {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const colorPalette = [
    { name: 'Primary Blue', value: '#4DACF2', variable: '--primary-blue' },
    { name: 'Primary Dark', value: '#1A1A1A', variable: '--primary-dark' },
    { name: 'Blue 100', value: '#D7EFFF', variable: '--blue-100' },
    { name: 'Blue 300', value: '#87D0FD', variable: '--blue-300' },
    { name: 'Blue 500', value: '#4DACF2', variable: '--blue-500' },
    { name: 'Blue 700', value: '#1E7BBF', variable: '--blue-700' },
    { name: 'Blue 900', value: '#0D3D62', variable: '--blue-900' },
  ];

  const semanticColors = [
    { name: 'Success', value: '#10B981', variable: '--success' },
    { name: 'Warning', value: '#F59E0B', variable: '--warning' },
    { name: 'Error', value: '#EF4444', variable: '--error' },
    { name: 'Info', value: '#4DACF2', variable: '--info' },
  ];

  const typographyScale = [
    { name: 'Text XS', size: '12px', variable: '--text-xs' },
    { name: 'Text SM', size: '14px', variable: '--text-sm' },
    { name: 'Text Base', size: '16px', variable: '--text-base' },
    { name: 'Text LG', size: '18px', variable: '--text-lg' },
    { name: 'Text XL', size: '21px', variable: '--text-xl' },
    { name: 'Text 2XL', size: '28px', variable: '--text-2xl' },
    { name: 'Text 3XL', size: '38px', variable: '--text-3xl' },
    { name: 'Text 4XL', size: '50px', variable: '--text-4xl' },
  ];

  const spacingScale = [
    { name: 'Space 1', size: '4px', variable: '--space-1' },
    { name: 'Space 2', size: '8px', variable: '--space-2' },
    { name: 'Space 4', size: '16px', variable: '--space-4' },
    { name: 'Space 6', size: '24px', variable: '--space-6' },
    { name: 'Space 8', size: '32px', variable: '--space-8' },
    { name: 'Space 12', size: '48px', variable: '--space-12' },
    { name: 'Space 16', size: '64px', variable: '--space-16' },
    { name: 'Space 24', size: '96px', variable: '--space-24' },
  ];

  const ColorCard = ({ color, index }) => (
    <motion.div
      className="color-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div 
        className="color-swatch"
        style={{ backgroundColor: color.value }}
      />
      <div className="color-info">
        <h3 className="color-name">{color.name}</h3>
        <div className="color-values">
          <div 
            className="color-value"
            onClick={() => copyToClipboard(color.value, color.name)}
          >
            <span className="color-hex">{color.value}</span>
            {copiedText === color.name ? (
              <CheckIcon className="copy-icon success" />
            ) : (
              <CopyIcon className="copy-icon" />
            )}
          </div>
          <div 
            className="color-variable"
            onClick={() => copyToClipboard(color.variable, `${color.name} Variable`)}
          >
            <span>{color.variable}</span>
            {copiedText === `${color.name} Variable` ? (
              <CheckIcon className="copy-icon success" />
            ) : (
              <CopyIcon className="copy-icon" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="style-guide">
      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <PaletteIcon className="badge-icon" />
              Design System v2.1
            </div>
            <h1 className="hero-title">
              Vista RX MD
              <span className="hero-subtitle">Brand & Style Guide</span>
            </h1>
            <p className="hero-description">
              Comprehensive design system for the Vista RX MD medical platform. 
              Built for consistency, accessibility, and professional healthcare aesthetics.
            </p>
            <div className="hero-actions">
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <DownloadIcon className="btn-icon" />
                Download Assets
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Components
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="/vistamdlogo - Edited.png" 
              alt="Vista RX MD" 
              className="logo-showcase"
            />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="style-nav">
        <div className="container">
          <div className="nav-links">
            <a href="#colors" className="nav-link">
              <PaletteIcon className="nav-icon" />
              Colors
            </a>
            <a href="#typography" className="nav-link">
              <TypeIcon className="nav-icon" />
              Typography
            </a>
            <a href="#spacing" className="nav-link">
              <LayoutIcon className="nav-icon" />
              Spacing
            </a>
            <a href="#components" className="nav-link">
              <ComponentIcon className="nav-icon" />
              Components
            </a>
          </div>
        </div>
      </nav>

      {/* Colors Section */}
      <section id="colors" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Color System</h2>
            <p className="section-description">
              Our medical-grade color palette ensures accessibility and professional presentation
            </p>
          </motion.div>

          {/* Primary Colors */}
          <div className="subsection">
            <h3 className="subsection-title">Primary Palette</h3>
            <div className="color-grid">
              {colorPalette.map((color, index) => (
                <ColorCard key={color.name} color={color} index={index} />
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="subsection">
            <h3 className="subsection-title">Semantic Colors</h3>
            <div className="color-grid">
              {semanticColors.map((color, index) => (
                <ColorCard key={color.name} color={color} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section id="typography" className="section section-alt">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Typography Scale</h2>
            <p className="section-description">
              Perfect fourth scale (1.333) for harmonious text hierarchy
            </p>
          </motion.div>

          <div className="typography-showcase">
            {typographyScale.map((type, index) => (
              <motion.div
                key={type.name}
                className="typography-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="typography-info">
                  <span className="typography-name">{type.name}</span>
                  <span className="typography-size">{type.size}</span>
                </div>
                <div 
                  className="typography-example"
                  style={{ fontSize: type.size }}
                >
                  The quick brown fox jumps
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section id="spacing" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Spacing System</h2>
            <p className="section-description">
              8px base unit system for consistent layouts
            </p>
          </motion.div>

          <div className="spacing-showcase">
            {spacingScale.map((space, index) => (
              <motion.div
                key={space.name}
                className="spacing-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="spacing-info">
                  <span className="spacing-name">{space.name}</span>
                  <span className="spacing-size">{space.size}</span>
                </div>
                <div className="spacing-visual">
                  <div 
                    className="spacing-bar"
                    style={{ width: space.size }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Textures Section */}
      <section className="section section-alt">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Background Textures</h2>
            <p className="section-description">
              Sophisticated textures for depth and visual interest
            </p>
          </motion.div>

          <div className="texture-grid">
            {[
              { name: 'Dots Pattern', class: 'bg-texture-dots' },
              { name: 'Grid Pattern', class: 'bg-texture-grid' },
              { name: 'Wave Pattern', class: 'bg-texture-waves' },
              { name: 'Medical Cross', class: 'bg-texture-medical' },
              { name: 'Gradient Mesh', class: 'bg-gradient-mesh' },
              { name: 'Glass Light', class: 'bg-glass-light' },
            ].map((texture, index) => (
              <motion.div
                key={texture.name}
                className={`texture-card ${texture.class}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="texture-overlay">
                  <h4 className="texture-name">{texture.name}</h4>
                  <code className="texture-class">.{texture.class}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section id="components" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Component Examples</h2>
            <p className="section-description">
              Key UI components with Vista RX MD styling
            </p>
          </motion.div>

          <div className="components-showcase">
            {/* Button Examples */}
            <div className="component-group">
              <h3 className="component-title">Buttons</h3>
              <div className="button-examples">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-outline">Outline Button</button>
                <button className="btn-ghost">Ghost Button</button>
              </div>
            </div>

            {/* Card Example */}
            <div className="component-group">
              <h3 className="component-title">Cards</h3>
              <div className="card-example">
                <div className="card-header">
                  <h4>Medical Information Card</h4>
                  <span className="card-badge">Verified</span>
                </div>
                <div className="card-content">
                  <p>Professional medical platform interface with glass morphism effects and medical-grade color scheme.</p>
                </div>
                <div className="card-actions">
                  <button className="btn-primary btn-sm">Learn More</button>
                  <button className="btn-ghost btn-sm">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="style-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/vistamdlogo - Edited.png" 
                alt="Vista RX MD" 
                className="footer-logo-img"
              />
            </div>
            <p className="footer-text">
              © 2025 Vista RX MD. Brand & Style Guide v2.1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StyleGuide;