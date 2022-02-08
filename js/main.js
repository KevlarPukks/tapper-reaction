import {TimeElapsed} from "./TimeElapsed";
const ONE_SECOND = 1000;

var granimInstance = new Granim({
  element: '#granim-bg',
  name: name,
  opacity: [1, 1],
  image: {
    source: 'https://i.ibb.co/Qppp2sy/pexels-pixabay-248747.jpg',
    blendingMode: 'multiply'
  },
  states: {
    "default-state": {
      gradients: [
        ['#f9a710', '#fe6464'],
        ['#063dce', '#4feeeb']
      ],
      transitionSpeed: 10 * ONE_SECOND
    }
  }
});

$(document).ready(function () {
  const timer = new TimeElapsed()
  const BASE_SHOW_TIME = [1, 3]
  const SCORE_BASE = 500
  const TAPS_START_AMOUNT = 10


  let gameCountdown = 3;
  let score = 0;
  let tapsRemaining = 10;
  let targetVisible = false
  let showTargTimer;

  const tapsRemainingEl = $('#taps-remaining')
  const scoreEl = $('#score')
  const target = $('#target')
  const bars = $('#bars')
  const countdownPage = $('#countdown-page')
  const gamePage = $('#game-page')
  const startBtn = $('#start-button');
  const startPage = $('#start-page')
  const gameoverPage = $('#game-over-page')
  const gameCountdownEl = $('#game-countdown')
  const targetContainer = $('.target-container')
  const score2 = $('#score2')

  function RandomRange(min, max) {
    return Math.random() * (max - min + 1) + min
  }

  function setTaps(taps) {
    tapsRemaining = taps
    tapsRemainingEl.html(`Taps: <br/>${tapsRemaining}`)
  }

  function setScore(_score) {
    score = _score
    scoreEl.html(`Score:<br/>${score}`)
  }

  function showTarget() {
     showTargTimer = setTimeout(function () {
      timer.start()
      target.show()
      bars.hide()
      targetVisible = true
    }, RandomRange(...BASE_SHOW_TIME) * ONE_SECOND)
  }

  function startGame(gameCountdownInterval) {

    countdownPage.fadeOut(function () {
      setTaps(10);
      setScore(0);
      gamePage.fadeIn(function () {
        showTarget();
      })
    })
  }

  function startGameCountdown() {
    const gameCountdownInterval = setInterval(function () {
      gameCountdown--
      gameCountdownEl.text(gameCountdown)
      if (gameCountdown <= 0) {
        clearInterval(gameCountdownInterval)
        startGame();
      }
    }, ONE_SECOND)
  }

  const startButtonPressed = () => {
    startPage.fadeOut(function () {
      countdownPage.fadeIn(function () {
        startGameCountdown();
      })
    })
  };

  targetContainer.click(function (e) {
    setTaps(tapsRemaining - 1)
    if (tapsRemaining <= 0) {
      gamePage.fadeOut(ONE_SECOND, function () {
        score2.text(score)
        gameoverPage.fadeIn(ONE_SECOND, function () {

        })
      })
    } else {
      clearTimeout(showTargTimer)
      showTarget()
    }

    if (targetVisible) {
      targetVisible = false
      let timerEnd = timer.end();
      let tapPoints = Math.floor(SCORE_BASE / timerEnd);
      console.log(timerEnd)
      setScore(score + tapPoints)
      target.hide()
      bars.show()
      bars.fadeOut(ONE_SECOND, function () {

      })

    }
  })

  $('#retry-btn').click(function (e) {
gameoverPage.fadeOut(ONE_SECOND,function () {
  startPage.fadeIn(ONE_SECOND)
  gameCountdown = 3
  gameCountdownEl.text(gameCountdown)
})
  })

  startBtn.click(function (e) {
    startButtonPressed();

  })
  gameoverPage.hide()
  target.hide()
  bars.hide()
  gamePage.hide()
  countdownPage.hide()
});
window.onload = function () {


};


