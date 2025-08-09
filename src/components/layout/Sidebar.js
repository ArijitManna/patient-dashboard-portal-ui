import React from 'react';
import './Sidebar.css';
import { patientData } from '../../data/mockData';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      {/* Dark Blue Background Section with Pattern */}
      <div className="sidebar-bg">
        <div className="bg-pattern">
          <div className="pattern-icon">❤️</div>
          <div className="pattern-icon">🏥</div>
          <div className="pattern-icon">🔬</div>
          <div className="pattern-icon">👨‍⚕️</div>
          <div className="pattern-icon">🩹</div>
          <div className="pattern-icon">🩺</div>
          <div className="pattern-icon">💊</div>
          <div className="pattern-icon">👩‍⚕️</div>
          <div className="pattern-icon">⏰</div>
        </div>
      </div>
      
      {/* Patient Profile Section */}
      <div className="patient-profile">
        <div className="profile-image-container">
          <div className="profile-image">
            <img 
              src="https://i.pravatar.cc/120?img=32" 
              alt="Patient Profile" 
            />
            <div className="verification-badge">
              <i className="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
        
        <div className="patient-info">
          <h3 className="patient-name">{patientData.name}</h3>
          <p className="patient-id">Patient ID : {patientData.id}</p>
          <p className="patient-details">
            {patientData.gender} 
            <span className="separator-dot">•</span> 
            {patientData.age} years 03 Months
          </p>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fa-solid fa-th-large"></i>
          <span>Dashboard</span>
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <i className="fa-solid fa-calendar-alt"></i>
          <span>My Appointments</span>
        </button>
        
        <button 
          className={`nav-item ${activeTab === 'medical-records' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical-records')}
        >
          <i className="fa-solid fa-clipboard-list"></i>
          <span>Medical Records</span>
        </button>
        
        <button className="nav-item">
          <i className="fa-solid fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
