import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MenuIcon, 
  XIcon, 
  UserIcon, 
  ShoppingCartIcon,
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  FileTextIcon
} from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Products', href: '/products', current: location.pathname === '/products' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Support', href: '/support', current: location.pathname === '/support' },
  ];

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserIcon },
    { name: 'Order History', href: '/orders', icon: FileTextIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-dark-100 sticky top-0 z-sticky">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/vistamdlogo.png" 
              alt="Vista RX MD" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gradient hidden sm:block">
              Vista RX MD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-dark-600 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-dark-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-dark-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-dark-700">
                    {user.profile?.firstName}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 text-dark-400" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-dark-200 py-2"
                  >
                    <div className="px-4 py-3 border-b border-dark-100">
                      <p className="text-sm font-medium text-dark-900">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-dark-600">{user.email}</p>
                    </div>
                    
                    {userNavigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-dark-700 hover:bg-dark-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                    
                    <hr className="my-2 border-dark-100" />
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-medical-red hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOutIcon className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" as={Link} to="/login">
                  Login
                </Button>
                <Button variant="primary" size="sm" as={Link} to="/register">
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-dark-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-100 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium ${
                    item.current
                      ? 'text-primary-600'
                      : 'text-dark-700 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <hr className="border-dark-200" />
              
              {user ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-900">{user.fullName}</p>
                      <p className="text-sm text-dark-600">{user.email}</p>
                    </div>
                  </div>
                  
                  {userNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-3 text-dark-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-medical-red"
                  >
                    <LogOutIcon className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button 
                    variant="outline" 
                    size="md" 
                    as={Link} 
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    as={Link} 
                    to="/register"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Button>
                </div>
              )}
              
              <Link
                to="/cart"
                className="flex items-center justify-between p-3 bg-dark-50 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCartIcon className="w-6 h-6 text-dark-600" />
                  <span className="font-medium">Shopping Cart</span>
                </div>
                {itemCount > 0 && (
                  <span className="bg-primary-500 text-white text-sm px-2 py-1 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;