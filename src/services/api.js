import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Master data APIs
export const getCountries = () => api.get('/Master/countries');
export const getStates = (countryId) => api.get(`/Master/states/${countryId}`);
export const getDistricts = (stateId) => api.get(`/Master/districts/${stateId}`);
export const getCities = (districtId) => api.get(`/Master/cities/${districtId}`);

// Patient Registration APIs
export const registerPatient = (patientData) => api.post('/PatientRegistration/register', patientData);
export const validateOtp = (otpData) => api.post('/PatientRegistration/validate-otp', otpData);

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
