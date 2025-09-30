// src/components/StepDrinks.jsx
import React, { useState, useMemo, useCallback, memo } from 'react';
import InputField from './InputField';
import AnimatedIcon from './AnimatedIcon';
import Tooltip from './Tooltip';
import useDebounce from '../hooks/useDebounce';

const StepDrinks = memo(({
  bebidaPorPessoa,
  precoPizza,
  handleBebidaPorPessoaChange,
  handlePrecoPizzaChange,
  getFieldStatus,
  getFieldMessage,
  resultadoComida
}) => {
  console.log('StepDrinks data:', { bebidaPorPessoa, precoPizza, resultadoComida });
  
  // Verificação de segurança para resultadoComida com valores padrão
  const { totalPizzas = 0, totalFatias = 0 } = resultadoComida || {};
  const [selectedDrinkPreset, setSelectedDrinkPreset] = useState(null);
  
  const debouncedPrecoPizza = useDebounce(precoPizza, 300);

  const drinkPresets = useMemo(() => [
    {
      id: 'short',
      icon: '⏰',
      title: 'Festa Curta',
      subtitle: '2-3 horas',
      amount: 0.4,
      description: 'Ideal para almoços ou eventos rápidos'
    },
    {
      id: 'medium',
      icon: '🎉',
      title: 'Festa Média',
      subtitle: '3-4 horas',
      amount: 0.6,
      description: 'Perfeito para a maioria das festas'
    },
    {
      id: 'long',
      icon: '🌙',
      title: 'Festa Longa',
      subtitle: '4+ horas',
      amount: 0.8,
      description: 'Para festas que vão até tarde'
    },
    {
      id: 'hot',
      icon: '☀️',
      title: 'Dia Quente',
      subtitle: 'Clima quente',
      amount: 1.0,
      description: 'Quando está muito calor'
    }
  ], []);

  const handlePresetClick = useCallback((preset) => {
    setSelectedDrinkPreset(preset.id);
    handleBebidaPorPessoaChange(preset.amount.toString());
  }, [handleBebidaPorPessoaChange]);

  const getPriceRecommendation = useMemo(() => {
    const price = parseFloat(debouncedPrecoPizza);
    if (price === 0) return { icon: '💰', text: 'Digite o preço para ver análise', color: '#6c757d' };
    if (price < 20) return { icon: '💸', text: 'Preço muito baixo - verifique!', color: '#dc3545' };
    if (price <= 40) return { icon: '👍', text: 'Preço justo para o mercado', color: '#28a745' };
    if (price <= 60) return { icon: '💰', text: 'Preço médio-alto', color: '#ffc107' };
    return { icon: '💎', text: 'Preço premium', color: '#17a2b8' };
  }, [debouncedPrecoPizza]);

  const priceRec = getPriceRecommendation();

  return (
    <div className="wizard-step enhanced">
      <div className="step-header">
        <div className="header-icon">
          <AnimatedIcon 
            icon="🥤" 
            size="xl" 
            animation="float" 
          />
        </div>
        <h2>
          <AnimatedIcon icon="💰" animation="pulse" /> 
          Passo 2: Bebidas & Preços
        </h2>
        <p>Agora vamos definir a quantidade de bebida por pessoa e o preço das pizzas para calcular os custos.</p>
      </div>

      <div className="step-preview enhanced-preview">
        <div className="preview-header">
          <AnimatedIcon icon="📋" size="large" animation="bounce" />
          <h3>Resumo até agora:</h3>
        </div>
        <div className="preview-cards animated">
          <div className="preview-card pizza-summary">
            <div className="card-icon">
              <AnimatedIcon icon="🍕" size="large" animation="spin" />
            </div>
            <div className="card-content">
              <div className="main-stat">{totalPizzas}</div>
              <div className="stat-label">pizzas necessárias</div>
              <div className="sub-stat">{totalFatias} fatias no total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="step-content enhanced-content">
        <div className="drink-selection">
          <label className="enhanced-label">
            <AnimatedIcon icon="🥤" size="small" /> 
            Escolha o tipo de festa:
          </label>
          <div className="preset-grid">
            {drinkPresets.map((preset) => (
              <div 
                key={preset.id}
                className={`preset-card ${selectedDrinkPreset === preset.id ? 'selected' : ''}`}
                onClick={() => handlePresetClick(preset)}
              >
                <div className="preset-icon">
                  <AnimatedIcon 
                    icon={preset.icon} 
                    size="large" 
                    animation={selectedDrinkPreset === preset.id ? 'bounce' : 'none'} 
                  />
                </div>
                <div className="preset-content">
                  <div className="preset-title">{preset.title}</div>
                  <div className="preset-subtitle">{preset.subtitle}</div>
                  <div className="preset-amount">{preset.amount}L por pessoa</div>
                  <div className="preset-description">{preset.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="custom-input">
          <Tooltip 
            content="Ou digite uma quantidade personalizada de bebida por pessoa. Considere o tempo de duração da festa e o clima."
            position="right"
          >
            <InputField
              label={
                <span>
                  <AnimatedIcon icon="🥤" size="small" /> 
                  Ou digite uma quantidade personalizada:
                </span>
              }
              type="number"
              value={bebidaPorPessoa}
              onChange={(e) => {
                setSelectedDrinkPreset(null);
                handleBebidaPorPessoaChange(e.target.value);
              }}
              min="0.1"
              max="3"
              step="0.1"
              placeholder="Ex: 0.5 litros"
              status={getFieldStatus('bebidaPorPessoa')}
              message={getFieldMessage('bebidaPorPessoa')}
              required
            />
          </Tooltip>
        </div>

        <div className="price-input">
          <Tooltip 
            content="Digite o preço que você pretende pagar por cada pizza. Isso nos ajuda a calcular o custo total da festa."
            position="right"
          >
            <InputField
              label={
                <span>
                  <AnimatedIcon icon="💰" size="small" animation="pulse" /> 
                  Qual o preço de cada pizza? (R$)
                </span>
              }
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
          </Tooltip>
          {precoPizza > 0 && (
            <div className="price-analysis">
              <AnimatedIcon icon={priceRec.icon} color={priceRec.color} />
              <span style={{ color: priceRec.color }}>{priceRec.text}</span>
            </div>
          )}
        </div>
      </div>

      <div className="step-tip enhanced-tip">
        <AnimatedIcon icon="🧠" animation="pulse" color="#007bff" />
        <div>
          <strong>Dicas Inteligentes:</strong>
          <div className="smart-tips">
            <div className="tip-item">
              <AnimatedIcon icon="🌡️" size="small" /> 
              <span>Clima quente? Aumente 30% na bebida</span>
            </div>
            <div className="tip-item">
              <AnimatedIcon icon="🍺" size="small" /> 
              <span>Festa com álcool? Considere mais água/refrigerante</span>
            </div>
            <div className="tip-item">
              <AnimatedIcon icon="👶" size="small" /> 
              <span>Muitas crianças? Elas bebem menos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StepDrinks;