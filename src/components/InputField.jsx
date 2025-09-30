// src/components/InputField.jsx
import React from 'react';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  status = 'default',
  message = '',
  placeholder,
  min,
  max,
  step,
  required = false,
  ...props
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'input-success';
      case 'warning':
        return 'input-warning';
      case 'error':
        return 'input-error';
      default:
        return '';
    }
  };

  return (
    <div className="input-field">
      <label className={required ? 'required' : ''}>
        {label}
        {required && <span className="required-asterisk"> *</span>}
      </label>
      
      <div className="input-wrapper">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`input ${getStatusClass()}`}
          {...props}
        />
        {status !== 'default' && (
          <span className="input-icon">{getStatusIcon()}</span>
        )}
      </div>
      
      {message && (
        <div className={`input-message ${status}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default InputField;