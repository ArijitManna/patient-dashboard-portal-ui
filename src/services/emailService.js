import axios from 'axios';

const API_BASE_URL = 'https://localhost:7077/api';

// Email service for sending OTP emails using the backend API
export const sendOtpEmail = async (email, otp, patientName = 'there') => {
  console.log('📧 Starting email sending process...');
  console.log(`📧 To: ${email}`);
  console.log(`🔢 OTP: ${otp}`);
  
  try {
    // Create email content
    const emailData = {
      emailId: email,
      subject: "MediTech Patient Portal - Email Verification",
      body: getOtpEmailTemplate(otp, patientName)
    };

    console.log('📧 Email data prepared:', emailData);

    // Call the email API
    const response = await axios.post(`${API_BASE_URL}/Email/send`, emailData);
    
    console.log('📧 Email API response:', response.data);
    
    if (response.data.status === 1) {
      console.log('✅ Email sent successfully!');
      return {
        success: true,
        message: 'OTP sent successfully'
      };
    } else {
      console.error('❌ Email sending failed:', response.data.message);
      return {
        success: false,
        message: response.data.message || 'Failed to send email'
      };
    }
  } catch (error) {
    console.error('❌ Email sending error:', error);
    console.error('❌ Error details:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send email'
    };
  }
};

// Email template for OTP
export const getOtpEmailTemplate = (otp, patientName) => {
  // If no OTP is provided, send a simple thank you message (for registration success)
  if (!otp) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">MediTech Patient Portal</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Registration Successful</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Hello ${patientName || 'there'},
          </p>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for registering with MediTech Patient Portal. Your registration is successful. You can now log in and start using our services.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;
  }
  // Default: send OTP verification email
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">MediTech Patient Portal</h1>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-bottom: 20px;">Email Verification</h2>
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
          Hello ${patientName || 'there'},
        </p>
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
          Thank you for registering with MediTech Patient Portal. To complete your registration, please use the following verification code:
        </p>
        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #667eea; font-size: 32px; margin: 0; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
        </div>
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
          This code will expire in 1 minute. If you didn't request this verification, please ignore this email.
        </p>
        <div style="background: #e8f4fd; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #333; font-size: 14px;">
            <strong>Security Tip:</strong> Never share this OTP with anyone. Our team will never ask for your verification code.
          </p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;
};

// For development purposes, we can also log the OTP to console
export const logOtpToConsole = (email, otp) => {
  console.log('='.repeat(50));
  console.log('📧 EMAIL OTP SENT');
  console.log('='.repeat(50));
  console.log(`📧 To: ${email}`);
  console.log(`🔢 OTP: ${otp}`);
  console.log(`⏰ Expires: 1 minute`);
  console.log('='.repeat(50));
};
