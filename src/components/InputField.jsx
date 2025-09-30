// src/components/InputField.jsx
import React, { memo, useMemo } from 'react';

const InputField = memo(({
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
  const statusIcons = useMemo(() => ({
    success: '✅',
    warning: '⚠️',
    error: '❌',
    default: ''
  }), []);

  const statusClasses = useMemo(() => ({
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
    default: ''
  }), []);

  const statusIcon = statusIcons[status];
  const statusClass = statusClasses[status];

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
          className={`input ${statusClass}`}
          {...props}
        />
        {status !== 'default' && (
          <span className="input-icon">{statusIcon}</span>
        )}
      </div>
      
      {message && (
        <div className={`input-message ${status}`}>
          {message}
        </div>
      )}
    </div>
  );
});

export default InputField;