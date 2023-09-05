//Mathematical operations functions
const add = function(a,b) {
    return a+b;
}

const subtract = function(a,b) {
    return a-b;
}

const multiply = function(a,b) {
    return a*b;
}

const divide = function(a,b) {
    return a/b; 
}

//Calculator operation
let variableA;
let variableB;
let operator;
    
const operate = function(variableA, operator, variableB) {
    if (operator === '+') {
        return add(variableA, variableB);
    } 

    else if (operator === '-') {
        return subtract(variableA, variableB);
    }

    else if (operator === '*') {
        return multiply(variableA, variableB);
    }

    else if (operator === '/') {
        return divide(variableA,variableB);
    }
}

//Display updating functions
let displayValue;
const displaySection = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons');
    console.log(buttons);
const clearBtn = document.querySelector('#clear');
const equalsBtn = document.querySelector('#equals');

function updateDisplay() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            displaySection.textContent += button.textContent;
            displayValue = displaySection.textContent;
                console.log(displayValue);
        })
    });
}
updateDisplay();

function clearDisplay() {
    clearBtn.addEventListener('click', () => {
        displaySection.textContent = 0;
    })
}
clearDisplay();

function getVariables() {
    const displayArr = displayValue.split(/([-+*/])/);
    variableA = +displayArr[0];
    operator = displayArr[1];
    variableB = +displayArr[2];
    return displayArr;
}

function getSolution() {
    equalsBtn.addEventListener('click', () => {
        getVariables();
        displaySection.textContent = operate(variableA, operator, variableB);
    })
}
getSolution();

