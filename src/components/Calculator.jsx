// src/components/Calculator.jsx
import React from 'react';
import StepIndicator from './StepIndicator';
import StepPizza from './StepPizza';
import StepDrinks from './StepDrinks';
import StepResults from './StepResults';
import WizardNavigation from './WizardNavigation';
import usePartyCalculator from '../hooks/usePartyCalculator';
import useCalculations from '../hooks/useCalculations';
import useValidation from '../hooks/useValidation';
import useWizard from '../hooks/useWizard';
import '../styles/components/Calculator.css';

const Calculator = () => {
  const {
    pessoas,
    tamanhoPizza,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza,
    handlePessoasChange,
    handleTamanhoPizzaChange,
    handleFatiasPorPessoaChange,
    handleBebidaPorPessoaChange,
    handlePrecoPizzaChange,
    resetarCampos
  } = usePartyCalculator();

  const { resultadoComida, resultadoBebida } = useCalculations({
    pessoas,
    tamanhoPizza,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza
  });

  const {
    getFieldStatus,
    getFieldMessage,
    isFormValid
  } = useValidation({
    pessoas,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza
  });

  const {
    currentStep,
    steps,
    completedSteps,
    goToNext,
    goToPrevious,
    goToStep,
    canGoToNext,
    canGoToPrevious,
    isLastStep,
    resetWizard
  } = useWizard();

  const handleNext = () => {
    if (isFormValid || currentStep === 3) {
      goToNext();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepPizza
            pessoas={pessoas}
            tamanhoPizza={tamanhoPizza}
            fatiasPorPessoa={fatiasPorPessoa}
            handlePessoasChange={handlePessoasChange}
            handleTamanhoPizzaChange={handleTamanhoPizzaChange}
            handleFatiasPorPessoaChange={handleFatiasPorPessoaChange}
            getFieldStatus={getFieldStatus}
            getFieldMessage={getFieldMessage}
          />
        );
      case 2:
        return (
          <StepDrinks
            bebidaPorPessoa={bebidaPorPessoa}
            precoPizza={precoPizza}
            handleBebidaPorPessoaChange={handleBebidaPorPessoaChange}
            handlePrecoPizzaChange={handlePrecoPizzaChange}
            getFieldStatus={getFieldStatus}
            getFieldMessage={getFieldMessage}
            resultadoComida={resultadoComida}
          />
        );
      case 3:
        return (
          <StepResults
            resultadoComida={resultadoComida}
            resultadoBebida={resultadoBebida}
            pessoas={pessoas}
            resetarCampos={resetarCampos}
            resetWizard={resetWizard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="calculator wizard-mode">
      <header className="calculator-header">
        <h1>🎉 Calculadora de Festas 🎉</h1>
        <p>Planeje sua festa em 3 passos simples!</p>
      </header>

      <StepIndicator 
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
      />

      <div className="wizard-content">
        {renderCurrentStep()}
      </div>

      {!isLastStep && (
        <WizardNavigation
          currentStep={currentStep}
          canGoToPrevious={canGoToPrevious}
          canGoToNext={canGoToNext}
          onPrevious={goToPrevious}
          onNext={handleNext}
          isFormValid={isFormValid}
          isLastStep={isLastStep}
        />
      )}

      <footer className="footer">
        <p>Powered by: Allan Micuanski</p>
      </footer>
    </div>
  );
};

export default Calculator;
