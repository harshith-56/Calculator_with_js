let numEle = document.querySelectorAll(".num");
let num = "";
let clear = document.querySelector(".clear");
let back = document.querySelector(".back");
let dot = document.querySelector(".dot");
let sym = document.querySelectorAll(".sym");
let equal = document.querySelector(".equals");
let symb = ["%", "÷", "×", "+", "-"];

function returnValue(numEle, i) {
  return numEle[i].textContent;
}

for (let i = 0; i < 10; i++) {
  numEle[i].addEventListener("click", function () {
    num += returnValue(numEle, i);
    document.querySelector(".output-text").value = num;
  });
}

clear.addEventListener("click", function () {
  num = "";
  document.querySelector(".output-text").value = num;
});

back.addEventListener("click", function () {
  num = num.slice(0, -1);
  document.querySelector(".output-text").value = num;
});

dot.addEventListener("click", function () {
  console.log(typeof num);
  num += ".";
  document.querySelector(".output-text").value = num;
});

for (let i = 0; i < 5; i++) {
  sym[i].addEventListener("click", function () {
    num += returnValue(sym, i);
    document.querySelector(".output-text").value = num;
  });
}

function check(inputString) {
  let operatorsCount = 0;
  let numbersCount = 0;
  // Iterate through each character in the input string
  for (let i = 0; i < inputString.length; i++) {
    let char = inputString[i];

    // Check if the character is an operator
    if (symb.includes(char)) {
      operatorsCount++;
    }
    // Check if the character is a digit
    else if (!isNaN(parseInt(char))) {
      // If it's a digit, check for consecutive digits to form a number
      let j = i + 1;
      while (j < inputString.length && !symb.includes(inputString[j])) {
        j++;
      }
      numbersCount++;
      i = j - 1; // Update the index to the last digit of the number
    }
  }

  // console.log("Number of operators:", operatorsCount);
  // console.log("Number of numbers:", numbersCount);
  // document.writeln("he;llo");
  if (operatorsCount !== numbersCount + 1) {
    return false;
  } else {
    return true;
  }
}

equal.addEventListener("click", function () {
  let input = document.querySelector(".output-text").value;
  if (check(input) === false) {
    document.querySelector(".output-text").value = "invalid syntax";
  }
  for (let i = 0; i < input.length; i++) {
    if (symb.includes(input.charAt(i))) {
      if (input.charAt(i) === "×") {
        input = input.substring(0, i) + "*" + input.substring(i + 1);
      } else if (input.charAt(i) === "÷") {
        input = input.substring(0, i) + "/" + input.substring(i + 1);
      }
    }
  }
  num = eval(input);
  document.querySelector(".output-text").value = num;
});
