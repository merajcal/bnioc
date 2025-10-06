import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ theme, toggleTheme, isMenuOpen, toggleMenu }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <img src="/assets/logo.png" alt="BNIOC Logo" className="logo" />
            <div className="brand-text">
              <h1>BNIOC</h1>
              <span>Shaping the future of cricket stars</span>
            </div>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/founder" className={`nav-link ${isActive('/founder') ? 'active' : ''}`}>Founder</Link>
              </li>
              <li className="nav-item">
                <Link to="/programs" className={`nav-link ${isActive('/programs') ? 'active' : ''}`}>Programs</Link>
              </li>
              <li className="nav-item">
                <Link to="/facilities" className={`nav-link ${isActive('/facilities') ? 'active' : ''}`}>Facilities</Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>Gallery</Link>
              </li>
              <li className="nav-item">
                <Link to="/news" className={`nav-link ${isActive('/news') ? 'active' : ''}`}>News & Events</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="header-controls">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            
            <div className="nav-toggle" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
