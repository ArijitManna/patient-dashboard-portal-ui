import React, { useState, useEffect } from 'react';
import AddVitalModal from './AddVitalModal';
import './Vitals.css';

const Vitals = ({ patientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vitalsList, setVitalsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for vitals
  const dummyVitals = [
    {
      id: 1,
      date: '2025-11-23',
      time: '09:30 AM',
      heartRate: 72,
      temperature: 36.8,
      spo2: 98,
      sysBP: 120,
      diaBP: 80,
      glucose: 95,
      weight: 70.5,
      height: 175,
      bmi: 23.0,
      recordedBy: 'Dr. Smith'
    },
    {
      id: 2,
      date: '2025-11-22',
      time: '02:15 PM',
      heartRate: 85,
      temperature: 37.1,
      spo2: 96,
      sysBP: 135,
      diaBP: 85,
      glucose: 110,
      weight: 70.2,
      height: 175,
      bmi: 22.9,
      recordedBy: 'Nurse Johnson'
    },
    {
      id: 3,
      date: '2025-11-21',
      time: '10:45 AM',
      heartRate: 68,
      temperature: 36.6,
      spo2: 99,
      sysBP: 115,
      diaBP: 75,
      glucose: 88,
      weight: 70.0,
      height: 175,
      bmi: 22.9,
      recordedBy: 'Dr. Wilson'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setVitalsList(dummyVitals);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleAddVital = (newVital) => {
    const vital = {
      ...newVital,
      id: vitalsList.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      recordedBy: 'Current User'
    };
    setVitalsList([vital, ...vitalsList]);
    setIsModalOpen(false);
  };

  const getVitalStatus = (type, value, value2 = null) => {
    switch (type) {
      case 'heartRate':
        if (value < 60) return 'text-warning';
        if (value > 100) return 'text-danger';
        return 'text-success';
      
      case 'temperature':
        if (value < 36.1) return 'text-warning';
        if (value > 37.2) return 'text-danger';
        return 'text-success';
      
      case 'spo2':
        if (value < 90) return 'text-danger';
        if (value < 95) return 'text-warning';
        return 'text-success';
      
      case 'bloodPressure':
        if (value < 90 || value2 < 60) return 'text-warning';
        if (value > 140 || value2 > 90) return 'text-danger';
        return 'text-success';
      
      case 'glucose':
        if (value < 70) return 'text-warning';
        if (value > 140) return 'text-danger';
        return 'text-success';
      
      case 'bmi':
        if (value < 18.5) return 'text-warning';
        if (value < 25) return 'text-success';
        if (value < 30) return 'text-warning';
        return 'text-danger';
      
      default:
        return 'text-muted';
    }
  };

  const filteredVitals = vitalsList.filter(vital =>
    vital.date.includes(searchTerm) ||
    vital.recordedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="vitals-container">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading vitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vitals-container">
      <div className="vitals-header">
        <div className="vitals-title">
          <h3>Vital Signs</h3>
          <p className="text-muted">Monitor and track vital signs over time</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fa-solid fa-plus me-2"></i>
          Add New Record
        </button>
      </div>

      <div className="vitals-controls">
        <div className="search-box">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Search by date or recorded by..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="vitals-list">
        {filteredVitals.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-heartbeat"></i>
            <h4>No Vital Records Found</h4>
            <p>Start by adding your first vital signs record.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Add First Record
            </button>
          </div>
        ) : (
          filteredVitals.map(vital => (
            <div key={vital.id} className="vital-card">
              <div className="vital-header">
                <div className="vital-date-time">
                  <span className="vital-date">{vital.date}</span>
                  <span className="vital-time">{vital.time}</span>
                </div>
                <span className="vital-recorded-by">
                  Recorded by: {vital.recordedBy}
                </span>
              </div>
              
              <div className="vital-metrics">
                <div className="metric-group">
                  <div className="metric-item">
                    <label>Heart Rate</label>
                    <span className={`metric-value ${getVitalStatus('heartRate', vital.heartRate)}`}>
                      {vital.heartRate} bpm
                    </span>
                  </div>
                  
                  <div className="metric-item">
                    <label>Temperature</label>
                    <span className={`metric-value ${getVitalStatus('temperature', vital.temperature)}`}>
                      {vital.temperature}°C
                    </span>
                  </div>
                  
                  <div className="metric-item">
                    <label>SpO₂</label>
                    <span className={`metric-value ${getVitalStatus('spo2', vital.spo2)}`}>
                      {vital.spo2}%
                    </span>
                  </div>
                </div>

                <div className="metric-group">
                  <div className="metric-item">
                    <label>Blood Pressure</label>
                    <span className={`metric-value ${getVitalStatus('bloodPressure', vital.sysBP, vital.diaBP)}`}>
                      {vital.sysBP}/{vital.diaBP} mmHg
                    </span>
                  </div>
                  
                  <div className="metric-item">
                    <label>Glucose</label>
                    <span className={`metric-value ${getVitalStatus('glucose', vital.glucose)}`}>
                      {vital.glucose} mg/dL
                    </span>
                  </div>
                  
                  <div className="metric-item">
                    <label>BMI</label>
                    <span className={`metric-value ${getVitalStatus('bmi', vital.bmi)}`}>
                      {vital.bmi}
                    </span>
                  </div>
                </div>

                <div className="metric-group">
                  <div className="metric-item">
                    <label>Weight</label>
                    <span className="metric-value text-muted">
                      {vital.weight} kg
                    </span>
                  </div>
                  
                  <div className="metric-item">
                    <label>Height</label>
                    <span className="metric-value text-muted">
                      {vital.height} cm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <AddVitalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddVital}
        />
      )}
    </div>
  );
};

export default Vitals;
