import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>📱 MobileShowroom</h3>
            <p>Your destination for the latest mobile devices and accessories.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#phones">Phones</a></li>
              <li><a href="#tablets">Tablets</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p>📍 123 Tech Street-erode</p>
              <p>📧 kk@mobileshowroom.com</p>
              <p>📞 9597529504</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MobileShowroom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 