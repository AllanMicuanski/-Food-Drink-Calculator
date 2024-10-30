// src/components/Calculator.jsx
import React, { useState } from 'react';
import Result from './Result';
import { FATIAS_PIZZA } from '../data/constants';
import '../styles/components/Calculator.css';

const Calculator = () => {
  const [pessoas, setPessoas] = useState(0);
  const [tamanhoPizza, setTamanhoPizza] = useState('media');
  const [fatiasPorPessoa, setFatiasPorPessoa] = useState(4); 
  const [bebidaPorPessoa, setBebidaPorPessoa] = useState(0.5); 
  const [precoPizza, setPrecoPizza] = useState(0); 

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPessoas(value);
    }
  };

  const calcularComida = () => {
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / FATIAS_PIZZA[tamanhoPizza]);
    const totalCustoPizza = totalPizzas * precoPizza; 
    const rachaRango = pessoas > 0 ? (totalCustoPizza / pessoas) : 0; 

    return {
      mensagem: `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias) - Custo total: R$ ${totalCustoPizza.toFixed(2)}`,
      racha: pessoas > 0 ? `R$ ${rachaRango.toFixed(2)} por pessoa` : 'R$ 0.00 por pessoa',
    };
  };

  const calcularBebida = () => {
    const totalBebida = pessoas * bebidaPorPessoa; 
    return `${totalBebida.toFixed(2)} litros de refrigerante`;
  };

  const { mensagem, racha } = calcularComida();

  const resetarCampos = () => {
    setPessoas(0);
    setTamanhoPizza('media');
    setFatiasPorPessoa(4);
    setBebidaPorPessoa(0.5);
    setPrecoPizza(0);
  };

  return (
    <div className="calculator">
      <h1>🎉 Calculadora de festas 🎉</h1>
      <label>Número de Pessoas:</label>
      <input type="number" value={pessoas} onChange={handleInputChange} min="0" />

      <label>Tamanho da Pizza:</label>
      <select value={tamanhoPizza} onChange={(e) => setTamanhoPizza(e.target.value)}>
        <option value="pequena">Pequena</option>
        <option value="media">Média</option>
        <option value="grande">Grande</option>
        <option value="gigante">Gigante</option>
      </select>

      <label>Fatias por Pessoa:</label>
      <input
        type="number"
        value={fatiasPorPessoa}
        onChange={(e) => setFatiasPorPessoa(Number(e.target.value))}
        min="1"
      />

      <label>Bebida por Pessoa (litros):</label>
      <input
        type="number"
        value={bebidaPorPessoa}
        onChange={(e) => setBebidaPorPessoa(Number(e.target.value))}
        min="0.1"
        step="0.1"
      />

      <label>Preço da Pizza:</label>
      <input
        type="number"
        value={precoPizza}
        onChange={(e) => setPrecoPizza(Number(e.target.value))}
        min="0"
        step="0.01"
      />

      <button onClick={resetarCampos} className="reset-button">Resetar</button>

      <Result mensagem={mensagem} racha={racha} calcularBebida={calcularBebida} />

      <footer className="footer">
        <p>Powered by: Allan Micuanski</p>
      </footer>
    </div>
  );
};

export default Calculator;
