// src/hooks/usePartyCalculator.js
import { useState } from "react";

const usePartyCalculator = () => {
  const [pessoas, setPessoas] = useState(0);
  const [tamanhoPizza, setTamanhoPizza] = useState("media");
  const [fatiasPorPessoa, setFatiasPorPessoa] = useState(4);
  const [bebidaPorPessoa, setBebidaPorPessoa] = useState(0.5);
  const [precoPizza, setPrecoPizza] = useState(0);

  const handlePessoasChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0) {
      setPessoas(numValue);
    }
  };

  const handleTamanhoPizzaChange = (value) => {
    setTamanhoPizza(value);
  };

  const handleFatiasPorPessoaChange = (value) => {
    const numValue = Number(value);
    if (numValue > 0) {
      setFatiasPorPessoa(numValue);
    }
  };

  const handleBebidaPorPessoaChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0) {
      setBebidaPorPessoa(numValue);
    }
  };

  const handlePrecoPizzaChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 0) {
      setPrecoPizza(numValue);
    }
  };

  const resetarCampos = () => {
    setPessoas(0);
    setTamanhoPizza("media");
    setFatiasPorPessoa(4);
    setBebidaPorPessoa(0.5);
    setPrecoPizza(0);
  };

  return {
    // Estados
    pessoas,
    tamanhoPizza,
    fatiasPorPessoa,
    bebidaPorPessoa,
    precoPizza,

    // Handlers
    handlePessoasChange,
    handleTamanhoPizzaChange,
    handleFatiasPorPessoaChange,
    handleBebidaPorPessoaChange,
    handlePrecoPizzaChange,
    resetarCampos,
  };
};

export default usePartyCalculator;
