/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
let timeoutID;
// set up a timer to detect page idle time and change to idle page when inactive
function setup() {
  this.addEventListener('mousemove', resetTimer, false);
  this.addEventListener('mousedown', resetTimer, false);
  this.addEventListener('keypress', resetTimer, false);
  this.addEventListener('DOMMouseScroll', resetTimer, false);
  this.addEventListener('mousewheel', resetTimer, false);
  this.addEventListener('touchmove', resetTimer, false);
  this.addEventListener('MSPointerMove', resetTimer, false);
  startTimer();
}
setup();


function startTimer() {
  // wait 10 sec before calling goInactive
  timeoutID = window.setTimeout(goInactive, 10000);
}

function resetTimer() {
  window.clearTimeout(timeoutID);

  goActive();
}

function goInactive() {
  const randomInt = getRandomInt(3);
  ga('send', 'event', 'user visit', 'visit');
  scientist_dia.close();
  history_dia.close();
  science_dia.close();

  document.querySelector('#idle-page img').src = `media/stained-glass${randomInt}.jpg`;
  document.querySelector('#idle-page').style.visibility = 'visible';
  document.querySelector('#idle-page h1').style.visibility = 'visible';

}
// random select graph
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function goActive() {
  document.querySelector('#idle-page').style.visibility = 'hidden';
  document.querySelector('#idle-page h1').style.visibility = 'hidden';


  startTimer();
}
