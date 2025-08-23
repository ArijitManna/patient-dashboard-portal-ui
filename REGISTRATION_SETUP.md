# Patient Registration System Setup

## Overview
This registration system includes:
- Patient registration form with all required fields
- API integration with backend services
- OTP validation via email
- Responsive design with modern UI

## Features

### Registration Form Fields
- **Personal Information**: First Name, Middle Name, Last Name, Age, Date of Birth, Gender
- **Contact Information**: Country Code, Mobile Number, Email
- **Location**: Country, State, District, City (cascading dropdowns)
- **Validation**: Real-time validation with error messages

### OTP System
- 6-digit OTP sent to email
- 1-minute expiration timer
- Resend functionality
- Modal popup for OTP entry

### API Integration
- Master data APIs (countries, states, districts, cities)
- Patient registration API
- OTP validation API

## Setup Instructions

### 1. Backend API Setup
Ensure your backend API is running on `https://localhost:7077` with the following endpoints:

#### Master Data APIs
```
GET /api/Master/countries
GET /api/Master/states/{countryId}
GET /api/Master/districts/{stateId}
GET /api/Master/cities/{districtId}
```

#### Patient Registration APIs
```
POST /api/PatientRegistration/register
POST /api/PatientRegistration/validate-otp
```

### 2. Email Configuration
Update the email configuration in `src/config/emailConfig.js`:

```javascript
export const emailConfig = {
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'arijitmanna77@gmail.com',
      pass: 'your-app-password' // Use Gmail app password
    }
  },
  from: 'arijitmanna77@gmail.com',
  fromName: 'MediTech Patient Portal'
};
```

### 3. Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in the email configuration

### 4. Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://localhost:7077/api
REACT_APP_EMAIL_ENABLED=true
REACT_APP_SMTP_HOST=smtp.gmail.com
REACT_APP_SMTP_PORT=587
REACT_APP_SMTP_USER=arijitmanna77@gmail.com
REACT_APP_SMTP_PASS=your-app-password
```

## API Data Structure

### Patient Registration Request
```json
{
  "countryCode": "+91",
  "mobileNumber": "9876543210",
  "emailID": "patient@example.com",
  "firstName": "John",
  "middleName": "",
  "lastName": "Doe",
  "age": 30,
  "dob": "1993-01-01T00:00:00",
  "gender": "Male",
  "countryID": 1,
  "stateID": 1,
  "districtID": 1,
  "cityID": 1,
  "createdBy": "Patient"
}
```

### OTP Validation Request
```json
{
  "pid": "uuid-string",
  "otp": "123456"
}
```

## Development Notes

### Mock Data
For development without a backend, the system includes mock functionality:
- OTP is logged to console
- Email sending is simulated
- API calls can be mocked

### Testing
1. Fill out the registration form
2. Submit the form
3. Check console for OTP (in development mode)
4. Enter OTP in the modal
5. Verify successful registration

### Error Handling
- Form validation errors
- API error responses
- Network connectivity issues
- Email sending failures

## File Structure
```
src/
├── components/auth/
│   ├── Registration.js          # Main registration form
│   ├── Registration.css         # Registration styles
│   ├── OtpValidation.js         # OTP validation modal
│   └── OtpValidation.css        # OTP modal styles
├── services/
│   ├── api.js                   # API service functions
│   └── emailService.js          # Email service
└── config/
    └── emailConfig.js           # Email configuration
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows requests from frontend origin
2. **Email Not Sending**: Check SMTP configuration and app password
3. **API Errors**: Verify backend endpoints and data format
4. **OTP Not Working**: Check console for OTP in development mode

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## Security Considerations
- Use HTTPS in production
- Implement rate limiting for OTP requests
- Validate all input data
- Use secure SMTP connections
- Store sensitive data in environment variables
