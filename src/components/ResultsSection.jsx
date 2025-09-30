// src/components/ResultsSection.jsx
import React from 'react';

const ResultsSection = ({ resultadoComida, resultadoBebida }) => {
  const { totalPizzas, totalFatias, totalCustoPizza, rachaRango } = resultadoComida;
  const { totalLitros } = resultadoBebida;

  return (
    <div className="results-section">
      <h2>📊 Resultados da sua festa:</h2>
      
      <div className="result-cards">
        <div className="result-card food-card">
          <h3>🍕 Comida</h3>
          <div className="result-item">
            <strong>Pizzas necessárias:</strong> {totalPizzas} unidades
          </div>
          <div className="result-item">
            <strong>Total de fatias:</strong> {totalFatias} fatias
          </div>
          <div className="result-item">
            <strong>Custo total:</strong> R$ {totalCustoPizza.toFixed(2)}
          </div>
        </div>

        <div className="result-card drink-card">
          <h3>🥤 Bebidas</h3>
          <div className="result-item">
            <strong>Refrigerante necessário:</strong> {totalLitros.toFixed(2)} litros
          </div>
        </div>

        <div className="result-card summary-card">
          <h3>💰 Resumo Financeiro</h3>
          <div className="result-item">
            <strong>Valor por pessoa:</strong> R$ {rachaRango.toFixed(2)}
          </div>
          <div className="result-item total">
            <strong>Total geral:</strong> R$ {totalCustoPizza.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;