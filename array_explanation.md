# 다른 언어와는 다른 Array 사용법

## 내장 메소드 정리

- shift, unshift : 각각 배열의 처음 요소를 제거하거나 추가한다
- push, shift : 새 요소를 추가해서 늘어난 길이를 반환
- pop, shift : 제거된 요소를 반환한다.
- slice : 배열의 일부만 가져올 때 사용 (python에서 사용하는[:] 개념과 동일)
- splice(i,j,...) : 매개변수에서 첫번째 요소는 수정을 시작할 인덱스, 두번째 매개변수는 제거할 요소 숫자, 아무것도 제거하고 싶지 않을 땐 2번째 요소를 0으로 둔다. 세번째 요소 이후는 배열에 추가할 요소다.
- some : 조건에 맞는 요소를 배열에서 탐색하고, 맞으면 true, 조건에 부합하지 않으면 false 반환.
- map : 일정한 형식의 배열을 다른 형식의 배열로 바꿔야 한다면 map을 사용 가능.

## 디테일 내장 메소드 정리 (===내가 어려워하는 메소드)

- reduce 사용 시, 첫번째 매개변수는 배열이 줄어드는 대상인 accumulator다.
- 표현이 어려운데, 이 표현은 되도록 배제하고 '누적값' 또는 '전 단계의 결과'로 순화 표현한다.
- 두번째 매개변수는 현재 배열 요소, 현재 인덱스, 배열 자체가 될 수 있다.

```javascript
// 예제 1
const arr = [5, 7, 2, 4];
const sum = arr.reduce((a, x) => (a += x), 0);

// 첫번째 배열 요소 5에서 익명함수를 호출한다. a의 초깃값은 0이고, x의 값은 5다.
// 이 값은 다음 단계에서 a의 값이된다.
```

```javascript
//예제 2
const words = [
  "beachball",
  "Rodeo",
  "Angel",
  "Aardvark",
  "Xylophone",
  "Chocolate",
  "Papaya",
  "Uniform",
  "Joker",
  "Clover",
  "Bali",
];
const alphabetical = words.reduce((a, x) => {
  if (!a[x[0]]) a[x[0]] = [];
  a[x[0]].push(x);
  return a;
}, {});
//원칙을 기억하면 문제는 쉽다.
```
