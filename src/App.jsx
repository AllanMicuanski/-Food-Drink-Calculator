// src/App.jsx
import React from 'react';
import Calculator from './components/Calculator';
import CalculatorSimple from './components/CalculatorSimple';
import './styles/index.css';
import './styles/components/Calculator.css';

const App = () => {
  // Temporariamente usando CalculatorSimple para debug
  const useSimple = false; // Voltando para Calculator principal

  return (
    <div className="app">
      {useSimple ? <CalculatorSimple /> : <Calculator />}
    </div>
  );
};

export default App;
