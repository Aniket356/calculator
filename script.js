const display = document.querySelector("#display");

function populate(num) {
    if(display.textContent === '0'){
        display.textContent = num;
        return;
    }
    display.textContent = display.textContent + num;
}

function operate(operand1, operand2, operator){
    //convert strings to numbers
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    if(operator === '/' && operand2 === 0){
        alert("Division by zero not possible!");
        return;
    }

    switch(operator){
        case '+':
            return operand1 + operand2;
            break;

        case '-':
            return operand1 - operand2;
            break;

        case '*':
            return operand1 * operand2;
            break;

        case '/':
            //if overflowing screen, round off
            if((operand1/operand2).toString().length > 10){
                return (operand1/operand2).toFixed(10);
            }
            return operand1/operand2;
            break;
    }
}

let operand1 = null;
let operand2 = null;
let operator = null;
let removeNumberFromDisplay = false;

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if(display.textContent.length > 14) return;

        if(removeNumberFromDisplay){
            display.textContent = '';
        }

        const btnText = event.target.textContent;
        populate(btnText);
        removeNumberFromDisplay = false;
    })
})

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', (event) => {
    if(display.textContent === '0'){
        display.textContent = '0.';
    }
    if(!display.textContent.includes('.') && display.textContent.length < 14 && display.textContent.length >= 1) {
        populate('.');
    }
})


const operators = document.querySelectorAll('.operator');
operators.forEach(operator_btn => {
    operator_btn.addEventListener('click', (event) => {
        removeNumberFromDisplay = true;
        if(operand1){
            operand2 = display.textContent;
            const result = operate(operand1, operand2, operator);
            display.textContent = result;
            operand1 = result;
            operand2 = null;
            operator = event.target.textContent;
        }
        else{
            operator = event.target.textContent;
            operand1 = display.textContent;
        }
    })
})

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    if(operand1 !== null && operator !== null){
        operand2 = display.textContent;
        const result = operate(operand1, operand2, operator);
        display.textContent = result;
        operand1 = null;
        operand2 = null;
        operator = null;
        removeNumberFromDisplay = true;
    }
})

//the clear and delete buttons
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', () => {
    display.textContent = '0';
    operand1 = null;
    operand2 = null;
    operator = null;
})

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if(display.textContent.length === 0 || display.textContent === '-'){
        display.textContent = '0';
    }
})