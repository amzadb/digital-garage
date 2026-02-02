import React, { useState } from 'react';
import CarEditForm from './CarEditForm';
import './Car.css';

function Car({ id, brand, model, year, fuelLevel, onDelete, onUpdate }) {
  // Add State - Use useState to track headlightsOn and engineRunning booleans
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [engineRunning, setEngineRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Add Interactivity - Function to toggle headlights
  const toggleHeadlights = () => {
    setHeadlightsOn(!headlightsOn);
  };

  // Add Interactivity - Function to toggle engine
  const toggleEngine = () => {
    setEngineRunning(!engineRunning);
  };

  // Handle car deletion
  const handleDelete = () => {
    onDelete(id);
  };

  // Handle car edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle car update
  const handleUpdate = (updatedCar) => {
    onUpdate(updatedCar);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Dynamic background based on both headlights and engine status
  const getBackgroundColor = () => {
    if (headlightsOn && engineRunning) return '#e8f5e8'; // Light green when both are on
    if (headlightsOn) return '#fffbe6'; // Light yellow for lights only
    if (engineRunning) return '#f0f8f0'; // Very light green for engine only
    return '#f4f4f4'; // Gray when both are off
  };

  const getBorderColor = () => {
    if (headlightsOn && engineRunning) return '2px solid #28a745'; // Green border
    if (headlightsOn) return '2px solid gold'; // Gold border
    if (engineRunning) return '2px solid #20c997'; // Teal border
    return '2px solid #ccc'; // Gray border
  };

  // Get fuel level color based on percentage
  const getFuelLevelColor = () => {
    if (fuelLevel > 70) return '#28a745'; // Green
    if (fuelLevel > 30) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  // Get fuel level emoji based on percentage
  const getFuelLevelEmoji = () => {
    if (fuelLevel > 70) return '⛽'; // Full
    if (fuelLevel > 30) return '⚠️'; // Medium
    return '🚨'; // Low
  };

  return (
    <>
      {isEditing ? (
        <CarEditForm
          car={{ id, brand, model, year, fuelLevel }}
          onUpdateCar={handleUpdate}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div 
          className="car-card" 
          style={{ 
            backgroundColor: getBackgroundColor(),
            border: getBorderColor()
          }}
        >
          <h3>{year} {brand} {model}</h3>
          
          <div className="status-section">
            <p className="status">
              Engine: {engineRunning ? "🚗 Running" : "⏹️ Stopped"}
            </p>
            <p className="status">
              Lights: {headlightsOn ? "🔦 On" : "🌑 Off"}
            </p>
            <p className="status">
              Fuel: {getFuelLevelEmoji()} 
              <span style={{ color: getFuelLevelColor(), fontWeight: 'bold' }}>
                {fuelLevel}%
              </span>
            </p>
            <div className="fuel-bar">
              <div 
                className="fuel-level" 
                style={{ 
                  width: `${fuelLevel}%`, 
                  backgroundColor: getFuelLevelColor() 
                }}
              ></div>
            </div>
          </div>
          
          <div className="car-controls">
            <button 
              className={`engine-button ${engineRunning ? 'engine-running' : 'engine-stopped'}`}
              onClick={toggleEngine}
            >
              {engineRunning ? "🛑 Stop" : "🚀 Start"}
            </button>
            
            <button 
              className={`light-button ${headlightsOn ? 'lights-on' : 'lights-off'}`}
              onClick={toggleHeadlights}
            >
              {headlightsOn ? "💡 Off" : "💡 On"}
            </button>
            
            <button 
              className="edit-button"
              onClick={handleEdit}
              title="Edit this car"
            >
              ✏️
            </button>
            
            <button 
              className="delete-button"
              onClick={handleDelete}
              title="Remove this car from garage"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Car;