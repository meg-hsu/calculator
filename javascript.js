function toggleNegative(currentStatus){
    let negativeDisplay = document.getElementById("negative");
    currentStatus = !currentStatus; // changes from false to true and vice versa

    if (currentStatus == true){
        negativeDisplay.textContent = "-"
    } else {
        negativeDisplay.textContent = "";
    }

    return currentStatus;
}

function detectButtonPress(){
    let currentnum = "0";
    let status = "firstnum"
    let firstnum = "";
    let secondnum = "";
    let operator = "";
    let isNegative = false;

    // event listener - toggle negative sign
    let negButton = document.querySelector(".func.neg");
    let toggledNeg = negButton.addEventListener("click", (event) => isNegative = toggleNegative(isNegative));

    // event listeners - number buttons
    let numberButtons = document.querySelectorAll(".number");
    numberButtons.forEach((button) => {
        let numPressed = button.addEventListener(("click"), (event) => {
            let number = button.textContent;
            if (status == "firstnum") {             // status = firstnum
                if (isNegative) number = +number * -1;
                firstnum = firstnum + number;

            } else if (status == "secondnum"){      // status = secondnum
                if (isNegative) number = +number * -1;
                secondnum = secondnum + number;
            } else {                                // status = operator
                if (isNegative) number = +number * -1;
                secondnum = secondnum + number;
                status = "secondnum";
            }
            isNegative = false;
            console.log("------------------");
            console.log("firstnum:", firstnum);
            console.log("secondnum:", secondnum);
            console.log("operator:", operator);
            console.log("currentnum:", currentnum);
        });
    });

    // event listeners - operator buttons
    let operatorButtons = document.querySelectorAll(".op");
    operatorButtons.forEach((button) => {
        let opPressed = button.addEventListener(("click"), (event) => {
            let op = button.textContent;

            if (op == "="){ 
                // scenarios:
                // 1. firstnum, secondnum, and another op has been selected alr ---> calculate
                // 2. secondnum not selected ---> return firstnum / do nothing

                let calculated = operate(firstnum, secondnum, operator);
                console.log("calculated:", calculated);
                currentnum = +currentnum + +calculated;

                // resetting values
                firstnum = +currentnum;
                secondnum = "";
                operator = op;
                status = "secondnum";
                currentnum = "";
            } else {
                    // console.log(button.textContent, event);
                if (status == "firstnum"){
                    operator = op;
                    status = "operator"
                } else if (status == "operator"){
                    operator = op;
                } else if (status == "secondnum" && secondnum.length > 0){ // all 3 vars filled, do calc
                    let calculated = operate(firstnum, secondnum, operator);
                    console.log("calculated:", calculated);
                    currentnum = +currentnum + +calculated;

                    // resetting values
                    firstnum = +currentnum;
                    secondnum = "";
                    operator = op;
                    status = "secondnum";
                    currentnum = "";
                } else {
                    operator = op;
                    status = "secondnum";
                }
            }

            console.log("------------------");
            console.log("firstnum:", firstnum);
            console.log("secondnum:", secondnum);
            console.log("operator:", operator);
            console.log("currentnum:", currentnum);

        });
    });

}

/*TODO:
- implement +/- button
    - display: when pressed, toggle "-" button
    - if it is active when another operator is pressed, multiple said number by -1 BEFORE continuing/calculation
- fix operators bug
    - when two operators are pressed back to back, sets current number to like, infinity or something.
- display!!! 
- decimals...
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


