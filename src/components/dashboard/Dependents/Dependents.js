import React, { useState } from 'react';
import { dependents } from '../../../data/mockData';
import AddDependantModal from './AddDependantModal';
import './Dependents.css';

const Dependents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dependentsList, setDependentsList] = useState(dependents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDependant = (newDependant) => {
    setDependentsList(prev => [...prev, newDependant]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleActive = (id) => {
    setDependentsList(prev => 
      prev.map(dep => 
        dep.id === id ? { ...dep, isActive: !dep.isActive } : dep
      )
    );
  };

  const handleEdit = (id) => {
    console.log('Edit dependant:', id);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dependant?')) {
      setDependentsList(prev => prev.filter(dep => dep.id !== id));
    }
  };

  const filteredDependents = dependentsList.filter(dependent =>
    dependent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dependents-container">
      <div className="dependents-header">
        <h1 className="dependents-title">Dependants</h1>
      </div>
      
      <div className="dependents-controls">
        <div className="search-container">
          <i className="fa-solid fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="add-dependants-btn" onClick={handleOpenModal}>
          Add Dependants
        </button>
      </div>

      <div className="dependents-list">
        {filteredDependents.map(dependent => (
          <div key={dependent.id} className="dependant-card">
            <div className="dependant-main-info">
              <div className="dependant-avatar">
                <img src={dependent.avatar} alt={dependent.name} />
              </div>
              <div className="dependant-details">
                <h3 className="dependant-name">{dependent.name}</h3>
                <div className="dependant-meta">
                  <span className="dependant-relationship">{dependent.relationship}</span>
                  <span className="dependant-dot">•</span>
                  <span className="dependant-gender">{dependent.gender || 'Male'}</span>
                  <span className="dependant-dot">•</span>
                  <span className="dependant-age">{dependent.age}</span>
                </div>
              </div>
            </div>
            
            <div className="dependant-blood-group">
              <div className="blood-group-label">Blood Group</div>
              <div className="blood-group-value">{dependent.bloodGroup || 'AB+ve'}</div>
            </div>

            <div className="dependant-actions">
              <button 
                className={`toggle-btn ${dependent.isActive !== false ? 'active' : 'inactive'}`}
                onClick={() => handleToggleActive(dependent.id)}
                title={dependent.isActive !== false ? 'Active' : 'Inactive'}
              >
                <div className="toggle-switch">
                  <div className="toggle-circle"></div>
                </div>
              </button>
              <button 
                className="action-btn edit-btn"
                onClick={() => handleEdit(dependent.id)}
                title="Edit"
              >
                <i className="fa-solid fa-edit"></i>
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => handleDelete(dependent.id)}
                title="Delete"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddDependantModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddDependant={handleAddDependant}
      />
    </div>
  );
};

export default Dependents;
