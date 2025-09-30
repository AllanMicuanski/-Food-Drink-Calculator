// src/hooks/useWizard.js
import { useState, useMemo } from "react";

const useWizard = (totalSteps = 3) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: "Pessoas & Pizza",
        description: "Configure quantas pessoas e o tipo de pizza",
        icon: "👥",
      },
      {
        id: 2,
        title: "Bebidas & Preços",
        description: "Defina bebidas por pessoa e preço da pizza",
        icon: "🥤",
      },
      {
        id: 3,
        title: "Resultados",
        description: "Veja o resumo completo da sua festa",
        icon: "📊",
      },
    ],
    []
  );

  const goToNext = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const markStepCompleted = (step) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  };

  const isStepCompleted = (step) => completedSteps.has(step);
  const isStepActive = (step) => currentStep === step;
  const canGoToNext = currentStep < totalSteps;
  const canGoToPrevious = currentStep > 1;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const currentStepData = steps.find((step) => step.id === currentStep);

  const resetWizard = () => {
    setCurrentStep(1);
    setCompletedSteps(new Set());
  };

  return {
    currentStep,
    currentStepData,
    steps,
    completedSteps,
    goToNext,
    goToPrevious,
    goToStep,
    markStepCompleted,
    isStepCompleted,
    isStepActive,
    canGoToNext,
    canGoToPrevious,
    isFirstStep,
    isLastStep,
    resetWizard,
    totalSteps,
  };
};

export default useWizard;
