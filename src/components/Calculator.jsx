// src/components/Calculator.jsx
import React, { memo, useMemo, useCallback } from 'react';
import StepIndicator from './StepIndicator';
import StepPizza from './StepPizza';
import StepDrinksSimple from './StepDrinksSimple';
// import StepDrinks from './StepDrinks'; // Comentado temporariamente
import StepResults from './StepResults';
import WizardNavigation from './WizardNavigation';
import usePartyCalculator from '../hooks/usePartyCalculator';
import useCalculations from '../hooks/useCalculations';
import useValidation from '../hooks/useValidation';
import useWizard from '../hooks/useWizard';
import '../styles/components/Calculator.css';

const Calculator = memo(() => {
  console.log('Calculator component rendering...');

  try {
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

    console.log('usePartyCalculator OK', { pessoas, tamanhoPizza });

    const { resultadoComida, resultadoBebida } = useCalculations({
      pessoas,
      tamanhoPizza,
      fatiasPorPessoa,
      bebidaPorPessoa,
      precoPizza
    });

    console.log('useCalculations OK', { resultadoComida, resultadoBebida });

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

    console.log('useValidation OK');

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

    console.log('useWizard OK', { currentStep });

    const handleNext = useCallback(() => {
      console.log('handleNext called', { currentStep, isFormValid, pessoas });
      
      // Validação por passo
      let canProceed = false;
      
      switch (currentStep) {
        case 1:
          // No passo 1, só precisa ter pessoas válidas
          canProceed = pessoas > 0;
          break;
        case 2:
          // No passo 2, precisa ter preço válido
          canProceed = precoPizza > 0;
          break;
        case 3:
          canProceed = true; // Último passo
          break;
        default:
          canProceed = false;
      }
      
      console.log('Can proceed:', canProceed);
      
      if (canProceed || currentStep === 3) {
        goToNext();
      }
    }, [currentStep, pessoas, precoPizza, goToNext]);

    // Validação específica por passo
    const isCurrentStepValid = useMemo(() => {
      switch (currentStep) {
        case 1:
          return pessoas > 0;
        case 2:
          return pessoas > 0 && precoPizza > 0;
        case 3:
          return true;
        default:
          return false;
      }
    }, [currentStep, pessoas, precoPizza]);

    const renderCurrentStep = () => {
      console.log('Rendering step:', currentStep);
      console.log('Data:', { pessoas, resultadoComida, resultadoBebida });
      
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
            <StepDrinksSimple
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
          return <div>Erro: Passo inválido</div>;
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
            isFormValid={isCurrentStepValid}
            isLastStep={isLastStep}
          />
        )}

        <footer className="footer">
          <p>Powered by: Allan Micuanski</p>
        </footer>
      </div>
    );

  } catch (error) {
    console.error('Error in Calculator component:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Erro na aplicação</h2>
        <p>Erro: {error.message}</p>
        <p>Verifique o console para mais detalhes.</p>
      </div>
    );
  }
});

Calculator.displayName = 'Calculator';

export default Calculator;
