import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>
              <span className="logo-text">DOC</span>
              <span className="stethoscope-u">U</span>
              <span className="logo-text">RE</span>
            </h2>
          </div>
          <div className="header-actions">
            <button className="header-icon" title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className="header-icon" title="Settings">
              <i className="fa-solid fa-sliders"></i>
            </button>
            <button className="header-icon notification-icon" title="Notifications">
              <i className="fa-solid fa-bell"></i>
              <span className="notification-dot red"></span>
            </button>
            <button className="header-icon notification-icon" title="Messages">
              <i className="fa-solid fa-comment-dots"></i>
              <span className="notification-dot green"></span>
            </button>
            <div className="user-menu" onClick={toggleDropdown} ref={dropdownRef}>
              <img 
                src="https://i.pravatar.cc/120?img=32" 
                alt="User Profile" 
                className="user-avatar"
              />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <img 
                      src="https://i.pravatar.cc/120?img=32" 
                      alt="Hendrita Hayes" 
                      className="dropdown-avatar"
                    />
                    <div className="dropdown-user-info">
                      <h4>Hendrita Hayes</h4>
                      <span>Patient</span>
                    </div>
                  </div>
                  <div className="dropdown-items">
                    <a href="#" className="dropdown-item">
                      <i className="fa-solid fa-th-large"></i>
                      <span>Dashboard</span>
                    </a>
                    <a href="#" className="dropdown-item">
                      <i className="fa-solid fa-user-cog"></i>
                      <span>Profile Settings</span>
                    </a>
                    <a href="#" className="dropdown-item logout">
                      <i className="fa-solid fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
