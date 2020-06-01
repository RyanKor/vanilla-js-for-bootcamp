// john's team : 89, 120, 103
// Mark's Team : 116, 94, 123

// 배열을 사용하면 좀 더 깔끔하게 코드를 정리할 수 있을텐데, 아직 앞 부분 강의라 그런지 배열을 사용 안하고 연산한다.

let john = [89, 120, 103];
let johnResult = 0;
let mark = [116, 94, 123];

let markResult = 0;

for (i = 0; i < john.length; i++) {
  johnResult += john[i];
  markResult += mark[i];
}
// 삼항 연산의 경우, 비겼을 때의 연산을 제공하기 어려운 부분이 있다. (비교 대상이 2개를 초과할 때)
answer =
  johnResult / john.length > markResult / mark.length
    ? "John's team win"
    : "Mark's team win";

console.log(answer);
