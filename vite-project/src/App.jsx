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

const PRECO_CARNE = {
  linguica: 25,
  'contra-file': 50,
  picanha: 70,
  alcatra: 40,
  'pao-de-alho': 20,
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
  const [bebida, setBebida] = useState('refrigerante');

  const [tamanhoPizza, setTamanhoPizza] = useState('media');
  const [precoPizza, setPrecoPizza] = useState(PRECO_PIZZA['media']);
  const [tipoCarne, setTipoCarne] = useState('contra-file');
  const [precoCarne, setPrecoCarne] = useState(PRECO_CARNE['contra-file']);

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
    const totalComida = pessoas * (comida === 'pizza' ? quantidadeFatias : 400); // 400g para churrasco

    if (comida === 'pizza') {
      return `${Math.ceil(
        totalComida / quantidadeFatias,
      )} pizzas (total: ${totalComida} fatias)`;
    } else {
      const kgCarne = totalComida / 1000;
      return `${kgCarne.toFixed(2)} kg de carne`;
    }
  };

  const calcularBebida = () => {
    const bebidaPorPessoa = 500;
    const totalBebida = pessoas * bebidaPorPessoa;

    const litros = totalBebida / 1000;
    return `${litros.toFixed(2)} litros de ${bebida}`;
  };

  const calcularCustoPizza = () => {
    const custoPizza = Math.ceil(pessoas * (quantidadeFatias / 8)) * precoPizza;
    return custoPizza.toFixed(2);
  };

  const calcularCustoCarne = () => {
    const totalKgCarne = (pessoas * 400) / 1000;
    const custoCarne = totalKgCarne * precoCarne;
    return custoCarne.toFixed(2);
  };

  const resetarCampos = () => {
    setPessoas(0);
    setComida('pizza');
    setBebida('refrigerante');
    setTamanhoPizza('media');
    setPrecoPizza(PRECO_PIZZA['media']);
    setTipoCarne('contra-file');
    setPrecoCarne(PRECO_CARNE['contra-file']);
    setQuantidadeFatias(FATIAS_PIZZA['media']);
  };

  const custoPizza = calcularCustoPizza();
  const custoCarne = calcularCustoCarne();

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

      {comida === 'churrasco' && (
        <>
          <div>
            <Label>Tipo de Carne:</Label>
            <Select
              value={tipoCarne}
              onChange={(e) => {
                const novoTipo = e.target.value;
                setTipoCarne(novoTipo);
                setPrecoCarne(PRECO_CARNE[novoTipo]);
              }}
            >
              <option value="linguica">Linguiça</option>
              <option value="contra-file">Contra-Filé</option>
              <option value="picanha">Picanha</option>
              <option value="alcatra">Alcatra</option>
              <option value="pao-de-alho">Pão de Alho</option>
            </Select>
          </div>
          <div>
            <Label>Preço da Carne (por kg):</Label>
            <Input
              type="number"
              value={precoCarne}
              onChange={(e) => setPrecoCarne(Number(e.target.value))}
            />
          </div>
        </>
      )}

      <Button onClick={resetarCampos}>Resetar</Button>

      <Result>
        <h2>Resultados</h2>
        {comida === 'pizza' && <p>Você vai precisar de: {calcularComida()}</p>}
        {comida === 'churrasco' && (
          <p>Você vai precisar de: {calcularComida()}</p>
        )}
        <p>Você vai precisar de: {calcularBebida()}</p>
        {comida === 'pizza' && <p>Custo total de Pizza: R$ {custoPizza}</p>}
        {comida === 'churrasco' && (
          <p>Custo total de Churrasco: R$ {custoCarne}</p>
        )}
      </Result>
    </Container>
  );
}

export default App;
