// src/components/StepDrinksSimple.jsx - Versão simplificada
import React from 'react';
import InputField from './InputField';

const StepDrinksSimple = ({
  bebidaPorPessoa,
  precoPizza,
  handleBebidaPorPessoaChange,
  handlePrecoPizzaChange,
  getFieldStatus,
  getFieldMessage,
  resultadoComida
}) => {
  console.log('StepDrinksSimple data:', { bebidaPorPessoa, precoPizza, resultadoComida });
  
  const { totalPizzas = 0, totalFatias = 0 } = resultadoComida || {};

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h2>🥤 Passo 2: Bebidas & Preços</h2>
        <p>Configure as bebidas e o preço das pizzas para sua festa</p>
      </div>

      <div className="step-content">
        <div className="form-section">
          <h3>💰 Preço da Pizza</h3>
          <InputField
            type="number"
            value={precoPizza}
            onChange={(e) => handlePrecoPizzaChange(Number(e.target.value))}
            label="Preço por pizza (R$)"
            placeholder="Ex: 35.00"
            min="0"
            step="0.01"
            status={getFieldStatus ? getFieldStatus('precoPizza') : 'default'}
            message={getFieldMessage ? getFieldMessage('precoPizza') : ''}
            icon="💰"
          />
        </div>

        <div className="form-section">
          <h3>🥤 Bebidas por Pessoa</h3>
          <InputField
            type="number"
            value={bebidaPorPessoa}
            onChange={(e) => handleBebidaPorPessoaChange(Number(e.target.value))}
            label="Litros por pessoa"
            placeholder="Ex: 0.75"
            min="0"
            step="0.1"
            status={getFieldStatus ? getFieldStatus('bebidaPorPessoa') : 'default'}
            message={getFieldMessage ? getFieldMessage('bebidaPorPessoa') : ''}
            icon="🥤"
          />
        </div>

        {totalPizzas > 0 && (
          <div className="preview-summary">
            <h3>📊 Resumo até agora</h3>
            <div className="summary-item">
              <span>🍕 Pizzas necessárias: {totalPizzas}</span>
            </div>
            <div className="summary-item">
              <span>🍽️ Total de fatias: {totalFatias}</span>
            </div>
          </div>
        )}
      </div>

      <div className="step-tip">
        💡 <strong>Dica:</strong> Para festas longas, considere 0.8L por pessoa. Para eventos curtos, 0.5L é suficiente.
      </div>
    </div>
  );
};

export default StepDrinksSimple;