import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MenuIcon, 
  XIcon, 
  UserIcon, 
  ShoppingCartIcon,
  SearchIcon,
  PhoneIcon,
  MailIcon
} from 'lucide-react';
import './MainHeader.css';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', id: 'nav-home' },
    { name: 'Style Guide 1', href: '/style-guide-1', id: 'nav-style-guide-1' },
    { name: 'Style Guide 2', href: '/style-guide-2', id: 'nav-style-guide-2' },
    { name: 'Proposal', href: '/proposal', id: 'nav-proposal' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className={`main-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <div className="contact-item">
                <PhoneIcon className="contact-icon" />
                <span>(855) VISTA-MD</span>
              </div>
              <div className="contact-item">
                <MailIcon className="contact-icon" />
                <span>support@vistamd.com</span>
              </div>
            </div>
            <div className="top-bar-actions">
              <span className="physician-portal">Physician Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <motion.div 
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="logo-link" id="main-logo-link">
                <img 
                  src="/vistapeptideslogov2croppedEdited.png" 
                  alt="Vista Peptides" 
                  className="logo-image"
                  id="main-logo-image"
                />
                
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <div className="nav-links">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      to={item.href}
                      className="nav-link"
                      id={item.id}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="desktop-actions">
              <motion.button 
                className="search-btn"
                id="search-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SearchIcon className="action-icon" />
              </motion.button>
              
              <motion.button 
                className="cart-btn"
                id="cart-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCartIcon className="action-icon" />
                <span className="cart-badge" id="cart-count">3</span>
              </motion.button>
              
              <motion.button 
                className="user-btn"
                id="user-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserIcon className="action-icon" />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button 
              className="mobile-menu-toggle"
              id="mobile-menu-toggle"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <XIcon className="menu-icon" />
              ) : (
                <MenuIcon className="menu-icon" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        id="mobile-menu-overlay"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'all' : 'none'
        }}
      >
        <div 
          className="mobile-menu-content"
          id="mobile-menu-content"
          style={{
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          <div className="mobile-nav-links">
            {navigation.map((item, index) => (
              <div
                key={item.name}
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(50px)',
                  transition: `all 0.3s ease ${isMenuOpen ? index * 0.1 : 0}s`
                }}
              >
                <Link
                  to={item.href}
                  className="mobile-nav-link"
                  id={`mobile-${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mobile-actions">
            <button className="mobile-action-btn primary" id="mobile-login">
              Sign In
            </button>
            <button className="mobile-action-btn secondary" id="mobile-signup">
              Get Started
            </button>
          </div>

          <div className="mobile-contact">
            <div className="mobile-contact-item">
              <PhoneIcon className="contact-icon" />
              <span>(855) VISTA-RX</span>
            </div>
            <div className="mobile-contact-item">
              <MailIcon className="contact-icon" />
              <span>support@vistarxmd.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      {isMenuOpen && (
        <motion.div 
          className="menu-backdrop"
          id="mobile-menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.header>
  );
};

export default MainHeader;