// src/components/Calculator.jsx
import React from 'react';
import Result from './Result';
import usePartyCalculator from '../hooks/usePartyCalculator';
import useCalculations from '../hooks/useCalculations';
import '../styles/components/Calculator.css';

const Calculator = () => {
  const {
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
  } = usePartyCalculator();

  const { resultadoComida, resultadoBebida } = useCalculations({
    pessoas,
    tamanhoPizza,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza
  });

  const handleInputChange = (e) => {
    handlePessoasChange(e.target.value);
  };

  // Função para compatibilidade com o componente Result atual
  const calcularBebida = () => {
    return resultadoBebida.mensagem;
  };

  return (
    <div className="calculator">
      <h1>🎉 Calculadora de festas 🎉</h1>
      <label>Número de Pessoas:</label>
      <input type="number" value={pessoas} onChange={handleInputChange} min="0" />

      <label>Tamanho da Pizza:</label>
      <select value={tamanhoPizza} onChange={(e) => handleTamanhoPizzaChange(e.target.value)}>
        <option value="pequena">Pequena</option>
        <option value="media">Média</option>
        <option value="grande">Grande</option>
        <option value="gigante">Gigante</option>
      </select>

      <label>Fatias por Pessoa:</label>
      <input
        type="number"
        value={fatiasPorPessoa}
        onChange={(e) => handleFatiasPorPessoaChange(e.target.value)}
        min="1"
      />

      <label>Bebida por Pessoa (litros):</label>
      <input
        type="number"
        value={bebidaPorPessoa}
        onChange={(e) => handleBebidaPorPessoaChange(e.target.value)}
        min="0.1"
        step="0.1"
      />

      <label>Preço da Pizza:</label>
      <input
        type="number"
        value={precoPizza}
        onChange={(e) => handlePrecoPizzaChange(e.target.value)}
        min="0"
        step="0.01"
      />

      <button onClick={resetarCampos} className="reset-button">Resetar</button>

      <Result 
        mensagem={resultadoComida.mensagem} 
        racha={resultadoComida.racha} 
        calcularBebida={calcularBebida} 
      />

      <footer className="footer">
        <p>Powered by: Allan Micuanski</p>
      </footer>
    </div>
  );
};

export default Calculator;
