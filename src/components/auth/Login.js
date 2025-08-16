import React, { useState } from 'react';
import './Login.css';

const Login = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate email
    if (name === 'email') {
      if (value.length > 0) {
        if (!validateEmail(value)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Check if password is entered
    if (!formData.password.trim()) {
      return;
    }
    
    // Bypass authentication - redirect to dashboard
    console.log('Login successful - redirecting to dashboard');
    console.log('Login data:', formData);
    console.log('Remember Me:', rememberMe);
    console.log('Login with OTP:', loginWithOTP);
    
    // Redirect to dashboard
    onPageChange('dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className="login-page">
      <div className="login-container">
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

        {/* Right Side - Login Form */}
        <div className="form-section">
          <div className="login-form">
            <div className="form-header">
              <h1>Login Doccure</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
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

              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="loginWithOTP"
                    checked={loginWithOTP}
                    onChange={(e) => setLoginWithOTP(e.target.checked)}
                  />
                  <label htmlFor="loginWithOTP">Login with OTP</label>
                </div>
              </div>

              <button type="submit" className="signin-btn">
                <i className="fa-solid fa-sign-in-alt"></i>
                Sign in
              </button>
            </form>

            <div className="separator">
              <span>or</span>
            </div>

            <div className="social-login">
              <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                <i className="fa-brands fa-google"></i>
                Sign in With Google
              </button>
              <button type="button" className="facebook-btn" onClick={handleFacebookLogin}>
                <i className="fa-brands fa-facebook-f"></i>
                Sign in With Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
