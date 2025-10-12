import axios from 'axios';

// Configure environment-aware base URLs
// You can override by setting REACT_APP_API_BASE_URL (takes highest precedence),
// or set REACT_APP_API_BASE_URL_DEV / REACT_APP_API_BASE_URL_PROD for explicit dev/prod values.
const DEFAULT_DEV_API = 'http://localhost:5094/api';
const DEFAULT_PROD_API = 'http://198.38.81.123:9003/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  || (process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_BASE_URL_PROD || DEFAULT_PROD_API)
    : (process.env.REACT_APP_API_BASE_URL_DEV || DEFAULT_DEV_API));

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
  const token = localStorage.getItem('authToken');
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

// Dependents APIs
export const getDependents = () => api.get('/Dependents');
export const addDependent = (dependentData) => api.post('/Dependents', dependentData);
export const addBulkDependents = (bulkData) => api.post('/Dependents/bulk', bulkData);

export default api;
