import React, { useState, useEffect } from 'react';
import { validateLoginOtp } from '../../services/api';
import './OtpValidation.css';

const LoginOtpValidation = ({ pid, onSuccess, onClose, onResendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-login-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-login-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      console.log('Validating login OTP with:', { pid, OTP_Code: otpString });
      const response = await validateLoginOtp(pid, otpString);
      if (response.status === 200 && response.data.success) {
        // Store JWT token from response
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          console.log('JWT token stored:', response.data.token);
        }
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    onResendOtp();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <div className="otp-header">
          <h2>Login OTP Verification</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="otp-content">
          <p>Enter the 6-digit OTP sent to your email for login.</p>
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-login-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  placeholder="0"
                />
              ))}
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="timer-section">
              <p>Resend OTP in: {formatTime(timer)}</p>
            </div>
            <div className="otp-actions">
              <button
                type="button"
                className="resend-btn"
                disabled={isResendDisabled}
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
              <button
                type="submit"
                className="verify-btn"
                disabled={isLoading || otp.join('').length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginOtpValidation;
