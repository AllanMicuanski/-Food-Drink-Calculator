// src/components/StepPizza.jsx
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import AnimatedIcon from './AnimatedIcon';
import Tooltip from './Tooltip';

const StepPizza = ({
  pessoas,
  tamanhoPizza,
  fatiasPorPessoa,
  handlePessoasChange,
  handleTamanhoPizzaChange,
  handleFatiasPorPessoaChange,
  getFieldStatus,
  getFieldMessage
}) => {
  const handleInputChange = (e) => {
    handlePessoasChange(e.target.value);
  };

  const pizzaOptions = [
    { value: 'pequena', label: '🍕 Pequena (4 fatias) - Ideal para 1-2 pessoas' },
    { value: 'media', label: '🍕 Média (6 fatias) - Ideal para 2-3 pessoas' },
    { value: 'grande', label: '🍕 Grande (8 fatias) - Ideal para 3-4 pessoas' },
    { value: 'gigante', label: '🍕 Gigante (12 fatias) - Ideal para 5-6 pessoas' }
  ];

  const getPeopleIcon = () => {
    if (pessoas === 0) return '👥';
    if (pessoas <= 5) return '👥';
    if (pessoas <= 15) return '👨‍👩‍👧‍👦';
    if (pessoas <= 30) return '🎉';
    return '🎊';
  };

  const getSliceRecommendation = () => {
    return (
      <div className="slice-guide">
        <h4>📊 Guia de Consumo:</h4>
        <div className="consumption-guide">
          <div className="guide-item">
            <AnimatedIcon icon="👶" size="small" />
            <span>Crianças (2-8 anos): 1-2 fatias</span>
          </div>
          <div className="guide-item">
            <AnimatedIcon icon="🧑" size="small" />
            <span>Adultos: 3-5 fatias</span>
          </div>
          <div className="guide-item">
            <AnimatedIcon icon="🏃‍♂️" size="small" />
            <span>Adolescentes: 4-6 fatias</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wizard-step enhanced">
      <div className="step-header">
        <div className="header-icon">
          <AnimatedIcon 
            icon={getPeopleIcon()} 
            size="xl" 
            animation="bounce" 
          />
        </div>
        <h2>
          <AnimatedIcon icon="🍕" animation="float" /> 
          Passo 1: Pessoas & Pizza
        </h2>
        <p>Vamos começar configurando quantas pessoas vão participar da festa e qual tamanho de pizza vocês preferem.</p>
      </div>

      <div className="step-content enhanced-content">
        <div className="input-with-icon">
          <Tooltip 
            content="Digite o número total de pessoas que vão participar da festa. Isso nos ajuda a calcular a quantidade ideal de comida e bebida."
            position="right"
          >
            <InputField
              label={
                <span>
                  <AnimatedIcon icon="👥" size="small" /> 
                  Quantas pessoas vão à festa?
                </span>
              }
              type="number"
              value={pessoas}
              onChange={handleInputChange}
              min="0"
              placeholder="Ex: 10 pessoas"
              status={getFieldStatus('pessoas')}
              message={getFieldMessage('pessoas')}
              required
            />
          </Tooltip>
        </div>

        <div className="input-with-icon">
          <Tooltip 
            content="Escolha o tamanho de pizza que sua turma prefere. Cada tamanho tem uma quantidade específica de fatias."
            position="right"
          >
            <SelectField
              label={
                <span>
                  <AnimatedIcon icon="🍕" size="small" animation="pulse" /> 
                  Qual tamanho de pizza vocês preferem?
                </span>
              }
              value={tamanhoPizza}
              onChange={(e) => handleTamanhoPizzaChange(e.target.value)}
              options={pizzaOptions}
              status="success"
              message="Ótima escolha! Cada tamanho alimenta um número específico de pessoas"
              required
            />
          </Tooltip>
        </div>

        <div className="input-with-icon">
          <Tooltip 
            content="Considere o perfil das pessoas: crianças comem menos, adultos uma quantidade média, e adolescentes podem comer mais."
            position="right"
          >
            <InputField
              label={
                <span>
                  <AnimatedIcon icon="🍽️" size="small" /> 
                  Quantas fatias cada pessoa geralmente come?
                </span>
              }
              type="number"
              value={fatiasPorPessoa}
              onChange={(e) => handleFatiasPorPessoaChange(e.target.value)}
              min="1"
              max="10"
              placeholder="Ex: 4 fatias"
              status={getFieldStatus('fatiasPorPessoa')}
              message={getFieldMessage('fatiasPorPessoa')}
              required
            />
          </Tooltip>
        </div>

        {getSliceRecommendation()}
      </div>

      <div className="step-tip enhanced-tip">
        <AnimatedIcon icon="💡" animation="pulse" color="#007bff" />
        <div>
          <strong>Dica Profissional:</strong> Para festas longas (4+ horas), considere aumentar em 1 fatia por pessoa. 
          Para eventos com muitas atividades, as pessoas podem comer menos.
        </div>
      </div>
    </div>
  );
};

export default StepPizza;