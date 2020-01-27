/* --------------- Game State/Global Variables ---------------------*/
let wires = {
  blue: {
    cut: false,
    needsCut: false,
    cutImg: 'img/cut-blue-wire.png',
    uncutImg: 'img/uncut-blue-wire.png'
  },
  green: {
    cut: false,
    needsCut: false,
    cutImg: 'img/cut-green-wire.png',
    uncutImg: 'img/uncut-green-wire.png'
  },
  red: {
    cut: false,
    needsCut: false,
    cutImg: 'img/cut-red-wire.png',
    uncutImg: 'img/uncut-red-wire.png'
  },
  white: {
    cut: false,
    needsCut: false,
    cutImg: 'img/cut-white-wire.png',
    uncutImg: 'img/uncut-white-wire.png'
  },
  yellow: {
    cut: false,
    needsCut: false,
    cutImg: 'img/cut-yellow-wire.png',
    uncutImg: 'img/uncut-blue-wire.png'
  }
};

const STARTING_TIME = 30;
let remainingTime = STARTING_TIME;
let wiresToCut = [];
let countdown = null;
let delay = null;
let gameOver = true;

/* ------------- Functions ------------------------ */
let gameInit = function() {
  let domWires = document.querySelectorAll('img');
  let domResetBtn = document.querySelector('.reset');
  let domTimer = document.querySelector('.countdown');

  // tell js game is on
  gameOver = false;
  wiresToCut = [];
  // reset timer
  remainingTime = STARTING_TIME;
  // reset wire imgs
  for (let i = 0; i < 5; i++) {
    domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
  }
  // disable button
  domResetBtn.disabled = true;
  // reset background
  document.querySelector('body').classList.remove('flat-city');
  document.querySelector('body').classList.add('happy-city');

  // set wires to be cut (includes pushing to wiresToCut)
  // TODO: check for no-win scenarios and re-run wire loop.
  for (let wire in wires) {
    let rand = Math.random();
    if (rand > 0.5) {
      wiresToCut.push(wire)
    }
  }

  console.log(wiresToCut);
  // start countdown
  countdown = setInterval(updateClock, 100);
  // TODO play siren
};

let endGame = function(win) {
  // if win is true, run win stuff, else run boom stuff
  clearInterval(countdown);
  clearTimeout(delay);
  gameOver = true;
  document.querySelector('.reset').disabled = false;

  if (win) {
    // TODO saviour stuff
    console.log('HUrray!~');
  } else {
    console.log('KABOOOOOOM')
    // change the background
    document.body.classList.remove('happy-city');
    document.body.classList.add('flat-city');
    // make boom sound
  }
}

let updateClock = function() {
  // TODO count down in miliseconds
  remainingTime--;
  if (remainingTime <= 0) {
    // End game as loser
    endGame(false);
  }
  document.querySelector('.countdown').textContent = `00:00:${remainingTime < 10 ? '0' + remainingTime : remainingTime}`;
}

let wireClickHandler = function(e) {
  // check if wire has been cut AND if the game is not over
  if (!wires[e.target.id].cut && !gameOver) {
    // tell js we've cut the wire
    wires[e.target.id].cut = true;
    // change img
    e.target.src = wires[e.target.id].cutImg;
    // check if it's in wires to cut
    let wireIndex = wiresToCut.indexOf(e.target.id);
    if (wireIndex > -1) {
      console.log('good so far')
      // take it out of wiresToCut
      wiresToCut.splice(wireIndex, 1);
      // Check if wiresToCut.length === 0
      if (wiresToCut.length === 0) {
        endGame(true);
      }
    } else {
      delay = setTimeout(function() {
        console.log('Yikes, you\'ve still got 750 miliseconds');
        endGame(false);
      }, 750);
    }
    // play bzzz
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // DOM references
  // console.log(document)

  gameInit();

  document.querySelector('.wires').addEventListener('click', wireClickHandler);

})