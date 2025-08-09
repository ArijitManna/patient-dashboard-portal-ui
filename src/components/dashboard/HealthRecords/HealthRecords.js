import React from 'react';
import { healthRecords } from '../../../data/mockData';
import '../../common/DashboardCard.css';
import './HealthRecords.css';

const HealthRecords = () => {
  return (
    <div className="dashboard-card health-records-card">
      <div className="card-header">
        <div>
          <h3>Health Records</h3>
          <p className="report-generated">Report generated on last visit: 25 Mar 2024</p>
        </div>
      </div>
      <div className="card-content">
        <div className="health-metrics">
          <div className="metrics-grid">
            {healthRecords.map((record, index) => (
              <div key={index} className={`metric-item ${record.color}`}>
                <div className="metric-icon">
                  <i className={record.icon}></i>
                </div>
                <div className="metric-info">
                  <span className="metric-name">{record.name}</span>
                  <div className="metric-value">
                    <span className="value">{record.value}</span>
                    {record.change && <span className="change positive">{record.change}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="overall-report">
            <h4>Overall Report</h4>
            <div className="progress-circle">
              <div className="circle-progress">
                <div className="circle-fill"></div>
                <div className="circle-text">
                  <span className="percentage">95%</span>
                  <span className="status">Normal</span>
                </div>
              </div>
            </div>
            <p className="last-visit">Last visit 25 Mar 2024</p>
            <button className="view-details-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
