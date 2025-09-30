// src/components/WizardNavigation.jsx
import React from 'react';

const WizardNavigation = ({
  currentStep,
  canGoToPrevious,
  canGoToNext,
  onPrevious,
  onNext,
  isFormValid,
  isLastStep
}) => {
  const getNextButtonText = () => {
    if (isLastStep) return '🎉 Finalizar';
    return `Próximo: ${getNextStepName()}`;
  };

  const getNextStepName = () => {
    switch (currentStep) {
      case 1: return 'Bebidas & Preços';
      case 2: return 'Ver Resultados';
      default: return 'Próximo';
    }
  };

  const getPreviousButtonText = () => {
    switch (currentStep) {
      case 2: return '← Pessoas & Pizza';
      case 3: return '← Bebidas & Preços';
      default: return '← Anterior';
    }
  };

  return (
    <div className="wizard-navigation">
      <div className="nav-buttons">
        {canGoToPrevious && (
          <button 
            onClick={onPrevious}
            className="nav-button secondary"
            type="button"
          >
            {getPreviousButtonText()}
          </button>
        )}

        {canGoToNext && (
          <button 
            onClick={onNext}
            className={`nav-button primary ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
            type="button"
          >
            {getNextButtonText()}
          </button>
        )}
      </div>

      {!isFormValid && !isLastStep && (
        <div className="nav-warning">
          ⚠️ Complete os campos obrigatórios para continuar
        </div>
      )}

      <div className="nav-progress">
        Passo {currentStep} de 3
      </div>
    </div>
  );
};

export default WizardNavigation;