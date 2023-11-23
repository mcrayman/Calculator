import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const handleKeyDown = (event) => {
      let keyPressed = event.key;
      if (!isNaN(keyPressed) || ['+', '-', '*', '/', '.', 'Enter'].includes(keyPressed)) {
        if (!isNaN(keyPressed)) {
          handleNumber({ target: { textContent: keyPressed } });
        } else if (keyPressed === 'Enter') {
          handleEqual();
        } else {
          handleOperator({ target: { textContent: keyPressed } });
        }
      } else if (keyPressed === 'Escape') {
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  const handleNumber = (event) => {
    let number = event.target.textContent;

    if (display === '0') {
      setDisplay(number);
    } else {
      const newDisplay = display + number;
      if (newDisplay.length <= 18) {
        setDisplay(newDisplay);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleOperator = (event) => {
    let operator = event.target.textContent;

    if (display === '0') {
      setDisplay('0');
    } else {
      setDisplay(display + ' ' + operator + ' ');
    }
  };

  const handleEqual = () => {
    try {
      setDisplay(eval(display));
    } catch {
      setDisplay('ERROR');
    }
  };

  return (
    <div className="App">

      <div className='calculator'>

        <div className='row' id='display'>{display}</div>
        <div className='row' id='clear' onClick={handleClear}>AC</div>
        <div id="seven" onClick={handleNumber}>7</div>
        <div id="eight" onClick={handleNumber}>8</div>
        <div id="nine" onClick={handleNumber}>9</div>
        <div id="multiply" onClick={handleOperator}>*</div>
        <div id="four" onClick={handleNumber}>4</div>
        <div id="five" onClick={handleNumber}>5</div>
        <div id="six" onClick={handleNumber}>6</div>
        <div id="divide" onClick={handleOperator}>/</div>
        <div id="one" onClick={handleNumber}>1</div>
        <div id="two" onClick={handleNumber}>2</div>
        <div id="three" onClick={handleNumber}>3</div>
        <div id="add" onClick={handleOperator}>+</div>
        <div id="zero" onClick={handleNumber}>0</div>
        <div id="decimal" onClick={handleNumber}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="subtract" onClick={handleOperator}>-</div>

      </div>
      <div id='signature'>Matthew McMeans</div>
    </div>
  );
}

export default App;
