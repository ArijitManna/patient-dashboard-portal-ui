import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, children, headerActions }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h3>{title}</h3>
        {headerActions && (
          <div className="header-actions">
            {headerActions}
          </div>
        )}
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
