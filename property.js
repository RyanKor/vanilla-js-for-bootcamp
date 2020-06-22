// let john = {
//   firstname: "John",
//   lastname: "Smith",
//   birthYear: 1990,
//   family: ["Jane", "Mark", "Bob", "Emily"],
//   job: "teacher",
//   isMarried: false,
// };

// 이렇게 객체 내부에 있는 프로퍼티들을 수시로 변경해주는 일들을 진행하는 게 결국 리액트에서 상태 변화로 연결되는 부분이다.

let arr = [12, 2, 34, 4, 5, 6, 718];
/*
for loop의 다양한 사용법
*/
// 1. arr의 index를 출력
// for (j in arr) {
//   console.log(j);
// }
// 결과값 => 0,1,2,3,4,5,6

// 2. arr의 요소를 출력한다.
// for (j of arr) {
//   console.log(j);
// }
// 결과값 => 12, 2, 34, 4, 5, 6, 718

// 3. 2번과 같은 경우다.
// arr.forEach((e) => console.log(e));

// 4. map을 사용하는 경우 => 조건을 만족하는 값을 배열로 반환한다.
// arr.map((a) => console.log(a * a));
// 결과값 => [144, 4, 1156, 16, 25, 36, 515524]

// 5. reducer를 사용하는 경우
