import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(0);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Calculator</h2>
      <input
        className="w-full mb-2 p-2 border rounded-md"
        type="text"
        value={input}
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, 'C', '=', '/'].map(
          (value, index) => (
            <button
              key={index}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() =>
                value === 'C'
                  ? handleClear()
                  : value === '='
                  ? handleCalculate()
                  : handleButtonClick(value)
              }
            >
              {value}
            </button>
          )
        )}
      </div>
      <p className="mt-4">Result: {result}</p>
    </div>
  );
};

export default Calculator;
