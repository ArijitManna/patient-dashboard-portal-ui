import React from 'react';
import './SidebarV2.css';

const SidebarV2 = ({ activeTab, setActiveTab, onLogout, patientData, isLoadingPatient, patientError }) => {
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
        {isLoadingPatient ? (
          <div className="v2-loading">Loading patient data...</div>
        ) : patientError ? (
          <div className="v2-error">Failed to load patient data</div>
        ) : patientData ? (
          <>
            <h3 className="v2-name">{patientData.patientFullName}</h3>
            <p className="v2-id">Patient ID : {patientData.patientID}</p>
            <p className="v2-details">
              {patientData.gender}
              <span className="v2-dot">•</span>
              {patientData.age} years
            </p>
          </>
        ) : (
          <div className="v2-loading">No patient data</div>
        )}
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

        <button 
          className={`v2-item ${activeTab === 'dependants' ? 'active' : ''}`}
          onClick={() => setActiveTab('dependants')}
        >
          <i className="fa-solid fa-users"></i>
          <span>Dependants</span>
        </button>

        <button 
          className={`v2-item ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          <i className="fa-solid fa-heartbeat"></i>
          <span>Vital Signs</span>
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


