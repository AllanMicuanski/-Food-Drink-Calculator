// src/components/InputSection.jsx
import React from 'react';

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
  const handleInputChange = (e) => {
    handlePessoasChange(e.target.value);
  };

  return (
    <div className="input-section">
      <div className="input-group">
        <label>Número de Pessoas:</label>
        <input 
          type="number" 
          value={pessoas} 
          onChange={handleInputChange} 
          min="0" 
          placeholder="Ex: 10"
        />
      </div>

      <div className="input-group">
        <label>Tamanho da Pizza:</label>
        <select value={tamanhoPizza} onChange={(e) => handleTamanhoPizzaChange(e.target.value)}>
          <option value="pequena">Pequena (4 fatias)</option>
          <option value="media">Média (6 fatias)</option>
          <option value="grande">Grande (8 fatias)</option>
          <option value="gigante">Gigante (12 fatias)</option>
        </select>
      </div>

      <div className="input-group">
        <label>Fatias por Pessoa:</label>
        <input
          type="number"
          value={fatiasPorPessoa}
          onChange={(e) => handleFatiasPorPessoaChange(e.target.value)}
          min="1"
          placeholder="Ex: 4"
        />
      </div>

      <div className="input-group">
        <label>Bebida por Pessoa (litros):</label>
        <input
          type="number"
          value={bebidaPorPessoa}
          onChange={(e) => handleBebidaPorPessoaChange(e.target.value)}
          min="0.1"
          step="0.1"
          placeholder="Ex: 0.5"
        />
      </div>

      <div className="input-group">
        <label>Preço da Pizza (R$):</label>
        <input
          type="number"
          value={precoPizza}
          onChange={(e) => handlePrecoPizzaChange(e.target.value)}
          min="0"
          step="0.01"
          placeholder="Ex: 35.00"
        />
      </div>

      <button onClick={resetarCampos} className="reset-button">
        🔄 Resetar Campos
      </button>
    </div>
  );
};

export default InputSection;