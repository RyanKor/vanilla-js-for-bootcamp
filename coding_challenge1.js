let massMark = 78;
let heightMark = 1.69;

let massJohn = 92;
let heightJohn = 1.95;

let BMIMark = massMark / (heightMark * heightMark);
let BMIJohn = massJohn / (heightJohn * heightJohn);

let markHigherBMI = BMIMark > BMIJohn;

console.log("Is Mark's BMI higher than John's?" + markHigherBMI);
