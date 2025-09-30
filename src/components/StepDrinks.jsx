// src/components/StepDrinks.jsx
import React from 'react';
import InputField from './InputField';

const StepDrinks = ({
  bebidaPorPessoa,
  precoPizza,
  handleBebidaPorPessoaChange,
  handlePrecoPizzaChange,
  getFieldStatus,
  getFieldMessage,
  resultadoComida
}) => {
  const { totalPizzas, totalFatias } = resultadoComida;

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h2>🥤 Passo 2: Bebidas & Preços</h2>
        <p>Agora vamos definir a quantidade de bebida por pessoa e o preço das pizzas para calcular os custos.</p>
      </div>

      <div className="step-preview">
        <h3>📋 Resumo até agora:</h3>
        <div className="preview-cards">
          <div className="preview-card">
            <span className="preview-icon">🍕</span>
            <div>
              <strong>{totalPizzas}</strong> pizzas necessárias
              <br />
              <small>{totalFatias} fatias no total</small>
            </div>
          </div>
        </div>
      </div>

      <div className="step-content">
        <InputField
          label="Quantos litros de bebida por pessoa?"
          type="number"
          value={bebidaPorPessoa}
          onChange={(e) => handleBebidaPorPessoaChange(e.target.value)}
          min="0.1"
          max="3"
          step="0.1"
          placeholder="Ex: 0.5 litros"
          status={getFieldStatus('bebidaPorPessoa')}
          message={getFieldMessage('bebidaPorPessoa')}
          required
        />

        <InputField
          label="Qual o preço de cada pizza? (R$)"
          type="number"
          value={precoPizza}
          onChange={(e) => handlePrecoPizzaChange(e.target.value)}
          min="0"
          step="0.01"
          placeholder="Ex: 35.00"
          status={getFieldStatus('precoPizza')}
          message={getFieldMessage('precoPizza')}
          required
        />
      </div>

      <div className="step-tip">
        💡 <strong>Dicas:</strong>
        <ul>
          <li>Para festas de 2-3 horas: 0.4-0.6L por pessoa</li>
          <li>Para festas longas (4+ horas): 0.7-1L por pessoa</li>
          <li>Considere o clima: dias quentes = mais bebida</li>
        </ul>
      </div>
    </div>
  );
};

export default StepDrinks;