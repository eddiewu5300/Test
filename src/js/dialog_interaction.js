/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
// dialog interaction
// dialog pop out and close
const history_dia = document.querySelector('#history-dia');
const science_dia = document.querySelector('#science-dia');
const scientist_dia = document.querySelector('#scientist-dia');
const history_but = document.querySelector('#history-but');
const science_but = document.querySelector('#science-but');
const scientist_but = document.querySelector('#scientist-but');

dialog_interaction();

function dialog_interaction() {

  if (!science_dia.showModal) {
    dialogPolyfill.registerDialog(science_dia);
  }
  var sciAud = new Audio("media/ScienceSG.mp4");
  science_but.addEventListener('click', () => {
    sciAud.play();
    science_dia.showModal();

  });
  science_dia.querySelector('.close').addEventListener('click', () => {
    sciAud.pause();
    sciAud = new Audio("media/ScienceSG.mp4");
    science_dia.close();
  });
  if (!history_dia.showModal) {
    dialogPolyfill.registerDialog(history_dia);
  }
  var hisAud = new Audio("media/HistorySG.mp4");
  history_but.addEventListener('click', () => {
    hisAud.play();
    history_dia.showModal();
  });
  history_dia.querySelector('.close').addEventListener('click', () => {
    hisAud.pause();
    hisAud = new Audio("media/HistorySG.mp4");
    history_dia.close();
  });
  if (!scientist_dia.showModal) {
    dialogPolyfill.registerDialog(scientist_dia);
  }
  scientist_but.addEventListener('click', () => {

    scientist_dia.showModal();
  });
  scientist_dia.querySelector('.close').addEventListener('click', () => {
    scientist_dia.close();
  });
}
