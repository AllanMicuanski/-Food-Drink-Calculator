// src/hooks/useValidation.js
import { useMemo } from "react";

const useValidation = ({
  pessoas,
  fatiasPorPessoa,
  bebidaPorPessoa,
  precoPizza,
}) => {
  const validationRules = useMemo(() => {
    const errors = {};
    const warnings = {};
    const suggestions = {};

    // Validação para número de pessoas
    if (pessoas < 0) {
      errors.pessoas = "Número de pessoas não pode ser negativo";
    } else if (pessoas === 0) {
      warnings.pessoas = "Digite o número de pessoas para começar";
    } else if (pessoas > 100) {
      warnings.pessoas = "Festa muito grande! Confirme o número de pessoas";
    } else if (pessoas >= 1) {
      suggestions.pessoas = `Perfeito! Festa para ${pessoas} pessoa${
        pessoas > 1 ? "s" : ""
      }`;
    }

    // Validação para fatias por pessoa
    if (fatiasPorPessoa < 1) {
      errors.fatiasPorPessoa = "Mínimo de 1 fatia por pessoa";
    } else if (fatiasPorPessoa > 8) {
      warnings.fatiasPorPessoa = "Muitas fatias! Tem certeza?";
    } else if (fatiasPorPessoa >= 2 && fatiasPorPessoa <= 5) {
      suggestions.fatiasPorPessoa = "Quantidade ideal para adultos";
    } else if (fatiasPorPessoa === 1) {
      suggestions.fatiasPorPessoa = "Pouco para adultos, ideal para crianças";
    }

    // Validação para bebida por pessoa
    if (bebidaPorPessoa < 0.1) {
      errors.bebidaPorPessoa = "Mínimo de 0.1 litros por pessoa";
    } else if (bebidaPorPessoa > 2) {
      warnings.bebidaPorPessoa = "Muita bebida! Confirme a quantidade";
    } else if (bebidaPorPessoa >= 0.3 && bebidaPorPessoa <= 0.8) {
      suggestions.bebidaPorPessoa = "Quantidade ideal para festas";
    } else if (bebidaPorPessoa < 0.3) {
      warnings.bebidaPorPessoa = "Pode ser pouco para uma festa";
    }

    // Validação para preço da pizza
    if (precoPizza < 0) {
      errors.precoPizza = "Preço não pode ser negativo";
    } else if (precoPizza === 0 && pessoas > 0) {
      warnings.precoPizza = "Digite o preço para calcular os custos";
    } else if (precoPizza > 0 && precoPizza < 15) {
      warnings.precoPizza = "Preço muito baixo, confirme o valor";
    } else if (precoPizza > 100) {
      warnings.precoPizza = "Preço muito alto, confirme o valor";
    } else if (precoPizza >= 20 && precoPizza <= 60) {
      suggestions.precoPizza = "Preço dentro da média do mercado";
    }

    return { errors, warnings, suggestions };
  }, [pessoas, fatiasPorPessoa, bebidaPorPessoa, precoPizza]);

  const getFieldStatus = (fieldName) => {
    if (validationRules.errors[fieldName]) {
      return "error";
    } else if (validationRules.warnings[fieldName]) {
      return "warning";
    } else if (validationRules.suggestions[fieldName]) {
      return "success";
    }
    return "default";
  };

  const getFieldMessage = (fieldName) => {
    return (
      validationRules.errors[fieldName] ||
      validationRules.warnings[fieldName] ||
      validationRules.suggestions[fieldName] ||
      ""
    );
  };

  const hasErrors = Object.keys(validationRules.errors).length > 0;
  const hasWarnings = Object.keys(validationRules.warnings).length > 0;

  return {
    validationRules,
    getFieldStatus,
    getFieldMessage,
    hasErrors,
    hasWarnings,
    isFormValid: !hasErrors && pessoas > 0 && precoPizza > 0,
  };
};

export default useValidation;
