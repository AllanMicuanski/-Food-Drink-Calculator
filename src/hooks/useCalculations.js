// src/hooks/useCalculations.js
import { useMemo } from "react";
import { FATIAS_PIZZA } from "../data/constants";
// Comentado temporariamente para debug
// import {
//   calculatePizzaNeeds,
//   calculateCosts,
//   calculateDrinks,
//   formatCurrency,
//   memoizedCalculation,
// } from "../utils/calculations";

const useCalculations = ({
  pessoas,
  tamanhoPizza,
  fatiasPorPessoa,
  bebidaPorPessoa,
  precoPizza,
}) => {
  const resultadoComida = useMemo(() => {
    // Sempre retorna um objeto válido, mesmo sem dados
    if (!pessoas || pessoas <= 0) {
      return {
        totalPizzas: 0,
        totalFatias: 0,
        totalCustoPizza: 0,
        rachaRango: 0,
        mensagem: "Configure o número de pessoas primeiro",
        racha: "R$ 0.00 por pessoa",
      };
    }

    // Versão simplificada sem utils para debug
    const fatiasPorPizza = FATIAS_PIZZA[tamanhoPizza] || 8;
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / fatiasPorPizza);
    const totalCustoPizza = totalPizzas * precoPizza;
    const rachaRango = pessoas > 0 ? totalCustoPizza / pessoas : 0;

    return {
      totalPizzas,
      totalFatias,
      totalCustoPizza,
      rachaRango,
      mensagem: `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias) - Custo total: R$ ${totalCustoPizza.toFixed(
        2
      )}`,
      racha:
        pessoas > 0
          ? `R$ ${rachaRango.toFixed(2)} por pessoa`
          : "R$ 0.00 por pessoa",
    };
  }, [pessoas, tamanhoPizza, fatiasPorPessoa, precoPizza]);

  const resultadoBebida = useMemo(() => {
    // Sempre retorna um objeto válido
    const totalLitros = (pessoas || 0) * bebidaPorPessoa;
    return {
      totalLitros,
      mensagem: `${totalLitros.toFixed(2)} litros de refrigerante`,
    };
  }, [pessoas, bebidaPorPessoa]);

  const resumoCompleto = useMemo(() => {
    // Sempre retorna um objeto válido
    return {
      comida: resultadoComida,
      bebida: resultadoBebida,
      totalGeral: resultadoComida?.totalCustoPizza || 0,
      custoPorPessoa: resultadoComida?.rachaRango || 0,
    };
  }, [resultadoComida, resultadoBebida]);

  return {
    resultadoComida,
    resultadoBebida,
    resumoCompleto,
  };
};

export default useCalculations;
