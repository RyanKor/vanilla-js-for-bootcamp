`
this를 사용할 수 있는 방법

1. 일반적인 function(){} 함수를 사용할 경우
  하지만 기존의 일반함수는 this가 동적으로 바인딩됩니다.
  일반함수의 this는 아래와 같습니다.
- 내부함수, 콜백 함수: 전역 객체(브라우저에서는 window, node에서는 global)
- 객체의 메소드: 메소드를 소유한 객체 자체
- 생성자 함수: 생성자로 생성하는 객체

2. 화살표 함수를 사용할 경우
- 화살표 함수의 this는 바로 상위 스코프의 this와 같습니다.
`;

// 1. window, browser 자체를 가리키는 this의 사용
console.log(this);

// 2. 객체 내의 메소드에서 this를 사용하고 있을 때
let body = {
  head: "this is head",
  arm: 2,
  legs: function () {
    return this.head;
  },
};
console.log(body.legs());
const obj = {
  obj1: {
    name1: "seung",
  },
  fumc: () => {
    console.log(this.obj1.name1);
  },
};

obj.fumc();

// 3. 생성자 함수의에서 생성되었을 때

// 4. 아래는 화살표 함수를 직접 구현한 부분

// console.log(number(count));
