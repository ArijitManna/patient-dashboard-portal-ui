import React from 'react';
import HealthRecords from './HealthRecords/HealthRecords';
import Notifications from './Notifications/Notifications';
import Appointments from './Appointments/Appointments';
import Dependents from './Dependents/Dependents';
import Vitals from './Vitals/Vitals';
import './Dashboard.css';

const Dashboard = ({ activeTab, patientData }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="main-content-container">
            <Appointments />
          </div>
        );
      case 'medical-records':
        return (
          <div className="main-content-container">
            <HealthRecords />
          </div>
        );
      case 'dependants':
        return (
          <div className="main-content-container">
            <Dependents patientData={patientData} />
          </div>
        );
      case 'vitals':
        return (
          <div className="main-content-container">
            <Vitals patientData={patientData} />
          </div>
        );
      default:
        return (
          <div className="main-content-container">
            <HealthRecords />
            <div className="bottom-cards">
              <div className="notifications-column">
                <Notifications />
              </div>
              <div className="appointments-dependents-column">
                <Appointments />
                <Dependents patientData={patientData} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="user-dropdown">
          <img src="https://i.pravatar.cc/120?img=32" alt={patientData?.patientFullName || 'Patient'} className="dashboard-user-avatar" />
          <span>{patientData?.patientFullName?.split(' ')[0] || 'Patient'}</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default Dashboard;
