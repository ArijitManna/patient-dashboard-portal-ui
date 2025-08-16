import React, { useMemo, useState } from 'react';
import './Registration.css';

const countries = [
  { id: 1, code: 'IND', name: 'India', states: ['Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'West Bengal'] },
  { id: 2, code: 'USA', name: 'United States', states: ['California', 'Florida', 'New York', 'Texas', 'Washington'] },
];

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    countryId: 1,
    countryCode: 'IND',
    state: '',
    email: '',
    phone: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [errors, setErrors] = useState({});

  const selectedCountry = useMemo(() => countries.find(c => c.id === Number(formData.countryId)) || countries[0], [formData.countryId]);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'phone') {
      if (value.length > 0 && !validatePhoneNumber(value)) {
        setPhoneError('Please enter a valid 10-digit Indian mobile number');
      } else {
        setPhoneError('');
      }
    }

    if (name === 'countryId') {
      const country = countries.find(c => c.id === Number(value));
      setFormData(prev => ({ ...prev, countryCode: country?.code || '', state: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.age || Number(formData.age) <= 0) newErrors.age = 'Valid age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.countryId) newErrors.countryId = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhoneNumber(formData.phone)) newErrors.phone = 'Valid phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      CountryCode: formData.countryCode,
      Mobilenumber: formData.phone,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Gender: formData.gender,
      CountryID: Number(formData.countryId),
      Age: Number(formData.age),
      Created_by: 'Admin',
      Full_Name: formData.name,
      Email: formData.email,
      State: formData.state,
    };

    console.log('Prepared payload for USP_Insert_Patient_Registration:', payload);
    alert('Registration submitted successfully (mock). Check console for payload.');
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        {/* Left Side - Patient Diagnosis Illustration */}
        <div className="illustration-section">
          <div className="illustration-content">
            <div className="patient-diagnosis-illustration">
              {/* Patient Diagnosis Elements */}
              <div className="diagnosis-elements">
                <div className="patient-profile"></div>
                <div className="opd-schedule"></div>
                <div className="diagnostic-scanner"></div>
                <div className="medical-records"></div>
                <div className="ai-assistant"></div>
                <div className="floating-particle"></div>
                <div className="floating-particle"></div>
                <div className="floating-particle"></div>
                <div className="floating-particle"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="form-section">
          <div className="registration-form">
            <div className="form-header">
              <h1>Patient Register</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name <span className="required-indicator">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="required-indicator">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="required-indicator">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="age">Age <span className="required-indicator">*</span></label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    min="0"
                    required
                  />
                  {errors.age && <div className="error-message">{errors.age}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender <span className="required-indicator">*</span></label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div className="error-message">{errors.gender}</div>}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="countryId">Country <span className="required-indicator">*</span></label>
                  <select
                    id="countryId"
                    name="countryId"
                    value={formData.countryId}
                    onChange={handleInputChange}
                    required
                  >
                    {countries.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.countryId && <div className="error-message">{errors.countryId}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="state">State <span className="required-indicator">*</span></label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select state</option>
                    {selectedCountry.states.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <div className="error-message">{errors.state}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email <span className="required-indicator">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="phone-input">
                  <span className="country-prefix">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>
                {phoneError && <div className="error-message">{phoneError}</div>}
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>

              

              <button type="submit" className="signup-btn">
                <i className="fa-solid fa-lock"></i>
                Sign Up
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
