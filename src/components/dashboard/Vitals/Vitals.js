import React, { useState, useEffect } from 'react';
import { getDependents } from '../../../services/api';
import AddVitalModal from './AddVitalModal';
import './Vitals.css';

const Vitals = ({ patientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vitalsList, setVitalsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [dependentsList, setDependentsList] = useState([]);
  const [dependentsLoading, setDependentsLoading] = useState(false);
  const [dependentsError, setDependentsError] = useState(null);

  // Dummy data for vitals - includes patient and dependents
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
      personId: 'patient',
      personName: patientData?.patientFullName || 'Self',
      personType: 'Patient',
      recordedBy: 'Self-reported'
    },
    {
      id: 2,
      date: '2025-11-22',
      time: '02:15 PM',
      heartRate: 90,
      temperature: 37.0,
      spo2: 97,
      sysBP: 110,
      diaBP: 70,
      glucose: 85,
      weight: 25.5,
      height: 120,
      bmi: 17.7,
      personId: 'dummy-dep1',
      personName: 'Sample Dependent 1',
      personType: 'Daughter',
      recordedBy: 'Recorded by family member'
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
      personId: 'patient',
      personName: patientData?.patientFullName || 'Self',
      personType: 'Patient',
      recordedBy: 'Self-reported'
    },
    {
      id: 4,
      date: '2025-11-20',
      time: '06:20 PM',
      heartRate: 75,
      temperature: 36.9,
      spo2: 98,
      sysBP: 125,
      diaBP: 80,
      glucose: 102,
      weight: 65.2,
      height: 168,
      bmi: 23.1,
      personId: 'dummy-dep2',
      personName: 'Sample Dependent 2',
      personType: 'Spouse',
      recordedBy: 'Recorded by family member'
    }
  ];

  // Relationship mapping (should match the one in Dependents component)
  const relationshipOptions = [
    { id: 1, name: 'Father' },
    { id: 2, name: 'Mother' },
    { id: 3, name: 'Brother' },
    { id: 4, name: 'Sister' },
    { id: 5, name: 'Spouse' },
    { id: 6, name: 'Son' },
    { id: 7, name: 'Daughter' },
    { id: 8, name: 'Grandfather' },
    { id: 9, name: 'Grandmother' },
    { id: 10, name: 'Other' }
  ];

  const getRelationshipName = (relationshipID) => {
    const relationship = relationshipOptions.find(rel => rel.id === relationshipID);
    return relationship ? relationship.name : 'Unknown';
  };

  // Load dependents and vitals on component mount
  useEffect(() => {
    loadDependents();
    loadVitals();
  }, []);

  const loadDependents = async () => {
    try {
      setDependentsLoading(true);
      const response = await getDependents();
      setDependentsList(response.data || []);
      setDependentsError(null);
    } catch (error) {
      console.error('Error loading dependents:', error);
      setDependentsError('Failed to load dependents');
      // Fallback to empty list
      setDependentsList([]);
    } finally {
      setDependentsLoading(false);
    }
  };

  const loadVitals = () => {
    // Simulate loading vitals (replace with real API call later)
    setIsLoading(true);
    setTimeout(() => {
      setVitalsList(dummyVitals);
      setIsLoading(false);
    }, 500);
  };

  const handleAddVital = (newVital) => {
    const vital = {
      ...newVital,
      id: vitalsList.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      recordedBy: 'Self-reported'
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

  const filteredVitals = vitalsList.filter(vital => {
    const matchesSearch = vital.date.includes(searchTerm) ||
                         vital.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vital.recordedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPerson = selectedPerson === 'all' || vital.personId === selectedPerson;
    
    return matchesSearch && matchesPerson;
  });

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
            placeholder="Search by date, person name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="person-filter">
          <label htmlFor="personSelect">Filter by person:</label>
          <select 
            id="personSelect"
            value={selectedPerson} 
            onChange={(e) => setSelectedPerson(e.target.value)}
            className="form-select"
            disabled={dependentsLoading}
          >
            <option value="all">All Family Members</option>
            <option value="patient">{patientData?.patientFullName || 'Self'} (Patient)</option>
            {dependentsList.map(dep => {
              const depId = dep.dependent_ID || dep.id;
              // Handle both API data structure and mock data structure
              const depName = dep.first_Name 
                ? `${dep.first_Name} ${dep.middle_Name ? dep.middle_Name + ' ' : ''}${dep.last_Name}`
                : (dep.dependent_name || dep.name || 'Unknown');
              const relationshipName = getRelationshipName(dep.relationshipID || dep.relationship_id);
              return (
                <option key={depId} value={depId}>
                  {depName} ({relationshipName})
                </option>
              );
            })}
          </select>
          {dependentsLoading && (
            <small className="text-muted">Loading dependents...</small>
          )}
          {dependentsError && (
            <small className="text-danger">Failed to load dependents</small>
          )}
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
                <div className="vital-person-info">
                  <span className="vital-person-name">
                    <i className="fa-solid fa-user me-1"></i>
                    {vital.personName} ({vital.personType})
                  </span>
                  <span className="vital-recorded-by">
                    {vital.recordedBy}
                  </span>
                </div>
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
          patientData={patientData}
          dependents={dependentsList}
          getRelationshipName={getRelationshipName}
          dependentsLoading={dependentsLoading}
        />
      )}
    </div>
  );
};

export default Vitals;
