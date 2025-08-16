import React from 'react';
import './RegistrationHeader.css';

const RegistrationHeader = ({ onPageChange }) => {
  return (
    <header className="registration-header">
      <div className="header-container">
        <div className="logo">
          <h2>
            <span className="logo-text">DOC</span>
            <span className="stethoscope-u">U</span>
            <span className="logo-text">RE</span>
          </h2>
        </div>
        
        <div className="header-actions">
          <button className="signup-btn">
            <i className="fa-solid fa-lock"></i>
            Sign Up
          </button>
          <button className="register-btn">
            <i className="fa-solid fa-user-plus"></i>
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;
