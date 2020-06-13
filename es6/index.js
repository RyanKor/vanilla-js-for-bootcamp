const boxes = document.querySelector(".box");

Array.from(boxes).forEach((cur) => {
  cur.style.backgroundColor = "dodgerblue";
});

// es6

// for (const cur of boxes) {
// for loop의 사용법이 달라진 점, 그리고 includes라는 내장 메소드가 추가된 점
// }

/*
map 함수를 돌리면 결과값은 반드시 Array 값이 반환된다.
apply 메소드도 있다.
es6로 넘어오고 나서 화살표 함수,let, const 뿐만이 아니라 기타 다양한 내장 메소드들도 함께 넘어왔다.
전에 리액트 공부하면서 배웠던 ...의 활용법도 es6 이후에 넘어온 내용인 것 같다.
*/

// Lecture : Rest parameter

// Default Parameter

// Maps
// size와 length의 차이가 뭘까?
const question = new Map();
question.set(1, "ES5");
question.size;
question.get(1);
question.has(1);
question.delete(1);
question.clear();

// lecture : Classes
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  calculateAge() {
    let age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
  }
}
