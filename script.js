const display = document.querySelector("#display"); //this is the display of the calculator
let operand1 = null;
let operand2 = null;
let operator = null;
let removeNumberFromDisplay = false; //this variable tells if the current number in the display has to be removed when the next number is clicked

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
            return result;
    }

    //convert result to exponential form if overflowing display
    if(result.toString().length > 14){
        result = result.toExponential(5);
    }

    return result;
}

//called when a number is pressed on the keyboard or a number btn is clicked
function numberButtonClicked(num){
    if(display.textContent.length > 14) return;
    
    if(removeNumberFromDisplay){
        display.textContent = '';
    }
    
    populate(num);
    removeNumberFromDisplay = false; //once the digit is added,change the flag to false
}

//when decimal key pressed or decimal button is clicked
function decimalButtonClicked(){
    if(display.textContent === '0'){
        display.textContent = '0.';
    }

    //there can't be two decimals in a number
    else if(!display.textContent.includes('.') && display.textContent.length < 14 && display.textContent.length >= 1) {
        populate('.');
    }
}

//when an operator key is pressed or operator button is clicked
function operatorClicked(oper){
    removeNumberFromDisplay = true; //once operator is clicked the number in the display has to be removed

    //if there is already an operand
    if(operand1){
        operand2 = display.textContent;
        const result = operate(operand1, operand2, operator);
        display.textContent = result;
        operand1 = result; //take the result of the calculation and use it as an operand for the next operation
        operand2 = null;
        operator = oper;
    }
    else{
        operator = oper;
        operand1 = display.textContent;
    }
}

//when +/- key is pressed or button is pressed
function changeSign(){
    if(display.textContent === '0') return;
    if(display.textContent[0] === '-'){
        display.textContent = display.textContent.slice(1);
    }
    else{
        display.textContent = `-${display.textContent}`;
    }
}

// when = key or button is pressed
function showResult(){
    if(operand1 !== null && operator !== null){
        operand2 = display.textContent;
        const result = operate(operand1, operand2, operator);
        display.textContent = result;
        operand1 = null;
        operand2 = null;
        operator = null;
        removeNumberFromDisplay = true; //number in the display has to be removed after a number is clicked now
    }
}

function clearDisplay(){
    display.textContent = '0';
    operand1 = null;
    operand2 = null;
    operator = null;
}

function deleteKey(){
    display.textContent = display.textContent.slice(0, -1);
    if(display.textContent.length === 0 || display.textContent === '-'){
        display.textContent = '0';
    }
    removeNumberFromDisplay = false; //if delete is clicked do not remove the number from display
}


const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(btn => {
    btn.addEventListener('click', function(){
        numberButtonClicked(this.textContent);
    });
})    

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', decimalButtonClicked)

const operators = document.querySelectorAll('.operator');
operators.forEach(operator_btn => {
    operator_btn.addEventListener('click', function(){
        operatorClicked(this.textContent);
    })
})

const plusMinus = document.querySelector('#plus-minus');
plusMinus.addEventListener('click', changeSign)

const equals = document.querySelector('#equals');
equals.addEventListener('click', showResult);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearDisplay);

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', deleteKey)

//keyboard support
window.addEventListener('keydown', event => {
    const key = document.querySelector(`[data-code="${event.code}"]`);
    if(!key) return;

    if(key.id === 'clear') clearDisplay();
    else if(key.id === 'delete') deleteKey();

    else if(key.classList.contains('number')){
        numberButtonClicked(key.textContent);
    }
    else if(key.id === 'decimal'){
        decimalButtonClicked();
    }
    else if(key.classList.contains('operator')){
        operatorClicked(key.textContent);
    }
    else if(key.id === 'plus-minus'){
        changeSign();
    }
    else if(key.id === 'equals'){
        showResult();
    }
})