# this를 사용할 수 있는 방법

1) 일반적인 function(){} 함수를 사용할 경우

- 하지만 기존의 일반함수는 this가 동적으로 바인딩됩니다.
- 일반함수의 this는 아래와 같습니다.

- this를 사용할 때 함정

````javascript
const o ={
  name : 'Julie',
  greetBackwards : function(){
    let nameBackwards = '';
    for (let i = this.name.length-1; i>=0; i--){
      nameBackwards += this.name[i];  
    }
    return nameBackwards;
  }
  return `${getReverseName()} si eman ym, olleH`;
};
o.greetBackwards();
// 의도한 부분은 getReverseName을 사용했을 때, this.name이 'Julie'를 받아 리버싱된 문자열을 반환하는 것이다.
// 그러나 의도한 것처럼 작동하지 않는다.
// this는 '어디서 호출되는지가 중요한' 문법이다. getBackwards를 호출하는 시점에서 자바스크립트는 this를 의도한대로 o에 바인딩하지만, 
// getBackwards 내부의 getReverseName을 호출하면 다른 위치에 바인딩이 되버리는 문제가 발생한다.
// 이를 타개하기 위한 해결책은 보편적으로 활용되는 것이 getBackwards 내부에 this를 다른 변수에 할당하는 것이다.
````

- this 함정 피하기

```javascript
const o ={
  name : 'Julie',
  greetBackwards : function(){
  // self라는 변수에 this를 할당한다.
  	const self = this;
    let nameBackwards = '';
    for (let i = self.name.length-1; i>=0; i--){
      nameBackwards += this.name[i];  
    }
    return nameBackwards;
  }
  return `${getReverseName()} si eman ym, olleH`;
};
```

2) 화살표 함수를 사용할 경우 (this 함정 피하기 2)

- 화살표 함수의 this는 바로 상위 스코프의 this와 같습니다.

### 1. window, browser 자체를 가리키는 this의 사용

`console.log(this);`

- 명확한 scope 지정 없이 this를 전역 위치에서 사용하면 global object에 묶인다.

### 2. 객체 내의 메소드에서 this를 사용하고 있을 때

```javascript
let body = {
head: "this is head",
arm: 2,
legs: function () {
return this.head;
// 이 경우, this가 호출된 위치가 객체 내부이기 때문에 this는 body.head를 가리킨다.
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
```



### 3. 어디로 튈지 모르는 this를 '잘' 활용하기 위한 방법 - call, apply, bind

3-1) call을 사용하는 방법

- call method는 모든 함수에 대해 사용할 수 있으며, this를 특정 값으로 지정할 수 있는 특징을 내포한다.

````javascript
const bruce = {name: 'Bruce'};
const madeline = {name : 'Madeline'};

//이 함수는 어떤 객체에도 연결되어 있지 않지만, this를 사용한다.
function greet(){
  return `Hello, I'm ${this.name}`;
}

greet(); // Hello, I'm undefined
greet.call(bruce); //Hello, I'm Bruce
greet.call(madeline); // Hello, I'm Madeline
````



3-2) apply를 사용하는 방법

- apply는 배열 요소를 함수 매개변수로 사용할 때 매우 유용하다.
- apply를 흔히 사용하는 예제는 최솟값과 최댓값을 사용하는 것이다.
- Math.min, Math.max는 매개변수를 받아 그 중 최솟값과 최댓값을 각각 반환한다.

````javascript
//예제 1
const arr = [2,3,-5,15,7];
Math.min.apply(null, arr);
Math.max.apply(null, arr);
//this 값에 null을 사용한 이유는 Math.min, Math.max this와 관계 없이 동작하기 때문이다.
//즉, 무엇을 넘기든 문제가 되지 않는다.

//예제 2
const newBruce = [1940, 'martial artist'];
update.call(bruce, ...newBruce); // 여기서 call 메소드 사용은 apply(bruce, newBruce)라고 사용한 것과 같다.
Math.min(...arr); // -5
Math.max(...arr); //15
````



3-3) bind를 사용하는 방법

- bind를 사용할 경우 this값을 영구적으로 변경이 가능하다.
- bind는 함수의 동작을 영구적으로 변경할 수 있으므로, 찾기 어려운 버그의 주범이 될 수 있다.
- bind를 사용한 함수는 apply, call, 그리고 다른 bind와 함께 사용할 수 없다 (후,, 이러면 개발할 때 애로사항이 많을 것 같은데?)
- **bind는 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있다.**

````javascript
const updateBruce1949 = update.bind(bruce, 1949); // bruce,1949는 bind로 this가 받을 값을 고정
updateBruce1949("singer, Songwriter") // 직업을 언제든 변경하고 싶을 때는 bind를 사용한 함수 표현식을 호출하는 '새 함수'를 구성하고, bind로 값을 고정 안한 프로퍼티 값을 입력한다.
````



### 4. this 관련 내용 정리를 마치며

- 프로그래밍은 실전이다. 프로젝트 적용이 답이다.
- 그러나 이론 학습을 병행하는 이유는 간단하다.
- 소스코드를 살펴보는 것은 그 프로그램의 정적 구조를 살펴보는 것이기 때문이다.
- (물론 코드를 돌려보면 실행 흐름이 이곳저곳 움직이는 팩트...)