// Question Challenges.

// 상단에서 this를 사용해서 생성사 역할을 동시에 진행한 사례
function Question(question, answers, correct) {
  this.question = question;
  this.answers = answers;
  this.correct = correct;
}

Question.prototype.displayQuestion = function () {
  console.log(this.question);
  for (let i = 0; i < this.answers.length; i++) {
    console.log(i + " : " + this.answers[i]);
  }
};

Question.prototype.checkAnswer = function (ans) {
  if (ans === this.correct) {
    console.log("Correct Answer");
  } else {
    console.log("Wrong Answer. Try Again!");
  }
};

let q1 = new Question(
  "Is JS the collest programming in the world?",
  ["YES", "NO"],
  0
);

let q2 = new Question(
  "What is the name of this course's teacher?",
  ["John", "MiChael", "Jonas"],
  2
);

let q3 = new Question(
  "What does the best describe coding?",
  ["Boring", "Hard", "Fun", "Tedious"],
  2
);

function score() {
  let sc = 0;
  return function (correct) {
    if (correct) {
      sc++;
    }
    return score;
  };
}

let keepScore = score();

function nextQuestion() {
  let questions = [q1, q2, q3];

  let n = Math.floor(Math.random() * questions.length);

  questions[n].displayQuestion();

  let answer = parseInt(prompt("Please select the correct answer."));

  if (answer !== "exit") {
    questions[n].checkAnswer(parseInt(answer));
    nextQuestion();
  }
}
nextQuestion();
