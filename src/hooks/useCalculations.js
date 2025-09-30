// src/hooks/useCalculations.js
import { useMemo } from "react";
import { FATIAS_PIZZA } from "../data/constants";
import {
  calculatePizzaNeeds,
  calculateCosts,
  calculateDrinks,
  formatCurrency,
  memoizedCalculation,
} from "../utils/calculations";

const useCalculations = ({
  pessoas,
  tamanhoPizza,
  fatiasPorPessoa,
  bebidaPorPessoa,
  precoPizza,
}) => {
  const resultadoComida = useMemo(() => {
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

    const cacheKey = `food-${pessoas}-${tamanhoPizza}-${fatiasPorPessoa}-${precoPizza}`;

    return memoizedCalculation(cacheKey, () => {
      const fatiasPorPizza = FATIAS_PIZZA[tamanhoPizza] || 8;
      const { totalFatias, totalPizzas } = calculatePizzaNeeds(
        pessoas,
        fatiasPorPessoa,
        fatiasPorPizza
      );
      const { totalCustoPizza, rachaRango } = calculateCosts(
        totalPizzas,
        precoPizza,
        pessoas
      );

      return {
        totalPizzas,
        totalFatias,
        totalCustoPizza,
        rachaRango,
        mensagem: `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias) - Custo total: ${formatCurrency(
          totalCustoPizza
        )}`,
        racha:
          pessoas > 0
            ? `${formatCurrency(rachaRango)} por pessoa`
            : "R$ 0.00 por pessoa",
      };
    });
  }, [pessoas, tamanhoPizza, fatiasPorPessoa, precoPizza]);

  const resultadoBebida = useMemo(() => {
    const cacheKey = `drinks-${pessoas}-${bebidaPorPessoa}`;

    return memoizedCalculation(cacheKey, () => {
      const { totalLitros } = calculateDrinks(pessoas || 0, bebidaPorPessoa);
      return {
        totalLitros,
        mensagem: `${totalLitros.toFixed(2)} litros de refrigerante`,
      };
    });
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
