import React from 'react';
import './SidebarV2.css';
import { patientData } from '../../data/mockData';

const SidebarV2 = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="sidebar-v2">
      <div className="v2-banner">
        <div className="v2-avatar">
          <img src="https://i.pravatar.cc/160?img=32" alt="Patient Profile" />
          <div className="v2-badge">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
      </div>

      <div className="v2-profile">
        <h3 className="v2-name">{patientData.name}</h3>
        <p className="v2-id">Patient ID : {patientData.id}</p>
        <p className="v2-details">
          {patientData.gender}
          <span className="v2-dot">•</span>
          {patientData.age} years 03 Months
        </p>
      </div>

      <nav className="v2-nav">
        <button 
          className={`v2-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fa-solid fa-th-large"></i>
          <span>Dashboard</span>
        </button>

        <button 
          className={`v2-item ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <i className="fa-solid fa-calendar-alt"></i>
          <span>My Appointments</span>
        </button>

        <button 
          className={`v2-item ${activeTab === 'medical-records' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical-records')}
        >
          <i className="fa-solid fa-clipboard-list"></i>
          <span>Medical Records</span>
        </button>

        <button className="v2-item" onClick={onLogout}
        >
          <i className="fa-solid fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default SidebarV2;


