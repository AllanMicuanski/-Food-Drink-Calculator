// src/components/StepIndicator.jsx
import React from 'react';

const StepIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps, 
  onStepClick 
}) => {
  const getStepStatus = (stepId) => {
    if (completedSteps.has(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    if (stepId < currentStep) return 'completed';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return '✅';
    if (status === 'active') return step.icon;
    return step.icon;
  };

  return (
    <div className="step-indicator">
      <div className="steps-container">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <div key={step.id} className="step-wrapper">
              <div 
                className={`step ${status}`}
                onClick={() => onStepClick && onStepClick(step.id)}
                role="button"
                tabIndex={0}
              >
                <div className="step-number">
                  <span className="step-icon">
                    {getStepIcon(step, status)}
                  </span>
                </div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-description">{step.description}</div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`step-connector ${status === 'completed' ? 'completed' : ''}`}>
                  <div className="connector-line"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;