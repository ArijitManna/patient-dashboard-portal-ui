import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Breadcrumb from './components/layout/Breadcrumb';
import Sidebar from './components/layout/Sidebar';
import SidebarV2 from './components/layout/SidebarV2';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import Registration from './components/auth/Registration';
import RegistrationHeader from './components/auth/RegistrationHeader';
import Login from './components/auth/Login';
import LoginHeader from './components/auth/LoginHeader';
import { getDashboardDetails } from './services/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('login'); // 'dashboard' or 'registration'
  const [patientData, setPatientData] = useState(null);
  const [isLoadingPatient, setIsLoadingPatient] = useState(false);
  const [patientError, setPatientError] = useState(null);

  // Load patient data when entering dashboard
  useEffect(() => {
    if (currentPage === 'dashboard') {
      loadPatientData();
    }
  }, [currentPage]);

  const loadPatientData = async () => {
  const token = localStorage.getItem('authToken');
    if (!token) {
      setCurrentPage('login');
      return;
    }

    setIsLoadingPatient(true);
    setPatientError(null);
    try {
      const response = await getDashboardDetails();
      setPatientData(response.data);
      console.log('Patient data loaded:', response.data);
    } catch (error) {
      console.error('Failed to load patient data:', error);
      setPatientError('Failed to load patient data');
      if (error.response?.status === 401) {
        // Token expired, redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('pid');
        sessionStorage.removeItem('userEmail');
        setCurrentPage('login');
      }
    } finally {
      setIsLoadingPatient(false);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('pid');
    sessionStorage.removeItem('userEmail');
    setPatientData(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="App">
            {/* Header */}
            <Header onPageChange={setCurrentPage} />

            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Main Content */}
            <div className="main-content">
              <div className="container">
                <div className="content-wrapper">
                  {/* Left Sidebar - Patient Profile (New version) */}
                  <SidebarV2
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={handleLogout}
                    patientData={patientData}
                    isLoadingPatient={isLoadingPatient}
                    patientError={patientError}
                  />

                  {/* Right Main Dashboard */}
                  <Dashboard activeTab={activeTab} patientData={patientData} />
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <Footer />
          </div>
        );
      case 'registration':
        return (
          <div className="App">
            <RegistrationHeader onPageChange={setCurrentPage} />
            <Registration />
          </div>
        );
      case 'login':
        return (
          <div className="App">
            <LoginHeader onPageChange={setCurrentPage} />
            <Login onPageChange={setCurrentPage} />
          </div>
        );
      default:
        return (
          <div className="App">
            <LoginHeader onPageChange={setCurrentPage} />
            <Login onPageChange={setCurrentPage} />
          </div>
        );
    }
  };

  return renderPage();
}

export default App;
