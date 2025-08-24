import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import React, { useMemo, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { registerPatient, getCountries, getStates, getDistricts, getCities } from '../../services/api';
import { sendOtpEmail, logOtpToConsole } from '../../services/emailService';
import OtpValidation from './OtpValidation';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    dob: '',
    gender: '',
    mobileNumber: '',
    emailID: '',
    countryID: '',
    stateID: '',
    districtID: '',
    cityID: '',
    createdBy: 'Patient'
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Debug logging for countries state
  useEffect(() => {
    console.log('Countries state updated:', countries);
  }, [countries]);

  // Debug logging for states state
  useEffect(() => {
    console.log('States state updated:', states);
  }, [states]);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pid, setPid] = useState('');
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    console.log('Country changed to:', formData.countryID);
    if (formData.countryID) {
      loadStates(formData.countryID);
    }
  }, [formData.countryID]);

  // Load districts when state changes
  useEffect(() => {
    console.log('State changed to:', formData.stateID);
    if (formData.stateID) {
      loadDistricts(formData.stateID);
    }
  }, [formData.stateID]);

  // Load cities when district changes
  useEffect(() => {
    if (formData.districtID) {
      loadCities(formData.districtID);
    }
  }, [formData.districtID]);

  const loadCountries = async () => {
    try {
      const response = await getCountries();
      console.log('Countries API response:', response.data);
      // Extract the actual countries array from the API response
      const countriesData = response.data.data || response.data || [];
      console.log('Extracted countries:', countriesData);
      setCountries(countriesData);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const loadStates = async (countryId) => {
    try {
      const response = await getStates(countryId);
      console.log('States API response:', response.data);
      // Extract the actual states array from the API response
      const statesData = response.data.data || response.data || [];
      console.log('Extracted states:', statesData);
      setStates(statesData);
      setFormData(prev => ({ ...prev, stateID: '', districtID: '', cityID: '' }));
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };

  const loadDistricts = async (stateId) => {
    try {
      const response = await getDistricts(stateId);
      console.log('Districts API response:', response.data);
      // Extract the actual districts array from the API response
      const districtsData = response.data.data || response.data || [];
      console.log('Extracted districts:', districtsData);
      setDistricts(districtsData);
      setFormData(prev => ({ ...prev, districtID: '', cityID: '' }));
    } catch (error) {
      console.error('Error loading districts:', error);
    }
  };

  const loadCities = async (districtId) => {
    try {
      const response = await getCities(districtId);
      console.log('Cities API response:', response.data);
      // Extract the actual cities array from the API response
      const citiesData = response.data.data || response.data || [];
      console.log('Extracted cities:', citiesData);
      setCities(citiesData);
      setFormData(prev => ({ ...prev, cityID: '' }));
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'mobileNumber') {
      if (value.length > 0 && !validatePhoneNumber(value)) {
        setPhoneError('Please enter a valid 10-digit Indian mobile number');
      } else {
        setPhoneError('');
      }
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.age || Number(formData.age) <= 0) newErrors.age = 'Valid age is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!validatePhoneNumber(formData.mobileNumber)) newErrors.mobileNumber = 'Valid mobile number is required';
    if (!formData.emailID || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailID)) newErrors.emailID = 'Valid email is required';
    if (!formData.countryID) newErrors.countryID = 'Country is required';
    if (!formData.stateID) newErrors.stateID = 'State is required';
    if (!formData.districtID) newErrors.districtID = 'District is required';
    if (!formData.cityID) newErrors.cityID = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await registerPatient(formData);
      // Correctly extract PID and OTP from the nested response
      if (response && response.data && response.data.data && response.data.data.generatedPID && response.data.data.generatedOTP) {
        const patientId = response.data.data.generatedPID;
        const otp = response.data.data.generatedOTP;
        setPid(patientId);
        const patientName = formData.firstName || 'there';
        await sendOtpEmail(formData.emailID, otp, patientName);
        logOtpToConsole(formData.emailID, otp);
        setShowOtpModal(true);
      } else {
        setShowOtpModal(true);
      }
    } catch (error) {
      // ...existing code...
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSuccess = async (data) => {
    setShowOtpModal(false);
    // Send registration success email
    try {
      const patientName = formData.firstName || 'there';
      await sendOtpEmail(
        formData.emailID,
        '',
        patientName + '\n\nCongratulations! Your registration is successful. You can now log in to the MediTech Patient Portal.'
      );
    } catch (e) {
      // Optionally log or ignore email errors
    }
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'Registration completed successfully! You can now login.',
      confirmButtonText: 'Go to Login',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    }).then(() => {
      window.location.href = '/login';
    });
  };

  const handleOtpClose = () => {
    setShowOtpModal(false);
  };

  const handleResendOtp = async () => {
    try {
      // In real app, this would call the backend to resend OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const patientName = formData.firstName || 'there';
      await sendOtpEmail(formData.emailID, otp, patientName);
      logOtpToConsole(formData.emailID, otp);
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <div className="appointment-bg">
      <div className="appointment-overlay">
        {/* Form Header */}
        <div className="form-header">
          <h1 className="appointment-title">Patient Registration</h1>
        </div>
        {/* Form Content */}
        <div className="form-content">
          <form className="registration-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="registration-label required">First Name <span className="text-danger">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" className={`form-control${errors.firstName ? ' is-invalid' : ''}`} required />
                {submitAttempted && errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="registration-label">Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Enter middle name" className="form-control" />
              </div>
              <div className="col-md-4 mb-3">
                <label className="registration-label required">Last Name <span className="text-danger">*</span></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" className={`form-control${errors.lastName ? ' is-invalid' : ''}`} required />
                {submitAttempted && errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
              </div>
            
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Age <span className="text-danger">*</span></label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter age" min="0" max="120" className={`form-control${errors.age ? ' is-invalid' : ''}`} required />
                {submitAttempted && errors.age && <div className="invalid-feedback d-block">{errors.age}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Date of Birth <span className="text-danger">*</span></label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={`form-control${errors.dob ? ' is-invalid' : ''}`} required />
                {submitAttempted && errors.dob && <div className="invalid-feedback d-block">{errors.dob}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Gender <span className="text-danger">*</span></label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className={`form-control${errors.gender ? ' is-invalid' : ''}`} required>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {submitAttempted && errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
              </div>
            
           
              
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Mobile Number <span className="text-danger">*</span></label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="Enter mobile number" maxLength="10" className={`form-control${errors.mobileNumber ? ' is-invalid' : ''}`} required />
                {phoneError && <div className="invalid-feedback d-block">{phoneError}</div>}
                {submitAttempted && errors.mobileNumber && <div className="invalid-feedback d-block">{errors.mobileNumber}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Email <span className="text-danger">*</span></label>
                <input type="email" name="emailID" value={formData.emailID} onChange={handleInputChange} placeholder="Enter your email" className={`form-control${errors.emailID ? ' is-invalid' : ''}`} required />
                {submitAttempted && errors.emailID && <div className="invalid-feedback d-block">{errors.emailID}</div>}
              </div>
           
              <div className="col-md-6 mb-3">
                <label className="registration-label required">Country <span className="text-danger">*</span></label>
                <Typeahead
                  id="country-typeahead"
                  labelKey="countryName"
                  options={countries}
                  placeholder="Search country"
                  onChange={selected => {
                    if (selected && selected.length > 0) {
                      setFormData(prev => ({
                        ...prev,
                        countryID: selected[0].countryID,
                        countrySearch: selected[0].countryName
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, countryID: '', countrySearch: '' }));
                    }
                    if (errors['countryID']) {
                      setErrors(prev => ({ ...prev, countryID: '' }));
                    }
                  }}
                  selected={
                    formData.countryID
                      ? countries.filter(c => c.countryID === formData.countryID)
                      : []
                  }
                  isInvalid={!!(submitAttempted && errors.countryID)}
                  inputProps={{ className: `form-control${errors.countryID ? ' is-invalid' : ''}` }}
                  renderMenuItemChildren={(option) => (
                    <span>{option.countryName}</span>
                  )}
                />
                {submitAttempted && errors.countryID && <div className="invalid-feedback d-block">{errors.countryID}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="registration-label required">State</label>
                <Typeahead
                  id="state-typeahead"
                  labelKey="stateName"
                  options={states}
                  placeholder="Search state"
                  onChange={selected => {
                    if (selected && selected.length > 0) {
                      setFormData(prev => ({
                        ...prev,
                        stateID: selected[0].stateID,
                        stateSearch: selected[0].stateName
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, stateID: '', stateSearch: '' }));
                    }
                    if (errors['stateID']) {
                      setErrors(prev => ({ ...prev, stateID: '' }));
                    }
                  }}
                  selected={
                    formData.stateID
                      ? states.filter(s => s.stateID === formData.stateID)
                      : []
                  }
                  isInvalid={!!(submitAttempted && errors.stateID)}
                  inputProps={{ className: `form-control${errors.stateID ? ' is-invalid' : ''}`, disabled: !formData.countryID }}
                  renderMenuItemChildren={(option) => (
                    <span>{option.stateName}</span>
                  )}
                />
                {submitAttempted && errors.stateID && <div className="invalid-feedback d-block">{errors.stateID}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="registration-label required">District</label>
                <Typeahead
                  id="district-typeahead"
                  labelKey="districtName"
                  options={districts}
                  placeholder="Search district"
                  onChange={selected => {
                    if (selected && selected.length > 0) {
                      setFormData(prev => ({
                        ...prev,
                        districtID: selected[0].districtID,
                        districtSearch: selected[0].districtName
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, districtID: '', districtSearch: '' }));
                    }
                    if (errors['districtID']) {
                      setErrors(prev => ({ ...prev, districtID: '' }));
                    }
                  }}
                  selected={
                    formData.districtID
                      ? districts.filter(d => d.districtID === formData.districtID)
                      : []
                  }
                  isInvalid={!!(submitAttempted && errors.districtID)}
                  inputProps={{ className: `form-control${errors.districtID ? ' is-invalid' : ''}`, disabled: !formData.stateID }}
                  renderMenuItemChildren={(option) => (
                    <span>{option.districtName}</span>
                  )}
                />
                {submitAttempted && errors.districtID && <div className="invalid-feedback d-block">{errors.districtID}</div>}
              </div>
            
              <div className="col-md-6 mb-3">
                <label className="registration-label required">City</label>
                <Typeahead
                  id="city-typeahead"
                  labelKey="cityName"
                  options={cities}
                  placeholder="Search city"
                  onChange={selected => {
                    if (selected && selected.length > 0) {
                      setFormData(prev => ({
                        ...prev,
                        cityID: selected[0].cityID,
                        citySearch: selected[0].cityName
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, cityID: '', citySearch: '' }));
                    }
                    if (errors['cityID']) {
                      setErrors(prev => ({ ...prev, cityID: '' }));
                    }
                  }}
                  selected={
                    formData.cityID
                      ? cities.filter(c => c.cityID === formData.cityID)
                      : []
                  }
                  isInvalid={!!(submitAttempted && errors.cityID)}
                  inputProps={{ className: `form-control${errors.cityID ? ' is-invalid' : ''}`, disabled: !formData.districtID }}
                  renderMenuItemChildren={(option) => (
                    <span>{option.cityName}</span>
                  )}
                />
                {submitAttempted && errors.cityID && <div className="invalid-feedback d-block">{errors.cityID}</div>}
              </div>
            </div>
            <button type="submit" className="appointment-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Registering...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </>
              )}
            </button>
          </form>
          {showOtpModal && (
            <OtpValidation
              pid={pid}
              onSuccess={handleOtpSuccess}
              onClose={handleOtpClose}
              onResendOtp={handleResendOtp}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Registration;
