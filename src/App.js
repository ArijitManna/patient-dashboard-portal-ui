import React, { useState } from 'react';
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
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('login'); // 'dashboard' or 'registration'

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
                    onLogout={() => setCurrentPage('login')}
                  />

                  {/* Right Main Dashboard */}
                  <Dashboard activeTab={activeTab} />
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
