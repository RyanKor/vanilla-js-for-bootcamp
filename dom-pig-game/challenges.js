// textContent 메소드는 쿼리셀렉터로 선택된 ID의 컨텐츠를 문자열로 반환

// document.querySelector("#current" + activePlayer).textContent = dice;
// innerHTML을 textContent로 변경 가능
// document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";
// let contents = (document.querySelector("#current-" + activePlayer).textContent =
//   "<em>" + dice + "</em>");

// document.querySelector("#current-" + activePlayer).textContent = dice;

// let x = document.querySelector("#score-0").textContent;
let score, roundScore, activePlayer, gamePlaying, lastDice;

init();

// 익명함수는 블록 밖에서 사용 불가
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    //   2. display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // if (dice === 6 && lastDice === 6) {
    //   // player loose the score
    //   // Challenge 2
    //   score[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = "0";
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   //   3. Update the round score if the rolled number was NOT a 1

    //   //add score
    //   roundScore += dice;
    //   document.querySelector(
    //     "#current-" + activePlayer
    //   ).textContent = roundScore;
    // } else {
    //   nextPlayer();
    // }
    // lastDice = dice;
    //   3. Update the round score if the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // add current score to global score
    score[activePlayer] += roundScore;
    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];
    let input = document.querySelector(".final-score").value;
    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
    let winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    // Check if player won the game
    if (score[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "winner";
      document.getElementById("dice-1").style.display = "block";
      document.getElementById("dice-2").style.display = "block";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  score = [0, 0];

  roundScore = 0;

  activePlayer = 0;
  gamePlaying = true;
  document.querySelector(".dice").style.display = "none";
  // initial score setting
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
