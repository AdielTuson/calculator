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

        case '×': {
            return multiply(variableA, variableB);
        }

        case '÷': {
            return (variableB === 0) ? "Error" : divide(variableA,variableB);
        }
    }
}

//Display updating functions
const displaySection = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const clearBtn = document.querySelector('#clear');
const equalsBtn = document.querySelector('#equals');
const deleteBtn = document.querySelector('#delete');
const dotBtn = document.querySelector('#dot');
const operatorBtns = document.querySelectorAll('.operator');
const operators = /[+\-×÷.]/;
let displayValue = displaySection.textContent;
let previousChar = null;


function addToDisplay() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            let currentChar = button.textContent; 
            if ((displayValue == "0") && (isOperator(currentChar) === false) 
            ) {
                displayValue = ''; 
            }
            if (operators.test(previousChar) && operators.test(currentChar)) {
                // Prevent consecutive operators
                return;
            }
            displayValue += currentChar;
            previousChar = currentChar;
            checkDot();
            updateDisplay();
        })
    });
}
addToDisplay();

function clearDisplay() {
    clearBtn.addEventListener('click', () => {
        displayValue = "0";
        checkDot();
        updateDisplay();
        resetPreviousChar();
    })
}
clearDisplay();

function deleteChar(){
    deleteBtn.addEventListener('click', () => {
        if (displayValue.length > 1) {
            displayValue = displayValue.slice(0,-1);
        }
        else {
            displayValue = '0';
        }
        resetPreviousChar();
        checkDot();
        updateDisplay();        
    })
}
deleteChar();

//Calculate the solution based on the display value
function getSolution() {
    equalsBtn.addEventListener('click', () => {
        if (displayValue === 0){
            return;
        }
        displayValue = displayValue.split(/([-+×÷])/);
        if (displayValue[2] == '') {
            displayValue.splice(1,2);
        }
        else {
            while (displayValue.length > 2) {
                let a = +displayValue[0];
                let b = +displayValue[2];
                let operator = displayValue[1];
                a = operate(a, operator, b);
                displayValue[0] = a;
                displayValue.splice(1,2);
            }
        }
        if (!isNaN(displayValue)) {
            roundAnswer();
        }
        updateDisplay();
    })
}
getSolution();

function updateDisplay() {
    displaySection.textContent = displayValue;
}

function checkDot() {
    dotBtn.disabled = (displayValue.toString().includes('.')) ? true : false;
}

function isOperator(char){
    return operators.test(char);
}

function roundAnswer() {
    displayValue = parseFloat((+displayValue).toFixed(3)).toString();
}

//Will reset the previousChar variable in order to prevent errors
function resetPreviousChar() {
    const lastChar = displayValue.charAt(displayValue.length -1);

    previousChar = !isOperator(lastChar) ?  null : lastChar;
}

//Add keyboard support 
window.addEventListener('keydown', (e) => {
    const button = document.querySelector(`button[data-code="${e.code}"]`);
    if (!button) return;
    button.click();
})