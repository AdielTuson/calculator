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
const numbersBtns = document.querySelectorAll('.digit');
    console.log(numbersBtns);

numbersBtns.forEach((button) => {
    button.addEventListener('click', () => {
        displaySection.textContent = button.textContent;
    })
})