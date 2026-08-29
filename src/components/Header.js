import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const userInitials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U';

function ProfileControl({ onSignIn, theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return <div className="relative">
    <button onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-secondary-700 transition hover:border-primary-400 hover:text-primary-600 dark:border-secondary-700 dark:text-secondary-200 dark:hover:border-primary-500" aria-label={user?.user ? `Open ${user.user.name} profile` : 'Open profile menu'} aria-expanded={open}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-xs font-black text-white">{user?.user ? userInitials(user.user.name) : <i className="fas fa-user text-xs" aria-hidden="true" />}</span>
    </button>
    {open && <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-secondary-700 dark:bg-secondary-900">
      {user?.user ? <>
        <div className="border-b border-slate-100 px-3 py-2 dark:border-secondary-700"><p className="truncate text-sm font-bold text-secondary-900 dark:text-white">{user.user.name}</p><p className="text-xs capitalize text-secondary-500 dark:text-secondary-400">{user.user.role}</p></div>
        {user.user.role === 'admin' && <button onClick={() => { setOpen(false); window.dispatchEvent(new Event('bnioc-open-admin-console')); navigate('/matches?admin=1'); }} className="mt-2 block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-secondary-700 hover:bg-primary-50 hover:text-primary-600 dark:text-secondary-200 dark:hover:bg-secondary-800">Open academy console</button>}
      </> : <button onClick={() => { setOpen(false); onSignIn(); }} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-secondary-700 hover:bg-primary-50 hover:text-primary-600 dark:text-secondary-200 dark:hover:bg-secondary-800">Sign in</button>}
      <button onClick={toggleTheme} className="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-secondary-700 hover:bg-slate-100 dark:text-secondary-200 dark:hover:bg-secondary-800"><span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span><i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm`} aria-hidden="true" /></button>
      {user?.user && <button onClick={() => { logout(); setOpen(false); }} className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-secondary-700 hover:bg-slate-100 dark:text-secondary-200 dark:hover:bg-secondary-800">Sign out</button>}
    </div>}
  </div>;
}

const Header = ({ theme, toggleTheme, isMenuOpen, toggleMenu, onSignIn }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md border-b border-gray-200 dark:border-secondary-700 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img 
                src="/assets/logo.png" 
                alt="BNIOC Logo" 
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-secondary-900 p-1"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-secondary-900 dark:text-white font-primary">
                BNIOC
              </h1>
              <p className="text-xs lg:text-sm text-secondary-600 dark:text-secondary-300 font-secondary">
                Shaping the future of cricket stars
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <Link 
                to="/" 
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                About
              </Link>
              <Link 
                to="/founder" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/founder') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Founder
              </Link>
              <Link 
                to="/programs" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/programs') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Programs
              </Link>
              <Link 
                to="/facilities" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/facilities') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Facilities
              </Link>
              <Link 
                to="/achievements" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/achievements') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Achievements
              </Link>
              <Link 
                to="/gallery" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/gallery') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Gallery
              </Link>
              <Link 
                to="/news" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/news') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                News & Events
              </Link>
              <Link 
                to="/matches"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/matches')
                    ? 'bg-primary-500 text-white'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Matches
              </Link>
              <Link
                to="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/contact') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center space-x-2">
            <ProfileControl onSignIn={onSignIn} theme={theme} toggleTheme={toggleTheme} />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-secondary-900 border-t border-gray-200 dark:border-secondary-700">
            <Link 
              to="/" 
              className={`block whitespace-nowrap px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/founder" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/founder') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Founder
            </Link>
            <Link 
              to="/programs" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/programs') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Programs
            </Link>
            <Link 
              to="/facilities" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/facilities') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Facilities
            </Link>
            <Link 
              to="/achievements" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/achievements') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Achievements
            </Link>
            <Link 
              to="/gallery" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/gallery') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Gallery
            </Link>
            <Link 
              to="/news" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/news') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              News & Events
            </Link>
            <Link 
              to="/matches"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/matches')
                  ? 'bg-primary-500 text-white'
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Matches
            </Link>
            <Link
              to="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'bg-primary-500 text-white' 
                  : 'text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
