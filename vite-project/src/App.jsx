import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 97%;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 20px;
`;

const Result = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const ResetButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const PRECO_PIZZA = {
  pequena: 30,
  media: 40,
  grande: 50,
  gigante: 60,
};

const FATIAS_PIZZA = {
  pequena: 4,
  media: 6,
  grande: 8,
  gigante: 12,
};

function App() {
  const [pessoas, setPessoas] = useState(0);
  const [comida, setComida] = useState('pizza');
  const [tamanhoPizza, setTamanhoPizza] = useState('media');
  const [precoPizza, setPrecoPizza] = useState(PRECO_PIZZA['media']);
  const [quantidadeFatias, setQuantidadeFatias] = useState(
    FATIAS_PIZZA['media'],
  );

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setPessoas(value);
    }
  };

  const calcularComida = () => {
    const fatiasPorPessoa = 4;
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / quantidadeFatias);

    return `Você vai precisar de: ${totalPizzas} pizzas (total: ${totalFatias} fatias)`;
  };

  const calcularBebida = () => {
    const bebidaPorPessoa = 500; // 500ml por pessoa
    const totalBebida = pessoas * bebidaPorPessoa;
    const litros = totalBebida / 1000;
    return `${litros.toFixed(2)} litros de refrigerante`;
  };

  const calcularCustoPizza = () => {
    const fatiasPorPessoa = 4;
    const totalFatias = pessoas * fatiasPorPessoa;
    const totalPizzas = Math.ceil(totalFatias / quantidadeFatias);
    const custoPizza = totalPizzas * precoPizza;
    return custoPizza.toFixed(2);
  };

  const resetarCampos = () => {
    setPessoas(0);
    setComida('pizza');
    setTamanhoPizza('media');
    setPrecoPizza(PRECO_PIZZA['media']);
    setQuantidadeFatias(FATIAS_PIZZA['media']);
  };

  const custoPizza = calcularCustoPizza();

  return (
    <Container>
      <Title>🎉 Calculadora de festas 🎉</Title>

      <div>
        <Label>Número de Pessoas:</Label>
        <Input
          type="number"
          value={pessoas}
          onChange={handleInputChange}
          min="0"
        />
      </div>

      <div>
        <Label>Escolha a Comida:</Label>
        <Select value={comida} onChange={(e) => setComida(e.target.value)}>
          <option value="pizza">Pizza</option>
          <option value="churrasco">Churrasco</option>
        </Select>
      </div>

      {comida === 'pizza' && (
        <>
          <div>
            <Label>Tamanho da Pizza:</Label>
            <Select
              value={tamanhoPizza}
              onChange={(e) => {
                const novoTamanho = e.target.value;
                setTamanhoPizza(novoTamanho);
                setPrecoPizza(PRECO_PIZZA[novoTamanho]);
                setQuantidadeFatias(FATIAS_PIZZA[novoTamanho]);
              }}
            >
              <option value="pequena">Pequena</option>
              <option value="media">Média</option>
              <option value="grande">Grande</option>
              <option value="gigante">Gigante</option>
            </Select>
          </div>
          <div>
            <Label>Preço da Pizza:</Label>
            <Input
              type="number"
              value={precoPizza}
              onChange={(e) => setPrecoPizza(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Quantidade de Fatias:</Label>
            <Input
              type="number"
              value={quantidadeFatias}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setQuantidadeFatias(value);
                }
              }}
            />
          </div>
        </>
      )}

      <Button onClick={resetarCampos}>Resetar</Button>

      <Result>
        <h2>Resultados</h2>
        <p>{calcularComida()}</p>
        <p>4 fatias por pessoa</p>
        <p>{calcularBebida()}</p>
        <p>Custo total de Pizza: R$ {custoPizza}</p>
      </Result>
    </Container>
  );
}

export default App;
