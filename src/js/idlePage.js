/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
let timeoutID;

function setup() {
  this.addEventListener('mousemove', resetTimer, false);
  this.addEventListener('mousedown', resetTimer, false);
  this.addEventListener('keypress', resetTimer, false);
  this.addEventListener('DOMMouseScroll', resetTimer, false);
  this.addEventListener('mousewheel', resetTimer, false);
  this.addEventListener('touchmove', resetTimer, false);
  this.addEventListener('MSPointerMove', resetTimer, false);
  console.log('djflkdjfoijeflkw');

  startTimer();
}
setup();

function startTimer() {
  // wait 10 before calling goInactive
  timeoutID = window.setTimeout(goInactive, 10000000);
}

function resetTimer() {
  window.clearTimeout(timeoutID);
  console.log('active');

  goActive();
}

function goInactive() {
  window.location.href = 'idle.html';
}

function goActive() {
  // do something
  // window.location.href = 'index.html';
  startTimer();
}
