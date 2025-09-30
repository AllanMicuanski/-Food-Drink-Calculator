// src/utils/calculations.js

// Funções puras de cálculo para otimização
export const calculatePizzaNeeds = (
  pessoas,
  fatiasPorPessoa,
  fatiasPorPizza
) => {
  const totalFatias = pessoas * fatiasPorPessoa;
  const totalPizzas = Math.ceil(totalFatias / fatiasPorPizza);
  return { totalFatias, totalPizzas };
};

export const calculateCosts = (totalPizzas, precoPizza, pessoas) => {
  const totalCustoPizza = totalPizzas * precoPizza;
  const rachaRango = pessoas > 0 ? totalCustoPizza / pessoas : 0;
  return { totalCustoPizza, rachaRango };
};

export const calculateDrinks = (pessoas, bebidaPorPessoa) => {
  const totalLitros = pessoas * bebidaPorPessoa;
  return { totalLitros };
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatNumber = (value, decimals = 2) => {
  return Number(value).toFixed(decimals);
};

// Cache para resultados de cálculos frequentes
const calculationCache = new Map();

export const memoizedCalculation = (key, calculationFn) => {
  if (calculationCache.has(key)) {
    return calculationCache.get(key);
  }

  const result = calculationFn();
  calculationCache.set(key, result);

  // Limpar cache se ficar muito grande
  if (calculationCache.size > 100) {
    const firstKey = calculationCache.keys().next().value;
    calculationCache.delete(firstKey);
  }

  return result;
};

export const clearCalculationCache = () => {
  calculationCache.clear();
};
