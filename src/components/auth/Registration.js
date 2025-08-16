import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhoneNumber = (phone) => {
    // Indian mobile number validation: 10 digits starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate phone number
    if (name === 'phone') {
      if (value.length > 0) {
        if (!validatePhoneNumber(value)) {
          setPhoneError('Please enter a valid 10-digit Indian mobile number');
        } else {
          setPhoneError('');
        }
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    
    // Handle registration logic here
    console.log('Registration data:', formData);
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
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
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
               </div>

              <div className="form-group">
                <label htmlFor="password">Create Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fa-solid fa-eye${showConfirmPassword ? '' : '-slash'}`}></i>
                  </button>
                </div>
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
