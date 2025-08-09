import React from 'react';
import { appointments } from '../../../data/mockData';
import '../../common/DashboardCard.css';
import './Appointments.css';

const Appointments = () => {
  return (
    <div className="dashboard-card appointments-card">
      <div className="card-header">
        <h3>Appointments</h3>
        <div className="card-nav">
          <button className="nav-btn"><i className="fa-solid fa-chevron-left"></i></button>
          <button className="nav-btn"><i className="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      <div className="card-content">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-header">
              <div className="doctor-info">
                <img src={appointment.avatar} alt="Doctor" />
                <div>
                  <h4>{appointment.doctor}</h4>
                  <span>{appointment.specialty}</span>
                </div>
              </div>
              <span className="appointment-duration">30 Min</span>
            </div>
            <div className="appointment-details">
              <p className="appointment-date">{appointment.date}</p>
              <div className="appointment-info">
                <span><i className="fa-solid fa-clock"></i> {appointment.time}</span>
                <span><i className="fa-solid fa-location-dot"></i> {appointment.location}</span>
              </div>
            </div>
            <div className="appointment-actions">
              <button className="btn-outline">Reschedule</button>
              <button className="btn-primary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
