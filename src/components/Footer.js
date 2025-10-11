import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/logo.png" 
                alt="BNIOC Logo" 
                className="h-12 w-12 rounded-full bg-white p-1"
              />
              <div>
                <h3 className="text-2xl font-bold text-white font-primary">BNIOC</h3>
                <p className="text-sm text-gray-300 font-secondary">Cricket Academy</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Shaping the future of cricket stars through world-class training and mentorship at Bengaluru's premier cricket academy.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/bnioc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-white"></i>
              </a>
              <a 
                href="https://instagram.com/bnioc_cricket" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-white"></i>
              </a>
              <a 
                href="https://twitter.com/bnioc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a 
                href="https://youtube.com/bnioc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-white"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/facilities" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-primary">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Summer Camp
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Annual Academy
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Weekend Coaching
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Individual Coaching
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  Elite Training
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-primary">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-primary-400 mt-1 flex-shrink-0"></i>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Global White Pearl, Panditana Agrahara, Bengaluru, Karnataka 562125
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary-400 flex-shrink-0"></i>
                <div>
                  <p className="text-gray-300 text-sm">+91 79740 94110</p>
                  <p className="text-gray-300 text-sm">+91 88811 13107</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary-400 flex-shrink-0"></i>
                <a 
                  href="mailto:info@batkhelo.com" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  info@batkhelo.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2024 BNIOC - Bengaluru Nex-Gen Institute of Cricket. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="#privacy" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
