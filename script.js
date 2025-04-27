'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 1. Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 2. Display dice
    dice.classList.remove('hidden');
    const num = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${num}.png`;
    console.log(num);
    // 3. Check for rolled
    if (num !== 1) {
      // Add dice to the current score
      currentScore += num;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // Switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active players score
  scores[activePlayer] += currentScore;
  console.log(scores);
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if player's score is >=100
  if (scores[activePlayer] >= 50) {
    playing = false;
    // Finish the game
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    // Switch to next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
