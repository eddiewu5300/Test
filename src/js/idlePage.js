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
  timeoutID = window.setTimeout(goInactive, 10000);
}

function resetTimer() {
  window.clearTimeout(timeoutID);
  console.log('active');

  goActive();
}

function goInactive() {
  const randomInt = getRandomInt(3);
  console.log(randomInt);

  document.querySelector('#idle-page img').src = `media/stained-glass${randomInt}.jpg`;
  document.querySelector('#idle-page').style.visibility = 'visible';
  document.querySelector('#idle-page h1').style.visibility = 'visible';
  // window.location.href = 'idle.html';
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function goActive() {
  document.querySelector('#idle-page').style.visibility = 'hidden';
  document.querySelector('#idle-page h1').style.visibility = 'hidden';

  // do something
  // window.location.href = 'index.html';
  startTimer();
}
