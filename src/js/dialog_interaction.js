/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
// dialog interaction
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
  science_but.addEventListener('click', () => {
    science_dia.showModal();
  });
  science_dia.querySelector('.close').addEventListener('click', () => {
    science_dia.close();
  });
  if (!history_dia.showModal) {
    dialogPolyfill.registerDialog(history_dia);
  }
  history_but.addEventListener('click', () => {
    console.log('history');
    history_dia.showModal();
  });
  history_dia.querySelector('.close').addEventListener('click', () => {
    history_dia.close();
  });
  if (!scientist_dia.showModal) {
    dialogPolyfill.registerDialog(scientist_dia);
  }
  scientist_but.addEventListener('click', () => {
    console.log('scientist');
    scientist_dia.showModal();
  });
  scientist_dia.querySelector('.close').addEventListener('click', () => {
    scientist_dia.close();
  });
}
