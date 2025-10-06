import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/assets/logo.png" alt="BNIOC Logo" className="footer-logo" />
              <h3>BNIOC</h3>
              <p>Shaping the future of cricket stars through world-class training and mentorship.</p>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com/bnioc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/bnioc_cricket" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/bnioc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com/bnioc" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Programs</h4>
            <ul className="footer-links">
              <li><a href="#programs">Weekend Warriors</a></li>
              <li><a href="#programs">Night Owls</a></li>
              <li><a href="#programs">Daily Champions</a></li>
              <li><a href="#programs">Summer Camp</a></li>
              <li><a href="#programs">Elite Academy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p><i className="fas fa-map-marker-alt"></i> Global White Pearl, Panditana Agrahara, Bengaluru</p>
              <p><i className="fas fa-phone"></i> +91 79740 94110</p>
              <p><i className="fas fa-envelope"></i> info@batkhelo.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2024 BNIOC - Bengaluru Nex-Gen Institute of Cricket. All rights reserved.</p>
          </div>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
