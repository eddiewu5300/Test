//dialog interaction
var history_dia = document.querySelector('#history-dia');
var science_dia = document.querySelector('#science-dia');
var scientist_dia = document.querySelector('#scientist-dia');
var history_but = document.querySelector('#history-but');
var science_but = document.querySelector('#science-but');
var scientist_but = document.querySelector('#scientist-but');

dialog_interaction();

function dialog_interaction() {
  if (!science_dia.showModal) {
    dialogPolyfill.registerDialog(science_dia);
  }
  science_but.addEventListener('click', function () {
    science_dia.showModal();
  });
  science_dia.querySelector('.close').addEventListener('click', function () {
    science_dia.close();
  });
  if (!history_dia.showModal) {
    dialogPolyfill.registerDialog(history_dia);
  }
  history_but.addEventListener('click', function () {
    console.log("history");
    history_dia.showModal();
  });
  history_dia.querySelector('.close').addEventListener('click', function () {
    history_dia.close();
  });
  if (!scientist_dia.showModal) {
    dialogPolyfill.registerDialog(scientist_dia);
  }
  scientist_but.addEventListener('click', function () {
    console.log("scientist");
    scientist_dia.showModal();
  });
  scientist_dia.querySelector('.close').addEventListener('click', function () {
    scientist_dia.close();
  });
}

