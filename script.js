//Mathematical operations functions
const add = (a, b) => a + b;

const subtract = (a,b) => a-b;

const multiply = (a,b) => a*b;

const divide = (a,b) => a/b; 

//Calculator operation
const operate = function(variableA, operator, variableB) {
    switch (operator) {
        case '+': {
            return add(variableA, variableB);
        }

        case '-': {
            return subtract(variableA, variableB);
        }

        case '*': {
            return multiply(variableA, variableB);
        }

        case '/': {
            return (variableB === 0) ? "Error" : divide(variableA,variableB);
        }
    }
}

//Display updating functions
const displaySection = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons');
const clearBtn = document.querySelector('#clear');
const equalsBtn = document.querySelector('#equals');
const deleteBtn = document.querySelector('#delete');
const dotBtn = document.querySelector('#dot');
const operators = /[+\-*/.]/;
let displayValue = 0;


function addToDisplay() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (displayValue === 0 && isOperator(button.textContent) === false) {
                displayValue = ''; 
            }
            displayValue += button.textContent;
            checkDot();
            updateDisplay();
        })
    });
}
addToDisplay();

function clearDisplay() {
    clearBtn.addEventListener('click', () => {
        displayValue = 0;
        checkDot();
        updateDisplay();
    })
}
clearDisplay();

function deleteChar(){
    deleteBtn.addEventListener('click', () => {
        if (displayValue.length > 1) {
            displayValue = displayValue.slice(0,-1);
        }

        else {
            displayValue = 0;
        }
        checkDot();
        updateDisplay();        
    })
}
deleteChar();

//Calculate the solution based on the display value
function getSolution() {
    equalsBtn.addEventListener('click', () => {
        if (displayValue !== 0){
            displayValue = displayValue.split(/([-+*/])/);
            while (displayValue.length > 1) {
                let a = +displayValue[0];
                let b = +displayValue[2];
                let operator = displayValue[1];
                a = operate(a, operator, b);
                displayValue[0] = a;
                displayValue.splice(1,2);
            }
            displayValue = parseFloat((+displayValue).toFixed(3)).toString();//Make sure the answer is rounded
            updateDisplay();
        }
    })
}
getSolution();

function updateDisplay() {
    displaySection.textContent = displayValue;
}

function checkDot() {
    if (displayValue.toString().includes('.')) {
        dotBtn.disabled = true;
    }
    else {
        dotBtn.disabled = false;
    }
}

function isOperator(char){
    return operators.test(char);
}

