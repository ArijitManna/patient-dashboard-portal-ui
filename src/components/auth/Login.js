import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { sendLoginOtp, validateLoginOtp } from '../../services/api';
import { sendOtpEmail } from '../../services/emailService';
import LoginOtpValidation from './LoginOtpValidation';
import './AuthCommon.css';

const Login = ({ onPageChange }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pid, setPid] = useState('');
  const [otp, setOtp] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      // Send OTP API (returns pid and otp)
      const res = await sendLoginOtp(email);
      if (res.data && res.data.pid && res.data.otp) {
        console.log('Received OTP:', res.data.otp);
        
        // Try to send email, but don't fail if email service is down
        try {
          const emailResult = await sendOtpEmail(email, res.data.otp, 'User', 'login');
          if (emailResult.success) {
            console.log('📧 Email notification sent');
          } else {
            console.warn('📧 Email notification failed, but continuing...');
          }
        } catch (emailError) {
          console.warn('📧 Email service error, but continuing with OTP flow...', emailError);
        }
        
        setPid(res.data.pid);
        setShowOtpModal(true);
      } else {
        setEmailError('Failed to send OTP.');
      }
    } catch (err) {
      setEmailError('Error sending OTP.');
    }
    setLoading(false);
  };

  const handleOtpSuccess = async (data) => {
    setShowOtpModal(false);
    sessionStorage.setItem('pid', pid);
    sessionStorage.setItem('userEmail', email); // Store email for user identification
    onPageChange('dashboard');
  };

  const handleOtpClose = () => {
    setShowOtpModal(false);
    setPid('');
    setOtp('');
  };

  const handleResendOtp = async () => {
    if (!validateEmail(email)) return;
    try {
      const res = await sendLoginOtp(email);
      if (res.data && res.data.otp) {
        console.log('Resent OTP:', res.data.otp);
        await sendOtpEmail(email, res.data.otp, 'User');
      }
    } catch (err) {
      // Optionally handle resend error
    }
  };

  return (
    <div className="appointment-bg">
      <div className="appointment-overlay">
        <div className="form-header">
          <h1 className="appointment-title">Login</h1>
        </div>
        <div className="form-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`form-control${emailError ? ' is-invalid' : ''}`}
                required
                disabled={loading}
                style={{ marginBottom: 0 }}
              />
              {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
            </div>
            <button type="submit" className="appointment-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Sending OTP...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt"></i> Submit
                </>
              )}
            </button>
            <style>{`.appointment-btn:disabled { opacity: 0.7; cursor: not-allowed; }`}</style>
          </form>
          {showOtpModal && (
            <LoginOtpValidation
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
};

export default Login;
