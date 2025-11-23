import React, { useState, useEffect } from 'react';
import './AddVitalModal.css';

const AddVitalModal = ({ isOpen, onClose, onSave, patientData, dependents }) => {
  const [formData, setFormData] = useState({
    personId: 'patient',
    heartRate: '',
    temperature: '',
    spo2: '',
    sysBP: '',
    diaBP: '',
    glucose: '',
    weight: '',
    height: '',
    bmi: ''
  });

  const [validationStatus, setValidationStatus] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate BMI and validate vitals
  useEffect(() => {
    const { weight, height } = formData;
    
    // Calculate BMI
    if (weight && height) {
      const bmi = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1);
      setFormData(prev => ({ ...prev, bmi }));
    } else {
      setFormData(prev => ({ ...prev, bmi: '' }));
    }

    // Validate all vitals
    validateVitals();
  }, [formData.heartRate, formData.temperature, formData.spo2, formData.sysBP, formData.diaBP, formData.glucose, formData.weight, formData.height]);

  const validateVitals = () => {
    const status = {};
    
    // Heart Rate validation
    if (formData.heartRate) {
      const hr = parseInt(formData.heartRate);
      if (hr < 60) status.heartRate = { type: 'warning', text: 'Low' };
      else if (hr > 100) status.heartRate = { type: 'danger', text: 'High' };
      else status.heartRate = { type: 'success', text: 'Normal' };
    }

    // Temperature validation
    if (formData.temperature) {
      const temp = parseFloat(formData.temperature);
      if (temp < 36.1) status.temperature = { type: 'warning', text: 'Low (Hypothermia)' };
      else if (temp > 37.2) status.temperature = { type: 'danger', text: 'Fever' };
      else status.temperature = { type: 'success', text: 'Normal' };
    }

    // SpO2 validation
    if (formData.spo2) {
      const spo2 = parseInt(formData.spo2);
      if (spo2 < 90) status.spo2 = { type: 'danger', text: 'Critical' };
      else if (spo2 < 95) status.spo2 = { type: 'warning', text: 'Low' };
      else status.spo2 = { type: 'success', text: 'Normal' };
    }

    // Blood Pressure validation
    if (formData.sysBP && formData.diaBP) {
      const sys = parseInt(formData.sysBP);
      const dia = parseInt(formData.diaBP);
      if (sys < 90 || dia < 60) status.bloodPressure = { type: 'warning', text: 'Low' };
      else if (sys > 140 || dia > 90) status.bloodPressure = { type: 'danger', text: 'High' };
      else status.bloodPressure = { type: 'success', text: 'Normal' };
    }

    // Glucose validation
    if (formData.glucose) {
      const glucose = parseInt(formData.glucose);
      if (glucose < 70) status.glucose = { type: 'warning', text: 'Low' };
      else if (glucose > 140) status.glucose = { type: 'danger', text: 'High' };
      else status.glucose = { type: 'success', text: 'Normal' };
    }

    // BMI validation
    if (formData.bmi) {
      const bmi = parseFloat(formData.bmi);
      if (bmi < 18.5) status.bmi = { type: 'warning', text: 'Underweight' };
      else if (bmi < 25) status.bmi = { type: 'success', text: 'Normal' };
      else if (bmi < 30) status.bmi = { type: 'warning', text: 'Overweight' };
      else status.bmi = { type: 'danger', text: 'Obese' };
    }

    setValidationStatus(status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['personId', 'heartRate', 'temperature', 'spo2', 'sysBP', 'diaBP', 'glucose', 'weight', 'height'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Get person information
    let personName, personType, recordedBy;
    
    if (formData.personId === 'patient') {
      personName = patientData?.patientFullName || 'Self';
      personType = 'Patient';
      recordedBy = 'Self-reported';
    } else {
      const dependent = dependents.find(dep => dep.id === formData.personId);
      personName = dependent ? dependent.name : 'Unknown';
      personType = dependent ? dependent.relationship : 'Unknown';
      recordedBy = 'Recorded by family member';
    }

    // Convert strings to numbers for saving
    const vitalData = {
      personId: formData.personId,
      personName,
      personType,
      recordedBy,
      heartRate: parseInt(formData.heartRate),
      temperature: parseFloat(formData.temperature),
      spo2: parseInt(formData.spo2),
      sysBP: parseInt(formData.sysBP),
      diaBP: parseInt(formData.diaBP),
      glucose: parseInt(formData.glucose),
      weight: parseFloat(formData.weight),
      height: parseInt(formData.height),
      bmi: parseFloat(formData.bmi)
    };

    onSave(vitalData);
  };

  const handleReset = () => {
    setFormData({
      personId: 'patient',
      heartRate: '',
      temperature: '',
      spo2: '',
      sysBP: '',
      diaBP: '',
      glucose: '',
      weight: '',
      height: '',
      bmi: ''
    });
    setValidationStatus({});
  };

  const getStatusClass = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-danger';
      default: return 'text-muted';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h4>Add Vital Signs Record</h4>
          <button type="button" className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="vital-form">
            <div className="form-section">
              <div className="row g-3">
                
                {/* Person Selection */}
                <div className="col-12">
                  <label className="form-label fw-bold">Recording vitals for <span className="required">*</span></label>
                  <select
                    className="form-control"
                    name="personId"
                    value={formData.personId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="patient">{patientData?.patientFullName || 'Self'} (Patient)</option>
                    {dependents && dependents.map(dep => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name} ({dep.relationship})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Heart Rate */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">Heart Rate (bpm) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    min="30"
                    max="220"
                    required
                  />
                  {validationStatus.heartRate && (
                    <div className={`alert-status ${getStatusClass(validationStatus.heartRate.type)}`}>
                      {validationStatus.heartRate.text}
                    </div>
                  )}
                </div>

                {/* Temperature */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">Body Temperature (°C) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    step="0.1"
                    min="32"
                    max="43"
                    required
                  />
                  {validationStatus.temperature && (
                    <div className={`alert-status ${getStatusClass(validationStatus.temperature.type)}`}>
                      {validationStatus.temperature.text}
                    </div>
                  )}
                </div>

                {/* SpO2 */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">SpO₂ (%) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="spo2"
                    value={formData.spo2}
                    onChange={handleInputChange}
                    min="50"
                    max="100"
                    required
                  />
                  {validationStatus.spo2 && (
                    <div className={`alert-status ${getStatusClass(validationStatus.spo2.type)}`}>
                      {validationStatus.spo2.text}
                    </div>
                  )}
                </div>

                {/* Blood Pressure */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Blood Pressure (mmHg) <span className="required">*</span></label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      name="sysBP"
                      value={formData.sysBP}
                      onChange={handleInputChange}
                      placeholder="Systolic"
                      min="70"
                      max="250"
                      required
                    />
                    <span className="input-group-text">/</span>
                    <input
                      type="number"
                      className="form-control"
                      name="diaBP"
                      value={formData.diaBP}
                      onChange={handleInputChange}
                      placeholder="Diastolic"
                      min="40"
                      max="150"
                      required
                    />
                  </div>
                  {validationStatus.bloodPressure && (
                    <div className={`alert-status ${getStatusClass(validationStatus.bloodPressure.type)}`}>
                      {validationStatus.bloodPressure.text}
                    </div>
                  )}
                </div>

                {/* Glucose */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Glucose (mg/dL) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="glucose"
                    value={formData.glucose}
                    onChange={handleInputChange}
                    min="50"
                    max="400"
                    required
                  />
                  {validationStatus.glucose && (
                    <div className={`alert-status ${getStatusClass(validationStatus.glucose.type)}`}>
                      {validationStatus.glucose.text}
                    </div>
                  )}
                </div>

                {/* Weight & Height */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">Weight (kg) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.1"
                    min="2"
                    max="400"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">Height (cm) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    min="40"
                    max="250"
                    required
                  />
                </div>

                {/* BMI */}
                <div className="col-md-4">
                  <label className="form-label fw-bold">BMI (auto calculated)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bmi"
                    value={formData.bmi}
                    readOnly
                  />
                  {validationStatus.bmi && (
                    <div className={`alert-status ${getStatusClass(validationStatus.bmi.type)}`}>
                      {validationStatus.bmi.text}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Vitals
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVitalModal;
