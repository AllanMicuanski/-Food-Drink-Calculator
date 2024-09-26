import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
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
  width: 100%;
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
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #0056b3;
  }
`;

type Comida = 'pizza' | 'churrasco';
type Bebida = 'refrigerante' | 'suco';

function App() {
  const [pessoas, setPessoas] = useState<number>(0);
  const [comida, setComida] = useState<Comida>('pizza');
  const [bebida, setBebida] = useState<Bebida>('refrigerante');

  const calcularComida = (): number => {
    const comidaPorPessoa = comida === 'pizza' ? 2 : 300;
    return pessoas * comidaPorPessoa;
  };

  const calcularBebida = (): number => {
    const bebidaPorPessoa = 500;
    return pessoas * bebidaPorPessoa;
  };

  return (
    <Container>
      <Title>PartyCalc</Title>

      <div>
        <Label>Número de Pessoas:</Label>
        <Input
          type="number"
          value={pessoas}
          onChange={(e) => setPessoas(Number(e.target.value))}
        />
      </div>

      <div>
        <Label>Escolha a Comida:</Label>
        <Select value={comida} onChange={(e) => setComida(e.target.value as Comida)}>
          <option value="pizza">Pizza</option>
          <option value="churrasco">Churrasco</option>
        </Select>
      </div>

      <div>
        <Label>Escolha a Bebida:</Label>
        <Select value={bebida} onChange={(e) => setBebida(e.target.value as Bebida)}>
          <option value="refrigerante">Refrigerante</option>
          <option value="suco">Suco</option>
        </Select>
      </div>

      <Button onClick={() => alert('Cálculo feito!')}>Calcular</Button>

      <Result>
        <h2>Quantidade Necessária:</h2>
        <p>Comida: {calcularComida()} {comida === 'pizza' ? 'fatias' : 'g de carne'}</p>
        <p>Bebida: {calcularBebida()} ml de {bebida}</p>
      </Result>
    </Container>
  );
}

export default App;
