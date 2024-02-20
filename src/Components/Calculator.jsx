import React, { useState } from 'react';

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

  const renderButtons = () => {
    const buttons = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, 'C', '=', '/'];

    return buttons.map((value, index) => (
      <button
        key={index}
        className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
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
    ));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-200 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Calculator</h2>
      <input
        className="w-full mb-4 p-4 border rounded-md text-lg"
        type="text"
        value={input}
        readOnly
      />
      <div className="grid grid-cols-4 gap-4">{renderButtons()}</div>
      <p className="mt-6 text-center text-xl font-semibold">Result: {result}</p>
    </div>
  );
};

export default Calculator;
