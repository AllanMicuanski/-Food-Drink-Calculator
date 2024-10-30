// src/components/Result.jsx
import React from 'react';

const Result = ({ calcularComida, calcularBebida }) => {
  const comida = calcularComida();
  const bebida = calcularBebida();

  return (
    <div>
      <h2>Resultados</h2>
      <p>{comida}</p>
      <p>{bebida}</p>
    </div>
  );
};

export default Result;
