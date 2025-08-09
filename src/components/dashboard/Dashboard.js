import React from 'react';
import HealthRecords from './HealthRecords/HealthRecords';
import Notifications from './Notifications/Notifications';
import Appointments from './Appointments/Appointments';
import Dependents from './Dependents/Dependents';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="user-dropdown">
          <img src="https://i.pravatar.cc/120?img=32" alt="Hendrita Hayes" className="dashboard-user-avatar" />
          <span>Hendrita</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>

      {/* Main Content Container with Border */}
      <div className="main-content-container">
        {/* Health Records Card */}
        <HealthRecords />

        {/* Bottom Row Cards */}
        <div className="bottom-cards">
          <div className="notifications-column">
            <Notifications />
          </div>
          <div className="appointments-dependents-column">
            <Appointments />
            <Dependents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
