//1
let number = prompt("Enter number : ")
let squared = Math.pow(Number(number), 2);
alert("Power = " + squared)


//2
let number1 = prompt("Enter first number : ");
let number2 = prompt("Enter second number : ");
let avarage = (Number(number1) + Number(number2)) / 2;
alert("Average = " + avarage);


//3
let side = prompt("Enter side of the square : ");
let area = Math.pow(Number(side), 2);
alert("Area of the square = " + area);


//4
let numberK = + prompt("Enter number : ")
function Converter(k)
{
 
    return k * 0.621371;
}
alert("Converter = " + Converter(numberK))


//5
let num1Calc = prompt("Enter first number : ");
let num2Calc = prompt("Enter second number :");
num1Calc = Number(num1Calc);
num2Calc = Number(num2Calc);

let addition = num1Calc + num2Calc;
let subtraction = num1Calc - num2Calc;
let multiplication = num1Calc * num2Calc;
let division = num1Calc / num2Calc;

alert(`Sum: ${addition}\nDifference:: ${subtraction}\nProduction: ${multiplication}\nFraction: ${division}`);


//6
let number1A = +prompt("Enter your number A : ");
let number1B = +prompt("Enter your number B : ");
function Mathematical_equation(n1,n2)
{
 return -(n1/n2);
}
alert("x = " + Mathematical_equation(number1A,number1B))


//7
let hours = prompt("Enter the current hour :");
let minutes = prompt("Enter the current minutes :");
hours = Number(hours);
minutes = Number(minutes);

let remainingHours = 23 - hours;
let remainingMinutes = 60 - minutes;

if (remainingMinutes === 60) {
  remainingMinutes = 0;
  remainingHours -= 1;
}

alert(`Remaining until the next day : ${remainingHours} hours and ${remainingMinutes} minutes.`);


//8
let number3Digit = prompt("Enter a three-digit number : ");
let secondDigit = Math.floor(Number(number3Digit) / 10) % 10;
alert("Second digit : " + secondDigit);


//9
let number5Digit = prompt("Enter a five-digit number :");
let lastDigit = number5Digit[number5Digit.length - 1];
let newNumber = lastDigit + number5Digit.slice(0, -1);
alert("Moved number : " + newNumber);


//10
let sales = prompt("Enter the total amount of sales for the month :");
let salary = 250 + (Number(sales) * 0.10);
alert("Salary : $" + salary);