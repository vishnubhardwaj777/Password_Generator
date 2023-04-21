const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generatorBtn = document.querySelector("[generator-button]");
const allcheckBox = document.querySelectorAll("input[type = checkbox]");
const symbol = "!@#$%^&*()_-{[}]|:'<,>.?/~`";

let password = "";
let passwordLength = 7;
let checkCount = 0;

handleSlider();
setIndicator("#ccc")

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxshadow = `0px 0px 12px 1px ${color}`;
}

function generaterandomInteger(min, max) {
    let temp = Math.floor(Math.random() * (max - min) + min);
    return temp;
}

function generateUppercase() {
    let temp = generaterandomInteger(65, 91);
    return String.fromCharCode(temp);
}

function generateLowercase() {
    return String.fromCharCode(generaterandomInteger(97,123));
}

function generateNumber() {
    let temp = generaterandomInteger(0, 10);
    return temp;
}

function generateSymbol() {
    let temp = generaterandomInteger(0, symbol.length);
    return symbol.charAt(temp);
    // You must try this function also to convert index into index value --->  String.indexof(temp);
}

function calculateStrength() {
    let statusUpper = false;
    let statusLower = false;
    let statusNumber = false;
    let statusSymbol = false;

    if (uppercaseCheck.checked) {
        statusUpper = true;
    }
    if (lowercaseCheck.checked) {
        statusLower = true;
    }
    if (numberCheck.checked) {
        statusNumber = true;
    }
    if (symbolCheck.checked) {
        statusSymbol = true;
    }

    if (statusUpper && statusLower && statusNumber && statusSymbol && passwordLength >= 12) {
        setIndicator("#0f0");
    }
    else if (statusUpper && statusLower && (statusNumber || statusSymbol) && passwordLength >= 8) {
        setIndicator("#ff0");
    }
    else if ((statusUpper || statusLower) && (statusNumber || statusSymbol) && passwordLength >= 6) {
        setIndicator("rgb(248 113 113)");
    }
    else {
        setIndicator("red");
    }
}

// Content are copied 
async function copyContent() {
    try {
        //------> navigator.clipboard.writeText     it is used to copy content 
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"
    }
    catch {
        copyMsg.innerText = "Failed";
    }
    // --------> Do not finish the code in this function I shall come bace again to complete this code
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})


// check box count how many boxes are checked
function handlecheckboxStatus() {
    checkCount = 0;
    allcheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })
}

// check each box check or not
allcheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckboxStatus);
})


// -------> Shuffle password
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// ---> Generate password button
generatorBtn.addEventListener('click', () => {

    if (checkCount <= 0)
        return;

    if (checkCount > passwordLength) {
        passwordLength = checkCount;
        handleSlider();
    }

    
    // Everytime this step password empty
    password = "";


    let funArr = [];

    if (uppercaseCheck.checked) {
        funArr.push(generateUppercase);
    }

    if (lowercaseCheck.checked) {
        funArr.push(generateLowercase);
    }

    if (numberCheck.checked) {
        funArr.push(generateNumber);
    }

    if (symbolCheck.checked) {
        funArr.push(generateSymbol);
    }


    // checked index password generate
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }

    

    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let random = generaterandomInteger(0, funArr.length);
        password += funArr[random]();
    }

    // -----> Shuffled Password
    password = shufflePassword(Array.from(password));

    // Generate password are enter into the box
    // password.value="Yellow";
    passwordDisplay.value = password;
    passwordDisplay.style.color = "#ff0"
    calculateStrength();

})

// alert(Math.floor(Math.random() * 99));












