// src/components/Calculator.jsx
import React, { useState } from 'react';
import Button from './Button';
import Result from './Result';
import { PRECO_PIZZA, FATIAS_PIZZA } from '../data/constants';
import '../styles/components/Calculator.css';

const Calculator = () => {
  const [pessoas, setPessoas] = useState(0);
  const [tamanhoPizza, setTamanhoPizza] = useState('media');
  const [fatiasPorPessoa, setFatiasPorPessoa] = useState(4); // novo campo
  const [bebidaPorPessoa, setBebidaPorPessoa] = useState(0.5); // novo campo em litros
  const [precoPizza, setPrecoPizza] = useState(0); // novo campo

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPessoas(value);
    }
  };

  const calcularComida = () => {
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / FATIAS_PIZZA[tamanhoPizza]);
    const totalCustoPizza = totalPizzas * precoPizza; // cálculo do custo total
    return `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias) - Custo total: R$ ${totalCustoPizza.toFixed(2)}`;
  };

  const calcularBebida = () => {
    const totalBebida = pessoas * bebidaPorPessoa; // em litros
    return `${totalBebida.toFixed(2)} litros de refrigerante`;
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

      <label>Quantidade de Bebida por Pessoa (em litros):</label>
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

      <Button calcularComida={calcularComida} calcularBebida={calcularBebida} />
      <Result calcularComida={calcularComida} calcularBebida={calcularBebida} />
    </div>
  );
};

export default Calculator;
