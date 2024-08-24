const MAX_LENGTH = 14;
const MAX_PLACES = 10000000000000;

function toggleNegative(currentStatus = true){
    if (document.getElementById("negative").style.display == ""){
        document.getElementById("negative").style.display = "block";
    }

    if (currentStatus == false){
        document.getElementById("negative").style.display = "block";
    } else {
        document.getElementById("negative").style.display = "none";
    }
}

function updateDisplay(isNewNumber = true, numberPressed = "", currentNegativeStatus = true){
    let numInt = +numberPressed;
    let displayNumber = document.getElementById("numbers");
    if (numInt < 0) {
        numberPressed = numInt * -1;
        toggleNegative(false);
    } else if (numInt > 0 && currentNegativeStatus == true){
        toggleNegative(true);
    }

    if (isNewNumber){ //set display text to numberPressed
        displayNumber.textContent = numberPressed;
    } else { //if number should be appended to existing text
        displayNumber.textContent += numberPressed;
    }
}

function validNumber(number){
    return number.length < MAX_LENGTH ? true : false;
}

function detectButtonPress(){
    updateDisplay(true, "0"); // by default, turns on display upon loading the page

    let currentnum = "";
    let status = "firstnum";
    let firstnum = "";
    let secondnum = "";
    let operator = "";
    let isNegative = false;
    let isNewNumber = false;
    let power = true;

    //event listener - on off button
    let onoffButton = document.querySelector(".onoff");
    onoffButton.addEventListener("click", () => {
        currentnum = "0";
        status = "firstnum";
        firstnum = "";
        secondnum = "";
        operator = "";
        isNegative = false;
        isNewNumber = true;
        toggleNegative();
    
        if (power){ 
            updateDisplay();
        } else {
            updateDisplay(true, "0");
        }

        power = !power;
    });

    //event listener - clear calculator
    let clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", () => {
        currentnum = "0";
        status = "firstnum";
        firstnum = "";
        secondnum = "";
        operator = "";
        isNegative = false;
        isNewNumber = true;

        toggleNegative(true);
        updateDisplay(true, "0");
    });

    // event listener - toggle negative sign
    let negButton = document.querySelector(".func.neg");
    let toggledNeg = negButton.addEventListener("click", (event) => {
        toggleNegative(isNegative);
        isNegative = !isNegative;
    });

    // event listeners - number buttons
    let numberButtons = document.querySelectorAll(".number");
    numberButtons.forEach((button) => {
        let numPressed = button.addEventListener(("click"), (event) => {
            console.log("status at beginning of loop:", status);

            let number = button.textContent;
            if (status == "firstnum" && currentnum != "") {             // status = firstnum
                if (isNegative) number = +number * -1;
                firstnum = firstnum + number;
                updateDisplay(isNewNumber, number);

            } else if (status == "secondnum"){      // status = secondnum
                if (isNegative) number = +number * -1;
                secondnum = secondnum + number;
                updateDisplay(isNewNumber, number);
                isNewNumber = false;
            } else if (status == "operator" && currentnum != "") {  // status = operator
                if (isNegative) number = +number * -1;
                secondnum = secondnum + number;
                status = "secondnum";
                updateDisplay(isNewNumber, number);
                isNewNumber = false;
            } else {
                status = "firstnum";
                firstnum = +number;
                currentnum = currentnum + firstnum;
                isNewNumber = true;
                updateDisplay(isNewNumber, number);
            }

            isNegative = false;
            console.log("firstnum:", firstnum);
            console.log("secondnum:", secondnum);
            console.log("operator:", operator);
            console.log("currentnum:", currentnum);
            console.log("status:", status);
            console.log("isNewNumber:", isNewNumber);
            console.log("------------------");
        });
    });

    // event listeners - operator buttons
    let operatorButtons = document.querySelectorAll(".op");
    operatorButtons.forEach((button) => {
        let opPressed = button.addEventListener(("click"), (event) => {
            console.log("status at beginning of loop:", status);
            let op = button.textContent;

            if (op == "="){ 
                // scenarios:
                // 1. firstnum, secondnum, and another op has been selected alr ---> calculate (FIRST LOOP)
                // 2. firstnum completed, secondnum
                // 3. secondnum not selected ---> return firstnum / do nothing

                let calculated = operate(firstnum, secondnum, operator);
                console.log("calculated:", calculated);

                if ((+calculated < 1 && +calculated > 0) && calculated/MAX_PLACES < 1) calculated = calculated.toString().substring(0, +MAX_LENGTH-1);

                // resetting values
                firstnum = +currentnum;
                secondnum = "";
                operator = "";
                status = "firstnum";
                currentnum = "";
                isNewNumber = true;

                // updating display
                updateDisplay(isNewNumber, calculated);
                firstnum = calculated;
                currentnum = +currentnum + +calculated;
    
            } else {
                if (status == "firstnum"){
                    operator = op;
                    status = "operator"
                    isNewNumber = true;
                } else if (status == "operator"){
                    operator = op;
                    isNewNumber = true;
                } else if (status == "secondnum" && secondnum.length > 0){ // all 3 vars filled, do calc
                    let calculated = operate(firstnum, secondnum, operator);
                    console.log("calculated:", calculated);

                    isNewNumber = true;
                    updateDisplay(isNewNumber, calculated);
                    currentnum = +currentnum + +calculated;

                    // resetting values
                    firstnum = calculated;
                    secondnum = "";
                    operator = op;
                    status = "secondnum";
                    currentnum = "";
                } 
            }

            console.log("firstnum:", firstnum);
            console.log("secondnum:", secondnum);
            console.log("operator:", operator);
            console.log("currentnum:", currentnum);
            console.log("status:", status);
            console.log("isNewNumber:", isNewNumber);
            console.log("------------------");

        });
    });

}

/*TODO:
- decimals...
- implement keybaord input
- allow user to toggle if a number should be negative at any time vs having to press negative before entering input
*/

function operate(num1, num2, operator){
    if (operator == "+"){
        return +num1 + +num2;
    } else if (operator == "-"){
        return +num1 - +num2;
    } else if (operator == "x"){
        return +num1 * +num2;
    } else{
        return +num1 / +num2;
    }
}

detectButtonPress();


