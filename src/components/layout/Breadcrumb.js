import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-bg">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      <div className="container">
        <div className="breadcrumb-content">
          <div className="breadcrumb-nav">
            <span className="breadcrumb-item">
              <i className="fa-solid fa-home"></i>
            </span>
            <span className="breadcrumb-separator">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-item">Patient</span>
            <span className="breadcrumb-separator">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
            <span className="breadcrumb-item active">Dashboard</span>
          </div>
          <h1 className="page-title">Patient Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
