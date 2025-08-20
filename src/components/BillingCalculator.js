import React, { useState } from 'react';
import './BillingCalculator.css';

const BillingCalculator = ({ cart, onCalculateTotal, onApplyDiscount, onAddTax }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to calculation history
      setCalculationHistory(prev => [...prev, {
        calculation: `${currentValue} ${operation} ${inputValue} = ${newValue}`,
        result: newValue
      }]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '%':
        return secondValue !== 0 ? firstValue % secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      
      // Add to calculation history
      setCalculationHistory(prev => [...prev, {
        calculation: `${previousValue} ${operation} ${inputValue} = ${newValue}`,
        result: newValue
      }]);
    }
  };

  const calculateCartTotal = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    setDisplay(String(total));
    setCalculationHistory(prev => [...prev, {
      calculation: `Cart Total = ₹${total.toLocaleString()}`,
      result: total
    }]);
  };

  const applyDiscount = () => {
    if (discountPercentage && parseFloat(discountPercentage) > 0) {
      const currentTotal = parseFloat(display);
      const discount = currentTotal * (parseFloat(discountPercentage) / 100);
      const discountedTotal = currentTotal - discount;
      setDisplay(String(discountedTotal));
      setCalculationHistory(prev => [...prev, {
        calculation: `Discount ${discountPercentage}% = ₹${discount.toFixed(2)}`,
        result: discountedTotal
      }]);
    }
  };

  const addTax = () => {
    if (taxPercentage && parseFloat(taxPercentage) > 0) {
      const currentTotal = parseFloat(display);
      const tax = currentTotal * (parseFloat(taxPercentage) / 100);
      const totalWithTax = currentTotal + tax;
      setDisplay(String(totalWithTax));
      setCalculationHistory(prev => [...prev, {
        calculation: `Tax ${taxPercentage}% = ₹${tax.toFixed(2)}`,
        result: totalWithTax
      }]);
    }
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  return (
    <div className="billing-calculator">
      <div className="calculator-header">
        <h3>🧮 Billing Calculator</h3>
        <p>Calculate totals, discounts, and taxes</p>
      </div>
      
      <div className="calculator-display">
        <div className="display-value">₹{parseFloat(display || 0).toLocaleString()}</div>
      </div>

      <div className="billing-controls">
        <button className="billing-btn" onClick={calculateCartTotal}>
          📊 Cart Total
        </button>
        <div className="discount-section">
          <input
            type="number"
            placeholder="Discount %"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="discount-input"
          />
          <button className="billing-btn" onClick={applyDiscount}>
            💰 Apply Discount
          </button>
        </div>
        <div className="tax-section">
          <input
            type="number"
            placeholder="Tax %"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
            className="tax-input"
          />
          <button className="billing-btn" onClick={addTax}>
            📋 Add Tax
          </button>
        </div>
      </div>

      <div className="calculator-buttons">
        <div className="button-row">
          <button className="btn btn-function" onClick={clear}>C</button>
          <button className="btn btn-function" onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</button>
          <button className="btn btn-operation" onClick={() => performOperation('÷')}>÷</button>
          <button className="btn btn-operation" onClick={() => performOperation('×')}>×</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(7)}>7</button>
          <button className="btn btn-number" onClick={() => inputNumber(8)}>8</button>
          <button className="btn btn-number" onClick={() => inputNumber(9)}>9</button>
          <button className="btn btn-operation" onClick={() => performOperation('-')}>-</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(4)}>4</button>
          <button className="btn btn-number" onClick={() => inputNumber(5)}>5</button>
          <button className="btn btn-number" onClick={() => inputNumber(6)}>6</button>
          <button className="btn btn-operation" onClick={() => performOperation('+')}>+</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number" onClick={() => inputNumber(1)}>1</button>
          <button className="btn btn-number" onClick={() => inputNumber(2)}>2</button>
          <button className="btn btn-number" onClick={() => inputNumber(3)}>3</button>
          <button className="btn btn-operation" onClick={() => performOperation('%')}>%</button>
        </div>

        <div className="button-row">
          <button className="btn btn-number btn-zero" onClick={() => inputNumber(0)}>0</button>
          <button className="btn btn-number" onClick={inputDecimal}>.</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>

      {calculationHistory.length > 0 && (
        <div className="calculation-history">
          <div className="history-header">
            <h4>📝 Calculation History</h4>
            <button className="clear-history-btn" onClick={clearHistory}>Clear</button>
          </div>
          <div className="history-list">
            {calculationHistory.map((item, index) => (
              <div key={index} className="history-item">
                <span className="history-calculation">{item.calculation}</span>
                <span className="history-result">₹{item.result.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingCalculator; 