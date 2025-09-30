// src/components/StepResults.jsx
import React from 'react';

const StepResults = ({ 
  resultadoComida, 
  resultadoBebida, 
  pessoas,
  resetarCampos,
  resetWizard 
}) => {
  const { totalPizzas, totalFatias, totalCustoPizza, rachaRango } = resultadoComida;
  const { totalLitros } = resultadoBebida;

  const handleNovaFesta = () => {
    resetarCampos();
    resetWizard();
  };

  return (
    <div className="wizard-step">
      <div className="step-header">
        <h2>🎉 Passo 3: Sua festa está pronta!</h2>
        <p>Aqui está tudo que você precisa para uma festa perfeita para {pessoas} pessoas:</p>
      </div>

      <div className="results-summary">
        <div className="summary-cards">
          <div className="summary-card food">
            <div className="card-header">
              <span className="card-icon">🍕</span>
              <h3>Comida</h3>
            </div>
            <div className="card-content">
              <div className="main-number">{totalPizzas}</div>
              <div className="main-label">pizzas necessárias</div>
              <div className="sub-info">{totalFatias} fatias no total</div>
            </div>
          </div>

          <div className="summary-card drinks">
            <div className="card-header">
              <span className="card-icon">🥤</span>
              <h3>Bebidas</h3>
            </div>
            <div className="card-content">
              <div className="main-number">{totalLitros.toFixed(1)}</div>
              <div className="main-label">litros de refrigerante</div>
              <div className="sub-info">Para toda a festa</div>
            </div>
          </div>

          <div className="summary-card money">
            <div className="card-header">
              <span className="card-icon">💰</span>
              <h3>Custos</h3>
            </div>
            <div className="card-content">
              <div className="main-number">R$ {totalCustoPizza.toFixed(2)}</div>
              <div className="main-label">custo total</div>
              <div className="sub-info">R$ {rachaRango.toFixed(2)} por pessoa</div>
            </div>
          </div>
        </div>

        <div className="shopping-list">
          <h3>📝 Lista de compras:</h3>
          <div className="shopping-items">
            <div className="shopping-item">
              <span className="item-icon">🍕</span>
              <span>{totalPizzas} pizzas</span>
              <span className="item-cost">R$ {totalCustoPizza.toFixed(2)}</span>
            </div>
            <div className="shopping-item">
              <span className="item-icon">🥤</span>
              <span>{totalLitros.toFixed(1)}L de refrigerante</span>
              <span className="item-note">Sugestão: compre garrafas de 2L</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleNovaFesta} className="secondary-button">
            🔄 Calcular Nova Festa
          </button>
          <button 
            onClick={() => window.print()} 
            className="primary-button"
          >
            🖨️ Imprimir Lista
          </button>
        </div>
      </div>

      <div className="step-tip success">
        🎊 <strong>Parabéns!</strong> Sua festa está toda planejada. Não esqueça de comprar guardanapos, pratos e copos também!
      </div>
    </div>
  );
};

export default StepResults;