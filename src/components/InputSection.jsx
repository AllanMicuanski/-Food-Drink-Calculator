// src/components/InputSection.jsx
import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import useValidation from '../hooks/useValidation';

const InputSection = ({
  pessoas,
  tamanhoPizza,
  fatiasPorPessoa,
  bebidaPorPessoa,
  precoPizza,
  handlePessoasChange,
  handleTamanhoPizzaChange,
  handleFatiasPorPessoaChange,
  handleBebidaPorPessoaChange,
  handlePrecoPizzaChange,
  resetarCampos
}) => {
  const {
    getFieldStatus,
    getFieldMessage,
    isFormValid,
    hasErrors
  } = useValidation({
    pessoas,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza
  });

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
    <div className="input-section">
      <h3>📝 Configure sua festa</h3>
      
      <InputField
        label="Número de Pessoas"
        type="number"
        value={pessoas}
        onChange={handleInputChange}
        min="0"
        placeholder="Ex: 10"
        status={getFieldStatus('pessoas')}
        message={getFieldMessage('pessoas')}
        required
      />

      <SelectField
        label="Tamanho da Pizza"
        value={tamanhoPizza}
        onChange={(e) => handleTamanhoPizzaChange(e.target.value)}
        options={pizzaOptions}
        status="success"
        message="Perfeito! Pizza selecionada"
        required
      />

      <InputField
        label="Fatias por Pessoa"
        type="number"
        value={fatiasPorPessoa}
        onChange={(e) => handleFatiasPorPessoaChange(e.target.value)}
        min="1"
        max="10"
        placeholder="Ex: 4"
        status={getFieldStatus('fatiasPorPessoa')}
        message={getFieldMessage('fatiasPorPessoa')}
        required
      />

      <InputField
        label="Bebida por Pessoa (litros)"
        type="number"
        value={bebidaPorPessoa}
        onChange={(e) => handleBebidaPorPessoaChange(e.target.value)}
        min="0.1"
        max="3"
        step="0.1"
        placeholder="Ex: 0.5"
        status={getFieldStatus('bebidaPorPessoa')}
        message={getFieldMessage('bebidaPorPessoa')}
        required
      />

      <InputField
        label="Preço da Pizza (R$)"
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

      <div className="form-actions">
        <button 
          onClick={resetarCampos} 
          className="reset-button"
          disabled={pessoas === 0 && precoPizza === 0}
        >
          🔄 Resetar Campos
        </button>
        
        {hasErrors && (
          <div className="form-status error">
            ❌ Corrija os erros acima para continuar
          </div>
        )}
        
        {isFormValid && (
          <div className="form-status success">
            ✅ Tudo pronto! Veja os resultados abaixo
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSection;