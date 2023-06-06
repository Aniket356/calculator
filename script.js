const display = document.querySelector("#display"); //this is the display of the calculator

//this function populates the display with a digit or a decimal
function populate(num) {
    if(display.textContent === '0'){
        display.textContent = num;
        return;
    }
    display.textContent = display.textContent + num;
}

//take the two operands and depending on the operator, return the result
function operate(operand1, operand2, operator){
    //convert strings to numbers
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    if(operator === '/' && operand2 === 0){
        alert("Division by zero not possible!");
        return;
    }

    let result;
    switch(operator){
        case '+':
            result = operand1 + operand2;
            break;

        case '-':
            result = operand1 - operand2;
            break;

        case '*':
            result = operand1 * operand2;
            break;

        case '/':
            //if overflowing screen, round off
            if((operand1/operand2).toString().length > 10){
                result = (operand1/operand2).toFixed(10);
            }
            else{
                result = operand1/operand2;
            }
            break;
    }

    //convert result to exponential form if overflowing display
    if(result.toString().length > 14){
        result = result.toExponential(5);
    }

    return result;
}

let operand1 = null;
let operand2 = null;
let operator = null;
let removeNumberFromDisplay = false; //this variable tells if the number in the display has to be removed when the next number is clicked

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if(display.textContent.length > 14) return;

        if(removeNumberFromDisplay){
            display.textContent = '';
        }

        const btnText = event.target.textContent;
        populate(btnText);
        removeNumberFromDisplay = false; //once the digit is added,change the flag to false
    })
})

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', (event) => {
    if(display.textContent === '0'){
        display.textContent = '0.';
    }

    //there can't be two decimals in a number
    else if(!display.textContent.includes('.') && display.textContent.length < 14 && display.textContent.length >= 1) {
        populate('.');
    }
})


const operators = document.querySelectorAll('.operator');
operators.forEach(operator_btn => {
    operator_btn.addEventListener('click', (event) => {
        removeNumberFromDisplay = true; //once operator is clicked the number in the display has to be removed

        //there should be an operand to work upon
        if(operand1 && operand1 !== undefined){
            operand2 = display.textContent;
            const result = operate(operand1, operand2, operator);
            display.textContent = result;
            operand1 = result; //take the result of the calculation and use it as an operand for the next operation
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
        removeNumberFromDisplay = true; //number in the display has to be removed after a number is clicked now
    }
})

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
    removeNumberFromDisplay = false; //if delete is clicked do not remove the number from display
})