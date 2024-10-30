// src/components/Calculator.jsx
import React, { useState } from 'react';
import Button from './Button';
import Result from './Result';
import { PRECO_PIZZA, FATIAS_PIZZA } from '../data/constants';
import '../styles/components/Calculator.css';

const Calculator = () => {
  const [pessoas, setPessoas] = useState(0);
  const [tamanhoPizza, setTamanhoPizza] = useState('media');
  
  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPessoas(value);
    }
  };

  const calcularComida = () => {
    const fatiasPorPessoa = 4;
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / FATIAS_PIZZA[tamanhoPizza]);
    return `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias)`;
  };

  const calcularBebida = () => {
    const bebidaPorPessoa = 500; // 500ml por pessoa
    const totalBebida = pessoas * bebidaPorPessoa;
    const litros = totalBebida / 1000;
    return `${litros.toFixed(2)} litros de refrigerante`;
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

      <Button calcularComida={calcularComida} calcularBebida={calcularBebida} />
      <Result calcularComida={calcularComida} calcularBebida={calcularBebida} />
    </div>
  );
};

export default Calculator;
