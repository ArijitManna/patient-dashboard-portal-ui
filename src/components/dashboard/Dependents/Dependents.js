import React from 'react';
import { dependents } from '../../../data/mockData';
import '../../common/DashboardCard.css';
import './Dependents.css';

const Dependents = () => {
  return (
    <div className="dashboard-card dependents-card">
      <div className="card-header">
        <h3>Dependant</h3>
        <div className="header-actions">
          <a href="#" className="add-new">Add New</a>
          <a href="#" className="view-all">View All</a>
        </div>
      </div>
      <div className="card-content">
        <div className="dependents-list">
          {dependents.map(dependent => (
            <div key={dependent.id} className="dependent-item">
              <div className="dependent-info">
                <img src={dependent.avatar} alt={dependent.name} />
                <div>
                  <h4>{dependent.name}</h4>
                  <span>{dependent.relationship} - {dependent.age}</span>
                </div>
              </div>
              <div className="dependent-actions">
                <button className="action-btn"><i className="fa-solid fa-calendar"></i></button>
                <button className="action-btn"><i className="fa-solid fa-eye"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dependents;
