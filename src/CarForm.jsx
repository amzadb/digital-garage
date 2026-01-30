import React, { useState } from 'react';
import './CarForm.css';

function CarForm({ onAddCar }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Validate individual field
  const validateField = (name, value) => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(value);
    
    switch (name) {
      case 'brand':
        if (!value.trim()) {
          return 'Brand is required';
        } else if (value.length < 3) {
          return 'Brand must be at least 3 characters';
        } else if (value.length > 50) {
          return 'Brand must be less than 50 characters';
        } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
          return 'Brand can only contain letters, spaces, and hyphens';
        }
        return '';
        
      case 'model':
        if (!value.trim()) {
          return 'Model is required';
        } else if (value.length < 3) {
          return 'Model must be at least 3 characters';
        } else if (value.length > 50) {
          return 'Model must be less than 50 characters';
        }
        return '';
        
      case 'year':
        if (!value.trim()) {
          return 'Year is required';
        } else if (isNaN(yearNum)) {
          return 'Year must be a valid number';
        } else if (yearNum < 1900) {
          return 'Year must be 1900 or later';
        } else if (yearNum > currentYear + 2) {
          return `Year cannot be more than ${currentYear + 2}`;
        } else if (!/^\d{4}$/.test(value)) {
          return 'Year must be exactly 4 digits';
        }
        return '';
        
      default:
        return '';
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate the field and update errors immediately
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Validation functions
  const validateForm = () => {
    const newErrors = {};
    
    // Brand validation
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    } else if (formData.brand.length < 3) {
      newErrors.brand = 'Brand must be at least 3 characters';
    } else if (formData.brand.length > 50) {
      newErrors.brand = 'Brand must be less than 50 characters';
    } else if (!/^[a-zA-Z\s-]+$/.test(formData.brand)) {
      newErrors.brand = 'Brand can only contain letters, spaces, and hyphens';
    }

    // Model validation
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    } else if (formData.model.length < 3) {
      newErrors.model = 'Model must be at least 3 characters';
    } else if (formData.model.length > 50) {
      newErrors.model = 'Model must be less than 50 characters';
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(formData.year);
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else if (isNaN(yearNum)) {
      newErrors.year = 'Year must be a valid number';
    } else if (yearNum < 1900) {
      newErrors.year = 'Year must be 1900 or later';
    } else if (yearNum > currentYear + 2) {
      newErrors.year = `Year cannot be more than ${currentYear + 2}`;
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'Year must be exactly 4 digits';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Create new car object
      const newCar = {
        id: Date.now(), // Simple ID generation for demo
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year)
      };

      // Add car through parent component
      onAddCar(newCar);

      // Reset form
      setFormData({ brand: '', model: '', year: '' });
      setErrors({});
      setShowForm(false);
      
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Error adding car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ brand: '', model: '', year: '' });
    setErrors({});
  };

  // Cancel and hide form
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="car-form-container">
      {!showForm ? (
        <button 
          className="show-form-button"
          onClick={() => setShowForm(true)}
        >
          ➕ Add New Car
        </button>
      ) : (
        <div className="car-form-wrapper">
          <div className="car-form-header">
            <h2>🚗 Add New Car to Garage</h2>
            <button 
              className="close-form-button"
              onClick={handleCancel}
              type="button"
            >
              ✖️
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="car-form">
            <div className="form-group">
              <label htmlFor="brand">
                Brand <span className="required">*</span>
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={errors.brand ? 'error' : ''}
                placeholder="e.g., Tesla, BMW, Ford"
                maxLength="50"
                disabled={isSubmitting}
              />
              {errors.brand && <span className="error-message">{errors.brand}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="model">
                Model <span className="required">*</span>
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={errors.model ? 'error' : ''}
                placeholder="e.g., Cybertruck, X5, Mustang"
                maxLength="50"
                disabled={isSubmitting}
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="year">
                Year <span className="required">*</span>
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={errors.year ? 'error' : ''}
                placeholder="e.g., 2024"
                min="1900"
                max={new Date().getFullYear() + 2}
                disabled={isSubmitting}
              />
              {errors.year && <span className="error-message">{errors.year}</span>}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Adding...' : '🚗 Add Car'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CarForm;