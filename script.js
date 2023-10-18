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
    console.log(displayValue)

function addToDisplay() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            let buttonContent = button.textContent; 
            if ((displayValue == "0") && (isOperator(buttonContent) === false) 
            ) {
                displayValue = ''; 
            }
            displayValue += buttonContent;
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
                console.log(typeof displayValue)
            displayValue = displayValue.split(/([-+×÷])/);
                console.log( typeof displayValue)
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
            console.log(displayValue)
            if (!isNaN(displayValue)) {
                roundAnswer();
            }
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

function roundAnswer() {
    displayValue = parseFloat((+displayValue).toFixed(3)).toString();
}

//Add keyboard support 
window.addEventListener('keydown', (e) => {
    const button = document.querySelector(`button[data-code="${e.code}"]`);
    if (!button) return;
    button.click();
})