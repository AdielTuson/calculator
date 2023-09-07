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
let displayValue = 0;

function updateDisplay() {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (displaySection.textContent === '0') {
                displaySection.textContent = ''; 
            }
            displaySection.textContent += button.textContent;
            updateDisplayVal();
        })
    });
}
updateDisplay();

function clearDisplay() {
    clearBtn.addEventListener('click', () => {
        displaySection.textContent = 0;
        updateDisplayVal();
    })
}
clearDisplay();

function deleteChar(){
    deleteBtn.addEventListener('click', () => {
        if (displaySection.textContent.length > 1) {
            displaySection.textContent = displaySection.textContent.slice(0,-1);
        }

        else {
            displaySection.textContent = 0;
        }
        updateDisplayVal();        
    })
}
deleteChar();

//Calculate the solution based on the display value
function getSolution() {
    equalsBtn.addEventListener('click', () => {
        if (displayValue !== 0){
            displayValue = displayValue.split(/([-+*/])/);
                console.log(displayValue)
            while (displayValue.length > 1) {
                let a = +displayValue[0];
                let b = +displayValue[2];
                let operator = displayValue[1];
                a = operate(a, operator, b);
                displayValue[0] = a;
                displayValue.splice(1,2);
            }
            displaySection.textContent = parseFloat((+displayValue).toFixed(3));//Make sure the answer is rounded
            updateDisplayVal();
        }
    })
}
getSolution();

function updateDisplayVal() {
    displayValue = displaySection.textContent;
}