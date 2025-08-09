import React from 'react';
import { notifications } from '../../../data/mockData';
import '../../common/DashboardCard.css';
import './Notifications.css';

const Notifications = () => {
  return (
    <div className="dashboard-card notifications-card">
      <div className="card-header">
        <h3>Notifications</h3>
        <a href="#" className="view-all">View All</a>
      </div>
      <div className="card-content">
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className={`notification-icon ${notification.color}`}>
                <i className={notification.icon}></i>
              </div>
              <div className="notification-content">
                <p className="notification-text">{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card-navigation">
          <button className="nav-btn"><i className="fa-solid fa-chevron-left"></i></button>
          <button className="nav-btn"><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
