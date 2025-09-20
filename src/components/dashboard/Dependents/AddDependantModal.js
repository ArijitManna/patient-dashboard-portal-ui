import React, { useState } from 'react';
import './AddDependantModal.css';

const AddDependantModal = ({ isOpen, onClose, onAddDependant }) => {
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    dateOfBirth: '',
    gender: 'Male',
    profilePhoto: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        alert('File size should be below 4 MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({
      ...prev,
      profilePhoto: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.relationship || !formData.dateOfBirth) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new dependant object
    const newDependant = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      relationship: formData.relationship,
      age: calculateAge(formData.dateOfBirth),
      gender: formData.gender,
      bloodGroup: 'AB+ve', // Default value
      isActive: true,
      avatar: photoPreview || 'https://i.pravatar.cc/120?img=' + Math.floor(Math.random() * 70)
    };

    onAddDependant(newDependant);
    handleClose();
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} Years`;
  };

  const handleClose = () => {
    setFormData({
      name: '',
      relationship: '',
      dateOfBirth: '',
      gender: 'Male',
      profilePhoto: null
    });
    setPhotoPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add Dependant</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Profile Photo Section */}
          <div className="form-section">
            <label className="form-label">Profile Photo</label>
            <div className="photo-upload-container">
              <div className="photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="preview-image" />
                ) : (
                  <div className="photo-placeholder">
                    <i className="fa-solid fa-image"></i>
                  </div>
                )}
              </div>
              <div className="photo-actions">
                <label className="upload-btn">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/svg+xml"
                    onChange={handlePhotoUpload}
                    hidden
                  />
                  Upload New
                </label>
                {photoPreview && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={handleRemovePhoto}
                  >
                    Remove
                  </button>
                )}
                <p className="photo-info">
                  Your Image should Below 4 MB, Accepted format jpg,png,svg
                </p>
              </div>
            </div>
          </div>

          {/* Name and Relationship Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Relationship <span className="required">*</span>
              </label>
              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Mother, Father, Brother"
                required
              />
            </div>
          </div>

          {/* Date of Birth and Gender Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Date of Birth <span className="required">*</span>
              </label>
              <div className="date-input-container">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="form-input date-input"
                  required
                />
                <i className="fa-solid fa-calendar date-icon"></i>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                Select Gender <span className="required">*</span>
              </label>
              <div className="gender-buttons">
                {['Male', 'Female', 'Others'].map(gender => (
                  <button
                    key={gender}
                    type="button"
                    className={`gender-btn ${formData.gender === gender ? 'active' : ''}`}
                    onClick={() => handleGenderSelect(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Dependant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDependantModal;