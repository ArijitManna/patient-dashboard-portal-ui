import React, { useState, useEffect } from 'react';
import { getDependents } from '../../../services/api';
import { dependents } from '../../../data/mockData';
import AddDependantModal from './AddDependantModal';
import './Dependents.css';

const Dependents = ({ patientData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dependentsList, setDependentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Relationship mapping (should match the one in AddDependantModal)
  const relationshipOptions = [
    { id: 1, name: 'Father' },
    { id: 2, name: 'Mother' },
    { id: 3, name: 'Brother' },
    { id: 4, name: 'Sister' },
    { id: 5, name: 'Spouse' },
    { id: 6, name: 'Son' },
    { id: 7, name: 'Daughter' },
    { id: 8, name: 'Grandfather' },
    { id: 9, name: 'Grandmother' },
    { id: 10, name: 'Other' }
  ];

  const getRelationshipName = (relationshipID) => {
    const relationship = relationshipOptions.find(rel => rel.id === relationshipID);
    return relationship ? relationship.name : 'Unknown';
  };

  // Load dependents on component mount
  useEffect(() => {
    loadDependents();
  }, []);

  const loadDependents = async () => {
    try {
      setIsLoading(true);
      const response = await getDependents();
      setDependentsList(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error loading dependents:', error);
      setError('Failed to load dependents');
      // Fallback to mock data
      setDependentsList(dependents);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDependant = (newDependant) => {
    // Add the new dependant to the list
    setDependentsList(prev => [...prev, newDependant]);
    // Optionally reload the list to get fresh data from server
    // loadDependents();
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

  const filteredDependents = dependentsList.filter(dependent => {
    // Handle both API data structure and mock data structure
    const fullName = dependent.first_Name 
      ? `${dependent.first_Name} ${dependent.middle_Name || ''} ${dependent.last_Name}`.trim()
      : dependent.name || '';
    
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        {isLoading ? (
          <div className="loading-message">Loading dependents...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredDependents.length === 0 ? (
          <div className="no-dependents">No dependents found</div>
        ) : (
          filteredDependents.map(dependent => {
            // Handle both API data structure and mock data structure
            const displayName = dependent.first_Name 
              ? `${dependent.first_Name} ${dependent.middle_Name ? dependent.middle_Name + ' ' : ''}${dependent.last_Name}`
              : dependent.name || 'Unknown';
            
            const relationship = dependent.relationshipID 
              ? getRelationshipName(dependent.relationshipID)
              : dependent.relationship || 'Unknown';

            return (
              <div key={dependent.dependent_ID || dependent.id} className="dependant-card">
                <div className="dependant-main-info">
                  <div className="dependant-avatar">
                    <img 
                      src={dependent.imageUrl || dependent.avatar || 'https://i.pravatar.cc/120?img=1'} 
                      alt={displayName} 
                    />
                  </div>
                  <div className="dependant-details">
                    <h3 className="dependant-name">{displayName}</h3>
                    <div className="dependant-meta">
                      <span className="dependant-relationship">{relationship}</span>
                      <span className="dependant-dot">•</span>
                      <span className="dependant-gender">{dependent.gender || 'N/A'}</span>
                      <span className="dependant-dot">•</span>
                      <span className="dependant-age">
                        {typeof dependent.age === 'number' ? `${dependent.age} Years` : dependent.age || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="dependant-blood-group">
                  <div className="blood-group-label">Blood Group</div>
                  <div className="blood-group-value">{dependent.bloodGroup || 'N/A'}</div>
                </div>

                <div className="dependant-actions">
                  <button 
                    className={`toggle-btn ${dependent.isActive !== false ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleActive(dependent.dependent_ID || dependent.id)}
                    title={dependent.isActive !== false ? 'Active' : 'Inactive'}
                  >
                    <div className="toggle-switch">
                      <div className="toggle-circle"></div>
                    </div>
                  </button>
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(dependent.dependent_ID || dependent.id)}
                    title="Edit"
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(dependent.dependent_ID || dependent.id)}
                    title="Delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <AddDependantModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddDependant={handleAddDependant}
        patientData={patientData}
      />
    </div>
  );
};

export default Dependents;
