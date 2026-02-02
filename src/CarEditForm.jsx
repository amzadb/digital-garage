import React, { useState, useEffect } from 'react';
import './CarForm.css'; // Reuse the same styles

function CarEditForm({ car, onUpdateCar, onCancel }) {
  const [formData, setFormData] = useState({
    brand: car.brand || '',
    model: car.model || '',
    year: car.year ? car.year.toString() : '',
    fuelLevel: car.fuelLevel ? car.fuelLevel.toString() : ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when car prop changes
  useEffect(() => {
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      year: car.year ? car.year.toString() : '',
      fuelLevel: car.fuelLevel ? car.fuelLevel.toString() : ''
    });
    setErrors({});
  }, [car]);

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
        
      case 'fuelLevel':
        const fuelNum = parseInt(value);
        if (!value.trim()) {
          return 'Fuel level is required';
        } else if (isNaN(fuelNum)) {
          return 'Fuel level must be a valid number';
        } else if (fuelNum < 0) {
          return 'Fuel level cannot be negative';
        } else if (fuelNum > 100) {
          return 'Fuel level cannot exceed 100%';
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
    
    // Validate all fields
    ['brand', 'model', 'year', 'fuelLevel'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

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
      // Create updated car object
      const updatedCar = {
        ...car,
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        fuelLevel: parseInt(formData.fuelLevel)
      };

      // Update car through parent component
      onUpdateCar(updatedCar);
      
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Error updating car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      year: car.year ? car.year.toString() : ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="car-form-wrapper">
      <div className="car-form-header">
        <h2>✏️ Edit Car Details</h2>
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
          <label htmlFor="edit-brand">
            Brand <span className="required">*</span>
          </label>
          <input
            type="text"
            id="edit-brand"
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
          <label htmlFor="edit-model">
            Model <span className="required">*</span>
          </label>
          <input
            type="text"
            id="edit-model"
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
          <label htmlFor="edit-year">
            Year <span className="required">*</span>
          </label>
          <input
            type="number"
            id="edit-year"
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

        <div className="form-group">
          <label htmlFor="edit-fuelLevel">
            Fuel Level (%) <span className="required">*</span>
          </label>
          <input
            type="number"
            id="edit-fuelLevel"
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleInputChange}
            className={errors.fuelLevel ? 'error' : ''}
            placeholder="e.g., 75"
            min="0"
            max="100"
            disabled={isSubmitting}
          />
          {errors.fuelLevel && <span className="error-message">{errors.fuelLevel}</span>}
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
            {isSubmitting ? '⏳ Updating...' : '💾 Update Car'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarEditForm;