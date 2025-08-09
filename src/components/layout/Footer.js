import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Copyright © 2025 Doccure. All Rights Reserved</p>
        </div>
        
        <div className="footer-center">
          <div className="footer-links">
            <a href="#" className="footer-link">Legal Notice</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-link">Refund Policy</a>
          </div>
        </div>
        
        <div className="footer-right">
          <div className="payment-methods">
            <div className="payment-icon visa">VISA</div>
            <div className="payment-icon amex">AMEX</div>
            <div className="payment-icon discover">DISCOVER</div>
            <div className="payment-icon mastercard">MC</div>
            <div className="payment-icon stripe">stripe</div>
            <div className="payment-icon paypal">PayPal</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
