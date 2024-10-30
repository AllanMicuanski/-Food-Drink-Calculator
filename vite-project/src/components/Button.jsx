// src/components/Button.jsx
import React from 'react';

const Button = ({ calcularComida, calcularBebida }) => {
  return (
    <button onClick={() => {
      const comida = calcularComida();
      const bebida = calcularBebida();
      alert(`${comida}\n${bebida}`);
    }}>
      Calcular
    </button>
  );
};

export default Button;
