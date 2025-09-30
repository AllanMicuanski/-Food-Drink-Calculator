// src/hooks/useWizard.js
import { useState, useMemo, useCallback } from "react";

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

  const goToNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const markStepCompleted = useCallback((step) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  }, []);

  const isStepCompleted = useCallback(
    (step) => completedSteps.has(step),
    [completedSteps]
  );
  const isStepActive = useCallback(
    (step) => currentStep === step,
    [currentStep]
  );

  const navigationState = useMemo(
    () => ({
      canGoToNext: currentStep < totalSteps,
      canGoToPrevious: currentStep > 1,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
    }),
    [currentStep, totalSteps]
  );

  const currentStepData = useMemo(
    () => steps.find((step) => step.id === currentStep),
    [steps, currentStep]
  );

  const resetWizard = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps(new Set());
  }, []);

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
    ...navigationState,
    resetWizard,
    totalSteps,
  };
};

export default useWizard;
