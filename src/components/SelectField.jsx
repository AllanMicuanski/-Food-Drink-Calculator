// src/components/SelectField.jsx
import React from 'react';

const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  status = 'default',
  message = '',
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
        <select
          value={value}
          onChange={onChange}
          className={`input ${getStatusClass()}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

export default SelectField;