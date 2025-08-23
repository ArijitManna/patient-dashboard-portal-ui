import React, { useState, useEffect } from 'react';
import { validateOtp } from '../../services/api';
import './OtpValidation.css';

const OtpValidation = ({ pid, onSuccess, onClose, onResendOtp }) => {
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
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
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
      const response = await validateOtp({
        pid: pid,
        otp: otpString
      });

      if (response.status === 200) {
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
          <h2>Verify OTP</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="otp-content">
          <p>We've sent a 6-digit OTP to your email address.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
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

export default OtpValidation;
