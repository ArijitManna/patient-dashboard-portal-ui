import React, { useState } from 'react';
import Header from './components/layout/Header';
import Breadcrumb from './components/layout/Breadcrumb';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Left Sidebar - Patient Profile */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Right Main Dashboard */}
            <Dashboard />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
