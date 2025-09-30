// src/components/Calculator.jsx
import React from 'react';
import InputSection from './InputSection';
import ResultsSection from './ResultsSection';
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

  return (
    <div className="calculator">
      <header className="calculator-header">
        <h1>🎉 Calculadora de Festas 🎉</h1>
        <p>Calcule tudo que você precisa para sua festa perfeita!</p>
      </header>

      <InputSection
        pessoas={pessoas}
        tamanhoPizza={tamanhoPizza}
        fatiasPorPessoa={fatiasPorPessoa}
        bebidaPorPessoa={bebidaPorPessoa}
        precoPizza={precoPizza}
        handlePessoasChange={handlePessoasChange}
        handleTamanhoPizzaChange={handleTamanhoPizzaChange}
        handleFatiasPorPessoaChange={handleFatiasPorPessoaChange}
        handleBebidaPorPessoaChange={handleBebidaPorPessoaChange}
        handlePrecoPizzaChange={handlePrecoPizzaChange}
        resetarCampos={resetarCampos}
      />

      <ResultsSection 
        resultadoComida={resultadoComida}
        resultadoBebida={resultadoBebida}
      />

      <footer className="footer">
        <p>Powered by: Allan Micuanski</p>
      </footer>
    </div>
  );
};

export default Calculator;
