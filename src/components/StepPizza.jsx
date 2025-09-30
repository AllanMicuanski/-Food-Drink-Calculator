// src/components/StepPizza.jsx
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

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
    { value: 'pequena', label: 'Pequena (4 fatias)' },
    { value: 'media', label: 'Média (6 fatias)' },
    { value: 'grande', label: 'Grande (8 fatias)' },
    { value: 'gigante', label: 'Gigante (12 fatias)' }
  ];

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h2>🍕 Passo 1: Pessoas & Pizza</h2>
        <p>Vamos começar configurando quantas pessoas vão participar da festa e qual tamanho de pizza vocês preferem.</p>
      </div>

      <div className="step-content">
        <InputField
          label="Quantas pessoas vão à festa?"
          type="number"
          value={pessoas}
          onChange={handleInputChange}
          min="0"
          placeholder="Ex: 10 pessoas"
          status={getFieldStatus('pessoas')}
          message={getFieldMessage('pessoas')}
          required
        />

        <SelectField
          label="Qual tamanho de pizza vocês preferem?"
          value={tamanhoPizza}
          onChange={(e) => handleTamanhoPizzaChange(e.target.value)}
          options={pizzaOptions}
          status="success"
          message="Ótima escolha! Cada tamanho tem uma quantidade específica de fatias"
          required
        />

        <InputField
          label="Quantas fatias cada pessoa geralmente come?"
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
      </div>

      <div className="step-tip">
        💡 <strong>Dica:</strong> Adultos geralmente comem 3-5 fatias, crianças 1-2 fatias, e adolescentes podem comer até 6 fatias!
      </div>
    </div>
  );
};

export default StepPizza;