// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Carregando...',
  showMessage = true 
}) => {
  return (
    <div className="loading-spinner">
      <div className={`spinner ${size}`}>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {showMessage && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;