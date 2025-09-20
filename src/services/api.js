import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:7077/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_SECRETKEY = process.env.REACT_APP_API_SECRETKEY;
const API_SECRET_APIS = (process.env.REACT_APP_API_SECRET_APIS || '').split(',');

// Add interceptor to inject x-api-secretkey for selected endpoints
api.interceptors.request.use(config => {
  const url = config.url || '';
  // Only add header for configured endpoints
  if (API_SECRETKEY && API_SECRET_APIS.some(api => url.includes(api))) {
    config.headers['x-api-secretkey'] = API_SECRETKEY;
  }
  
  // Add JWT token for authenticated requests
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Master data APIs
export const getCountries = () => api.get('/Master/countries');
export const getStates = (countryId) => api.get(`/Master/states/${countryId}`);
export const getDistricts = (stateId) => api.get(`/Master/districts/${stateId}`);
export const getCities = (districtId) => api.get(`/Master/cities/${districtId}`);

// Patient Registration APIs
export const registerPatient = (registrationData) =>
  api.post('/PatientRegistration/register', registrationData);

export const validateOtp = (otpData) =>
  api.post('/PatientRegistration/validate-otp', {
    pid: otpData.pid,
    otp: otpData.otp || otpData.OTP_Code || otpData.otP_Code
  });

// Login OTP APIs
export const sendLoginOtp = (emailID) => api.post('/Login/otp', { emailID });
export const validateLoginOtp = (pid, OTP_Code) => api.post('/Login/validate-otp', { pid, OTP_Code });

// Dashboard API
export const getDashboardDetails = () => api.get('/Patients/dashboard-details');

// Patient data APIs
export const getPatient = (id) => api.get(`/Patients/${id}`);
export const getPatientHealthRecords = (id) => api.get(`/Patients/${id}/health-records`);
export const getPatientOverallReport = (id) => api.get(`/Patients/${id}/overall-report`);
export const getPatientNotifications = (id) => api.get(`/Patients/${id}/notifications`);
export const getPatientAppointments = (id) => api.get(`/Patients/${id}/appointments`);
export const getPatientDependants = (id) => api.get(`/Patients/${id}/dependants`);
export const getPatientMedicalRecords = (id) => api.get(`/Patients/${id}/medical-records`);
export const getPatientPrescriptions = (id) => api.get(`/Patients/${id}/prescriptions`);

export default api;
