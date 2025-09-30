// src/components/StepResults.jsx
import React, { memo, useMemo, useCallback } from 'react';

const StepResults = memo(({ 
  resultadoComida, 
  resultadoBebida, 
  pessoas,
  resetarCampos,
  resetWizard 
}) => {
  console.log('StepResults data:', { resultadoComida, resultadoBebida, pessoas });

  // Dados com valores padrão seguros
  const { totalPizzas = 0, totalFatias = 0, totalCustoPizza = 0, rachaRango = 0 } = resultadoComida || {};
  const { totalLitros = 0 } = resultadoBebida || {};

  const handleNovaFesta = useCallback(() => {
    resetarCampos();
    resetWizard();
  }, [resetarCampos, resetWizard]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const summaryData = useMemo(() => ({
    food: {
      pizzas: totalPizzas,
      fatias: totalFatias,
      label: 'pizzas necessárias',
      subInfo: `${totalFatias} fatias no total`
    },
    drinks: {
      amount: totalLitros.toFixed(1),
      label: 'litros de refrigerante',
      subInfo: 'Para toda a festa'
    },
    costs: {
      total: totalCustoPizza.toFixed(2),
      perPerson: rachaRango.toFixed(2),
      label: 'custo total',
      subInfo: `R$ ${rachaRango.toFixed(2)} por pessoa`
    }
  }), [totalPizzas, totalFatias, totalCustoPizza, rachaRango, totalLitros]);

  const shoppingItems = useMemo(() => [
    {
      icon: '🍕',
      text: `${totalPizzas} pizzas`,
      cost: `R$ ${totalCustoPizza.toFixed(2)}`,
      key: 'pizzas'
    },
    {
      icon: '🥤',
      text: `${totalLitros.toFixed(1)}L de refrigerante`,
      note: 'Sugestão: compre garrafas de 2L',
      key: 'drinks'
    }
  ], [totalPizzas, totalCustoPizza, totalLitros]);

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
              <div className="main-number">{summaryData.food.pizzas}</div>
              <div className="main-label">{summaryData.food.label}</div>
              <div className="sub-info">{summaryData.food.subInfo}</div>
            </div>
          </div>

          <div className="summary-card drinks">
            <div className="card-header">
              <span className="card-icon">🥤</span>
              <h3>Bebidas</h3>
            </div>
            <div className="card-content">
              <div className="main-number">{summaryData.drinks.amount}</div>
              <div className="main-label">{summaryData.drinks.label}</div>
              <div className="sub-info">{summaryData.drinks.subInfo}</div>
            </div>
          </div>

          <div className="summary-card money">
            <div className="card-header">
              <span className="card-icon">💰</span>
              <h3>Custos</h3>
            </div>
            <div className="card-content">
              <div className="main-number">R$ {summaryData.costs.total}</div>
              <div className="main-label">{summaryData.costs.label}</div>
              <div className="sub-info">{summaryData.costs.subInfo}</div>
            </div>
          </div>
        </div>

        <div className="shopping-list">
          <h3>📝 Lista de compras:</h3>
          <div className="shopping-items">
            {shoppingItems.map(item => (
              <div key={item.key} className="shopping-item">
                <span className="item-icon">{item.icon}</span>
                <span>{item.text}</span>
                {item.cost && <span className="item-cost">{item.cost}</span>}
                {item.note && <span className="item-note">{item.note}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleNovaFesta} className="secondary-button">
            🔄 Calcular Nova Festa
          </button>
          <button 
            onClick={handlePrint} 
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
});

StepResults.displayName = 'StepResults';

export default StepResults;