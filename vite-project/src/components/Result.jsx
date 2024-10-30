// src/components/Result.jsx
import React from 'react';

const Result = ({ mensagem, racha, calcularBebida }) => {
  return (
    <div className="result">
      <h2>Resultados:</h2>
      <p>{mensagem}</p>
      <p>Dividido por pessoa: {racha}</p>
      <p>{calcularBebida()}</p>
    </div>
  );
};

export default Result;
