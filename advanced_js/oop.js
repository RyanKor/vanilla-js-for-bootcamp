// let john = {
//   name: "john",
//   yearOfBirth: 1990,
//   job: "teacher",
// };

// let Person = function (name, yearOfBirth, job) {
//객체 생성. python의 self.name = name이라 지정하는 것과 같은 원리
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };
// Person.prototype.calculateAge = function () {
//   console.log(2016 - this.yearOfBirth);
// };
// let deen = new Person("John", 1972, "engineer");

// deen.calculateAge();

// let personProto = {
//   calculate: function () {
//     console.log(2016 - this.yearOfBirth);
//   },
// };
// 여기 2의 객체가 있는데, 각 각의 객체는 다른 코드같지만 같은 기능을 제공하는 코드다.
// let john = Object.create(personProto);
// john.name = "John";
// john.yearOfBirth = 1990;
// john.job = "engineer";

// let jane = Object.create(personProto, {
//   name: { value: "Jane" },
//   yearOfBirth: { value: 1969 },
//   job: { value: "designer" },
// });

let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  let arrResult = [];
  for (let i = 0; i < arr.length; i++) {
    arrResult.push(fn(arr[i]));
  }
  return arrResult;
}

function calcuateAge(el) {
  return 2016 - el;
}
function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 81 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else {
    return -1;
  }
}

let ages = arrayCalc(years, calcuateAge);
let fullages = arrayCalc(years, isFullAge);
let rate = arrayCalc(years, maxHeartRate);
console.log(ages);

console.log(fullages);
console.log(rate);
