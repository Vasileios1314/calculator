const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
// this is triggerd after we press the operator
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  // use the includes method in order to see if it use's a specific value
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
// the number method converts a string into a number in order to help us with the calculations
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  // this is triggerd after we press the operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all values, display
function resetAll() {
  // reset also the following 3 global var's
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    // implament the orphan function in order to call the sendNumberValue and pass the value correctly
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    // contains,check if any of the btns have specific class
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);
