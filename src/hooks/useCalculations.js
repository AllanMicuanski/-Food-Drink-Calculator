// src/hooks/useCalculations.js
import { useMemo } from "react";
import { FATIAS_PIZZA } from "../data/constants";

const useCalculations = ({
  pessoas,
  tamanhoPizza,
  fatiasPorPessoa,
  bebidaPorPessoa,
  precoPizza,
}) => {
  const resultadoComida = useMemo(() => {
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / FATIAS_PIZZA[tamanhoPizza]);
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
    const totalBebida = pessoas * bebidaPorPessoa;
    return {
      totalLitros: totalBebida,
      mensagem: `${totalBebida.toFixed(2)} litros de refrigerante`,
    };
  }, [pessoas, bebidaPorPessoa]);

  const resumoCompleto = useMemo(() => {
    return {
      comida: resultadoComida,
      bebida: resultadoBebida,
      totalGeral: resultadoComida.totalCustoPizza,
      custoPorPessoa: resultadoComida.rachaRango,
    };
  }, [resultadoComida, resultadoBebida]);

  return {
    resultadoComida,
    resultadoBebida,
    resumoCompleto,
  };
};

export default useCalculations;
