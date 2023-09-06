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
        return (variableB === 0) ? "Error" : divide(variableA,variableB);
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

//Calculate the solution based on the display value
function getSolution() {
    equalsBtn.addEventListener('click', () => {
        const displayArr = displayValue.split(/([-+*/])/);
        while (displayArr.length > 1) {
            let a = +displayArr[0];
            let b = +displayArr[2];
            let operator = displayArr[1];
            a = operate(a, operator, b);
            displayArr[0] = a;
            displayArr.splice(1,2);
        }
        displaySection.textContent = displayArr;
    })
}
getSolution();
