// coding challenge 3

let bills = [124, 48, 268];

let tip = [];

for (let i = 0; i < bills.length; i++) {
  if (bills[i] < 50) {
    tip.push(bills[i] + bills[i] * 0.2);
  } else if (bills[i] > 50 && bills[i] < 200) {
    tip.push(bills[i] + bills[i] * 0.15);
  } else {
    tip.push(bills[i] + bills[i] * 0.1);
  }
}

// 배열의 총합을 연산하는 값을 별도의 메소드가 파이썬 처럼 sum 함수 형태로 존재하지는 않는다.
console.log(
  tip,
  tip.reduce((a, b) => a + b, 0)
);
