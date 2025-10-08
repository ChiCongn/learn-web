let current = "";
let memo = "";
let operator = "";

function NumPressed(num) {
    console.log("press number");
    if (current === "0") {
        current = String(num);
    } else {
        current += String(num);
    }
    document.Keypad.ReadOut.value = current;
}

function Operation(op) {
    if (op === "=") {
        if (operator === "") return;
        current = eval(memo + operator + current);
        operator = "";
        document.Keypad.ReadOut.value = current;
    } else {
        memo = current;
        operator = op;
        current = "";
    }
    
}

function Clear() {
    current = "0";
    memo = "0";
    operator = "";
    document.Keypad.ReadOut.value = current;
}

function ClearEntry() {
    current = "0";
    document.Keypad.ReadOut.value = current;
}

function Decimal() {
    if (!current.includes(".")) current += ".";
    document.Keypad.ReadOut.value = current;
}

function Neg() {
    current = String(-parseFloat(current));
    document.Keypad.ReadOut.value = current;
}

function Percent() {
    current = String(parseFloat(current) / 100);
    document.Keypad.ReadOut.value = current;
}