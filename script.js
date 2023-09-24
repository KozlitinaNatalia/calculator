let firstInput = "";
let secondInput = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operand = ["-", "+", "÷", "×"];

const out = document.querySelector(".display p");

function allClear() {
  firstInput = "";
  secondInput = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".ac").addEventListener("click", allClear);

document.querySelector(".buttons").addEventListener("click", function (event) {
  if (!event.target.classList.contains("btn")) return;
  if (event.target.classList.contains("ac")) return;

  out.textContent = "";

  if (event.target.classList.contains("plus-minus")) {
    firstInput = -1 * firstInput;
  } else if (event.target.classList.contains("percent")) {
    firstInput = firstInput / 100;
  }

  out.textContent = firstInput;

  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (secondInput === "" && sign === "") {
      firstInput += key;
      out.textContent = firstInput;
    } else if (firstInput !== "" && secondInput !== "" && finish) {
      secondInput = key;
      finish = false;
      out.textContent = secondInput;
    } else {
      secondInput += key;
      out.textContent = secondInput;
    }
    return;
  }

  if (operand.includes(key)) {
    sign = key;
    out.textContent = sign;
    return;
  }

  if (key === "=") {
    if (secondInput === "") secondInput = firstInput;
    switch (sign) {
      case "+":
        firstInput = Number(firstInput) + Number(secondInput);
        break;
      case "-":
        firstInput = Number(firstInput) - Number(secondInput);
        break;
      case "×":
        firstInput = Number(firstInput) * Number(secondInput);
        break;
      case "÷":
        if (secondInput === "0") {
          out.textContent = "Error";
          firstInput = "";
          secondInput = "";
          sign = "";
          return;
        }
        firstInput = Number(firstInput) / Number(secondInput);
        break;
    }
    finish = true;
    out.textContent = firstInput;
  }
});
